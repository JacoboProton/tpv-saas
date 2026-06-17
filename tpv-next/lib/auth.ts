import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export function getContext(user: any) {
  return {
    tenantId: user.tenantId,
    storeId: user.storeId,
  };
}

export async function getAuthSession() {
  return await getServerSession()
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
  
  if (!session.user?.role || !roles.includes(session.user.role as string)) {
    redirect("/unauthorized")
  }
  
  return session
}