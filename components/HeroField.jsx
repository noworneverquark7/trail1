"use client";

import { useEffect, useRef } from "react";

export function HeroField() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let raf = 0;
    let particles = [];
    let mouse = { x: -9999, y: -9999 };

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(42, Math.min(90, Math.floor(rect.width / 15)));
      particles = Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const radius = Math.min(rect.width, rect.height) * (0.16 + ((i * 17) % 100) / 500);
        const homeX = rect.width * 0.64 + Math.cos(angle * 2.1) * radius;
        const homeY = rect.height * 0.48 + Math.sin(angle * 1.7) * radius;
        return { x: homeX, y: homeY, homeX, homeY, vx: 0, vy: 0 };
      });
    }

    function pointer(event) {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }

    function leave() {
      mouse = { x: -9999, y: -9999 };
    }

    function draw() {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      frame += 1;

      particles.forEach((particle, i) => {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const dist2 = dx * dx + dy * dy;

        if (dist2 < 24000) {
          const force = (24000 - dist2) / 24000;
          particle.vx -= dx * force * 0.0008;
          particle.vy -= dy * force * 0.0008;
        }

        particle.vx += (particle.homeX - particle.x) * 0.0015;
        particle.vy += (particle.homeY - particle.y) * 0.0015;

        if (!reduced) {
          particle.vx += Math.sin(frame * 0.008 + i) * 0.002;
          particle.vy += Math.cos(frame * 0.007 + i) * 0.002;
        }

        particle.vx *= 0.965;
        particle.vy *= 0.965;
        particle.x += particle.vx;
        particle.y += particle.vy;
      });

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 105) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(132, 155, 255, ${0.12 * (1 - distance / 105)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      particles.forEach((particle, i) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, i % 11 === 0 ? 2.2 : 1.2, 0, Math.PI * 2);
        ctx.fillStyle = i % 11 === 0 ? "rgba(210,220,255,.8)" : "rgba(158,175,255,.42)";
        ctx.fill();
      });

      if (!reduced) raf = requestAnimationFrame(draw);
    }

    resize();
    draw();

    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", pointer);
    canvas.addEventListener("pointerleave", leave);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", pointer);
      canvas.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} className="hero-field" aria-hidden="true" />;
}
