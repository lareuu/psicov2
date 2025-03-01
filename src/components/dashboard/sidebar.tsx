"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  Calendar,
  FileText,
  LayoutDashboard,
  Library,
  Settings,
  Users,
  CreditCard,
  BarChart4,
  LogOut,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "../mode-toggle"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
      window.location.href = "/login" // Redirección manual
    } catch (error) {
      console.error("Error during sign out:", error)
      // TODO: Muestra un mensaje de error al usuario
    }
  }

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r bg-background",
        collapsed ? "w-16" : "w-64",
        "transition-all duration-300 ease-in-out",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl font-bold">PsicoGest</span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-accent hover:text-accent-foreground rounded-lg"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <div className="h-[1px] bg-border mx-4" />

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {[
          { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
          { label: "Citas", href: "/dashboard/citas", icon: Calendar },
          { label: "Pacientes", href: "/dashboard/pacientes", icon: Users },
          { label: "Notas Clínicas", href: "/dashboard/notas", icon: FileText },
          { label: "Recursos", href: "/dashboard/recursos", icon: Library },
          { label: "Facturación", href: "/dashboard/facturacion", icon: CreditCard },
          { label: "Finanzas", href: "/dashboard/finanzas", icon: BarChart4 },
        ].map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname === href
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent/50 hover:text-accent-foreground",
            )}
          >
            <Icon className="h-5 w-5" />
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="space-y-4 p-4">
        <div className="h-[1px] bg-border" />

        {/* Settings */}
        <Link
          href="/dashboard/ajustes"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
            pathname === "/dashboard/ajustes"
              ? "bg-accent text-accent-foreground"
              : "hover:bg-accent/50 hover:text-accent-foreground",
          )}
        >
          <Settings className="h-5 w-5" />
          {!collapsed && <span>Ajustes</span>}
        </Link>

        {/* Logout Button */}
        <Button variant="ghost" className="w-full justify-start gap-3" onClick={handleSignOut}>
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Cerrar Sesión</span>}
        </Button>

        {/* User Profile */}
        <div className="flex items-center gap-3 rounded-xl bg-muted p-3">
          <img
            src={user?.user_metadata?.avatar_url || "/default-avatar.png"}
            className="h-8 w-8 rounded-full"
            alt="User Avatar"
          />
          {!collapsed && <div className="text-sm font-medium">{user?.user_metadata?.name || "Usuario"}</div>}
        </div>

        {/* Theme Toggle */}
        {!collapsed && <ModeToggle />}
      </div>
    </aside>
  )
}

