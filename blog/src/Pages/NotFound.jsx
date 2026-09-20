import { useEffect } from "react"
import { Link } from "react-router-dom"


export const NotFound = () => {
  useEffect(()=>{
    document.title = "Page Not Found"
  })
  return (
    <div className="page secondaryColor">
      <div className="notFound flexColumn itemsCenter center">
        <div className="ntf flexColumn itemsCenter center">
          <h2 className="mainFont hugeFont">The page you are looking for doesn't exist</h2>
        <h2 className="mainFont hugeFont ">Return <Link className="links mainFont thirdFontColor pointer" to="/">Home</Link></h2>
        </div>
        

      </div>
      

    </div>
  )
}
