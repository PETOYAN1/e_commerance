import { useEffect, useRef, useState } from "react";
import "./ImageMagnifier.css";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

export default function MagnifierSlider({
  imagesUrl,
  height,
  setHoveredImage,
}) {
  const sliderRef = useRef(null);
  const scrollAmount = 150;
  const [hoveredImageId, setHoveredImageId] = useState(null);
  const [isHiddenTopBtn, setIsHiddenTopBtn] = useState(false);
  const [isHiddenBottomBtn, setIsHiddenBottomBtn] = useState(false);
  const container = sliderRef.current;

  const handleScroll = () => {
    if (container) {
      setIsHiddenTopBtn(container.scrollTop === 0);
      setIsHiddenBottomBtn(
        container.scrollTop + container.clientHeight >= container.scrollHeight
      );
    }
  };

  useEffect(() => {
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div className="slider_container" style={{ minHeight: height }}>
      {!isHiddenTopBtn && (
        <button
          className="nav-btn btn_top"
          onClick={() => {
            container.scrollTop -= scrollAmount;
          }}
        >
          <MdKeyboardArrowUp />
        </button>
      )}
      <div
        className="images-container"
        ref={sliderRef}
        style={{ maxHeight: height }}
      >
        {imagesUrl?.map((image) => {
          return (
            <img
              className={`image ${
                hoveredImageId === image.id ? "bordered_img" : ""
              }`}
              alt="sliderImage"
              key={image?.id}
              src={image?.url}
              onMouseEnter={() => {
                setHoveredImage(image?.url);
                setHoveredImageId(image.id);
              }}
            />
          );
        })}
      </div>
      {!isHiddenBottomBtn && (
        <button
          className="nav-btn bottom_btn"
          onClick={() => {
            container.scrollTop += scrollAmount;
          }}
        >
          <MdKeyboardArrowDown />
        </button>
      )}
    </div>
  );
}
