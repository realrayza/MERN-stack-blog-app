import { useContext } from "react"
import { userContext } from "../Context/UserContext"
export const UseUserContext = () => {
    const context = useContext(userContext)
  return context
}
