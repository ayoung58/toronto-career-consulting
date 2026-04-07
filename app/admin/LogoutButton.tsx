"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/signout", { method: "POST" });
      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition disabled:opacity-50"
    >
      <LogOut className="h-4 w-4" />
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
}
