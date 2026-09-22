import { redirect } from "next/navigation";
import { AdminApp } from "@/components/AdminApp";
import { isAdmin } from "@/lib/auth";
import { backendConfigured } from "@/lib/supabase-rest";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  if (!(await isAdmin())) redirect("/admin");

  return (
    <div className="admin-page">
      <div className="admin-topbar shell">
        <div><div className="eyebrow">Metamorphosis</div><strong>Content dashboard</strong></div>
        <form action="/api/admin/logout" method="post"><button className="button">Log out</button></form>
      </div>
      <div className="shell"><AdminApp backendReady={backendConfigured()} /></div>
    </div>
  );
}
