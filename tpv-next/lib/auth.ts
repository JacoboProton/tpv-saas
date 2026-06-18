import { auth } from "./auth.config"
import { redirect } from "next/navigation"

export function getContext(user: any) {
  return {
    tenantId: user.tenantId,
    storeId: user.storeId,
  };
}

export async function getAuthSession() {
  return await auth.api.getSession({
    headers: await new Headers(),
  })
}

export async function requireAuth() {
  const session = await getAuthSession()
  if (!session) {
    redirect("/login")
  }
  return session
}

export async function requireRole(roles: string[]) {
  const session = await requireAuth()
  
  // Get user details from database
  const { prisma } = await import("./prisma")
  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  })
  
  if (!user?.role || !roles.includes(user.role)) {
    redirect("/unauthorized")
  }
  
  return session
}