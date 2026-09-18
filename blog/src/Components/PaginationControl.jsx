
export const PaginationControl = ({currentPage,totalPages,page,setPage,setLimit,limit,pageLimit}) => {
  return (
     <div className="pagination padding10 flexRow spaceBetween  itemsCenter">
            <div className="paginationTitle">
              <h2 className="mainFont secondaryFontColor largeFont">
                Page: {currentPage} of {totalPages}
              </h2>
            </div>
            <div className="flexRow">
              <button className="mainColor noBorder borderRadius5 mainFont padding10 pointer transition" onClick={()=>setPage(page-1)} disabled={page===1}>Previous Page</button>
              <button className="mainColor noBorder borderRadius5 mainFont padding10 pointer transition" onClick={()=>setPage(page+1)} disabled={page===totalPages}>Next Page</button>
            </div>
            <div className="pageLimit flexRow itemsCenter">
              <h2 className="mainFont secondaryFontColor largeFont">Blogs per page:</h2>
              <select className="selectLimit alignSelfCenter mainFont mainColor weight700 noBorder" value={limit} onChange={(e)=>{setLimit(e.target.value); setPage(1)}}>
                {pageLimit.map((pagelim)=>{
                  return <option value={pagelim} key={pagelim}>{pagelim}</option>
                })}
              </select>
            </div>
          </div>
  )
}
