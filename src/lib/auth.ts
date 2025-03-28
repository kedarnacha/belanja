export function isAuthenticated(): boolean {
    if (typeof window === "undefined") return false
  
    const token = localStorage.getItem("auth_token")
    return !!token
  }
  
  export async function loginUser(email: string, password: string): Promise<void> {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          localStorage.setItem("auth_token", "demo_token")
          localStorage.setItem("user_email", email)
          resolve(undefined)
        } else {
          reject(new Error("Invalid credentials"))
        }
      }, 1000)
    })
  }
  
  export async function registerUser(name: string, email: string, password: string): Promise<void> {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          resolve(undefined)
        } else {
          reject(new Error("Invalid registration data"))
        }
      }, 1500)
    })
  }
  
  export function logoutUser(): void {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_email")
  }
  
  export function getCurrentUser(): { email: string } | null {
    if (typeof window === "undefined") return null
  
    const email = localStorage.getItem("user_email")
    if (!email) return null
  
    return { email }
  }
  
  