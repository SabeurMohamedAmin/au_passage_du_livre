// shared/types/auth.d.ts
declare module '#auth-utils' {
  interface User {
    id: string
    email: string
    displayName: string | null
    isAdmin: boolean
  }
}

export {}
