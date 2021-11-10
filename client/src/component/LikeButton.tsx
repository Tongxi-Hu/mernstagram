import React, {FC} from "react";

const LikeButton: FC<{ isLike: boolean, handleLike: ()=>void, handleUnLike: ()=>void }>=({
  isLike,
  handleLike,
  handleUnLike
})=>{

  return (
    <>
      {isLike ? <i className="fas fa-heart text-danger" onClick={handleUnLike}/> :
        <i className="far fa-heart" onClick={handleLike}/>}
    </>
  );
};

export default LikeButton;