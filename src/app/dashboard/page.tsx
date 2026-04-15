"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 🔒 proteção de rota
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Carregando...</p>;
  }

  if (!session) {
    return null;
  }

  const { name, email } = session.user as {
    name: string;
    email: string;
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard</h1>

      <div style={{ marginTop: 20 }}>
        <p><strong>Nome:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
      </div>

      <button
        onClick={() =>
          signOut({
            callbackUrl: '/'
          })
        }
        style={{
          marginTop: 20,
          padding: "10px 16px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}