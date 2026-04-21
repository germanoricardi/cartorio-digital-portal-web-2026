import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DashboardLayout from "@/layouts/dashboard";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}