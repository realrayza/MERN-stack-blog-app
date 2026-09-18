import { useEffect, useState } from "react";

import { PaginationControl } from "./PaginationControl";
import { UseUserContext } from "../Hooks/UseUserContext";
import { TinyBlogCard } from "./TinyBlogCard";
import { useDraftContext } from "../Hooks/useDraftContext";

export const DraftFetch = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState();
  const url = import.meta.env.VITE_URL;

  const { draft, dispatch } = useDraftContext();
  const pageLimit = [4, 8, 12];

  const context = UseUserContext();
  const { user } = context;
  useEffect(() => {
    const fetchDraft = async () => {
      try {
        const response = await fetch(
          `${url}api/draft/userDraft/?page=${page}&limit=${limit}`,
          {
            headers: { Authorization: user.token },
          },
        );
        const data = await response.json();

        dispatch({ type: "FETCH_DRAFT", payload: data.response });
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDraft();
  }, [limit, page, user.token, dispatch, user,url]);
  return (
    <div className="blogDisplay">
      {draft && (
        <div className="blogResult boxShadow secondaryColor borderRadius10 ">
          <h2 className="secondaryFont mainFont">Saved Draft</h2>
          <div className="blogCard2 flexColumn  flexWrap">
            {draft?.map((draft) => {
              return (
                <div key={draft._id}>
                  <TinyBlogCard blog={draft} />
                </div>
              );
            })}
          </div>
          <div className="">
            <PaginationControl
              currentPage={currentPage}
              limit={limit}
              totalPages={totalPages}
              setPage={setPage}
              page={page}
              pageLimit={pageLimit}
              setLimit={setLimit}
            />
          </div>
        </div>
      )}
    </div>
  );
};
