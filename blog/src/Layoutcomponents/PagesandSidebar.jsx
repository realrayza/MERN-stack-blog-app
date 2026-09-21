import { useNavigate } from "react-router-dom"
export const PagesandSidebar = ({children}) => {
  const navigate = useNavigate()
  return (
    <div className="pageAndSide">
      <div className="createContainer"><div className="createButton mainColor" onClick={()=>{navigate('/blog/create-new')}}>✍️</div></div>
      
        {children}
    </div>
  )
}
