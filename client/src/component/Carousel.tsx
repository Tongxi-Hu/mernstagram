import React, {FC} from "react";
import {useSelector} from "react-redux";
import {State} from "../store";
import {DarkModeState} from "../store/theme";

const Carousel: FC<{ images: Array<string>, id: string }>=({images, id})=>{
  const darkMode=useSelector<State, DarkModeState>(state=>state.darkMode);

  return (
    <div id={`image${id}`} className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {images.map((img, index)=>(
          <button type="button" data-bs-target={`#image${id}`} data-bs-slide-to={index}
            className={index===0 ? "active" : ""}
            aria-current="true" aria-label="Slide 1" key={index}/>
        ))}
      </div>
      <div className="carousel-inner">
        {images.map((img, index)=>(
          <div className={"carousel-item "+(index===0 ? "active" : "")} key={index}>
            <img src={img} className="d-block w-100" alt="..."
              style={{height: "15rem", objectFit: "contain", filter: darkMode.darkMode ? "invert(1)" : "invert(0"}}/>
          </div>
        ))}
        <button className="carousel-control-prev" type="button" data-bs-target={`#image${id}`}
          data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"/>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target={`#image${id}`}
          data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"/>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};
export default Carousel;