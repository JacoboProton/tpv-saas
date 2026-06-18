import { auth } from "@/lib/auth.config"
import { toNextJsHandler } from "better-auth/next"

export const { GET, POST } = toNextJsHandler(auth)