import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
export type LoggedInUser = {
  id: string
  role: string
  name: string
  email: string
  batch?: string
}

export function useUserAuth() {
  const navigate = useNavigate()
  const [user, setUser] = useState<LoggedInUser | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    setUser(savedUser && JSON.parse(savedUser))
  }, [])

  const saveLoggedInUser = (loggedInUser: LoggedInUser) => {
    localStorage.setItem("user", JSON.stringify(loggedInUser))
    setUser(loggedInUser)
  }
  const logoutUser = () => {
    localStorage.removeItem("user")
    setUser(null)
    navigate("/", { replace: true })
  }

  return { user, saveLoggedInUser, logoutUser }
}
