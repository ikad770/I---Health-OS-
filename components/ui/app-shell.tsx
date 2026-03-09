import Link from "next/link";
import { logoutAction } from "@/features/auth/actions";

export function AppShell({ children }: { children: React.ReactNode }) {
  const links = [
    ["/dashboard", "דשבורד"],
    ["/profile", "פרופיל"],
    ["/medications", "תרופות"],
    ["/supplements", "תוספים"],
    ["/routines", "שגרות"],
    ["/metrics", "מדדים"],
    ["/documents", "מסמכים"]
  ];

  return (
    <div className="mx-auto grid min-h-screen max-w-7xl gap-6 p-4 lg:grid-cols-[240px_1fr]">
      <aside className="glass h-fit p-4 lg:sticky lg:top-4">
        <h2 className="mb-4 text-xl font-semibold text-blue-200">I</h2>
        <nav className="space-y-2">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="block rounded-xl px-3 py-2 hover:bg-white/10">
              {label}
            </Link>
          ))}
        </nav>
        <form action={logoutAction} className="mt-5">
          <button className="w-full rounded-xl border border-red-300/40 px-3 py-2 text-sm">Logout</button>
        </form>
      </aside>
      <div>{children}</div>
    </div>
  );
}
