import { signupAction } from "@/features/auth/actions";

export default function SignupPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6">
      <form action={signupAction} className="glass w-full space-y-4 p-8">
        <h1 className="text-2xl font-semibold">יצירת חשבון</h1>
        <input name="name" required placeholder="Full name" className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2" />
        <input name="email" type="email" required placeholder="Email" className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2" />
        <input name="password" type="password" minLength={8} required placeholder="Password" className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2" />
        <button className="w-full rounded-xl bg-blue-500 px-4 py-2 font-semibold">הרשמה</button>
      </form>
    </main>
  );
}
