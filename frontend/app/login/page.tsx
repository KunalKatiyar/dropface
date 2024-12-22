import { getServerSession } from "next-auth";
import { LoginForm } from "@/components/auth/LoginForm";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth/auth-options";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10">
      <LoginForm />
    </div>
  );
}