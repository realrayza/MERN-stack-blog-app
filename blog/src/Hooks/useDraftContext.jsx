import { useContext } from "react"
import { draftContext } from "../Context/DraftContext"

export const useDraftContext = () => {
    const context = useContext(draftContext)
  return context
}
