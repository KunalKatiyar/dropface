import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth-options";
import { Button } from "@/components/ui/button";
import { LogOut, Upload } from "lucide-react";
import UploadButton from "@/components/UploadButton";
import FileList from "@/components/FileList";
import { redirect } from "next/navigation";
import LogOutButton from "@/components/LogOutButton";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-7xl p-6">
      <div className="flex flex-col items-center justify-center gap-8 pb-8 md:flex-row md:justify-between">
        <h2 className="mb-2 text-3xl font-bold tracking-tight">My Files</h2>
        <LogOutButton />
        <UploadButton />
      </div>
      <FileList />
    </main>
  );
}