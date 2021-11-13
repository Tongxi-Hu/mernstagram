import React, {FC} from "react";

const LoadMoreBtn: FC<{ result: number, page: number, handleLoadMore: ()=>void }>=({result, page, handleLoadMore})=>{
  return (
    <>
      {
        result<3?"":
          <button className="btn btn-outline-info mx-auto d-block" onClick={handleLoadMore}>load more</button>
      }
    </>
  );
};

export default LoadMoreBtn;