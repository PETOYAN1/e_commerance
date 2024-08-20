import { useRef, useState } from "react";
import MagnifierSlider from "./MagnifierSlider";
import { useTheme } from "@emotion/react";
import ImageModal from "./ImageModal";


export default function ImageMagnifier({
  src,
  width,
  height,
  magnifierHeight = 100,
  magnifieWidth = 100,
  zoomLevel = 1.8,
  magnifierRadius = 20,
  sliderMagnifier = false,
}) {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(src[0]?.url);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();

  const imgRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex gap-3">
        <div>
          {sliderMagnifier && (
            <MagnifierSlider
              imagesUrl={src}
              height={height}
              setHoveredImage={setHoveredImage}
            />
          )}
        </div>
        <div
          ref={imgRef}
          className="flex items-center cursor-pointer"
          style={{
            position: "relative",
            overflow: "hidden",
            backgroundColor: theme.palette.myColor.main,
            height: height,
            width: width,
            borderRadius: magnifierRadius,
          }}
          onClick={openModal}
        >
          <img
            src={hoveredImage}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: magnifierRadius,
              objectFit: "contain",
            }}
            onMouseEnter={(e) => {
              const elem = e.currentTarget;
              const { width, height } = elem.getBoundingClientRect();
              setSize([width, height]);
              setShowMagnifier(true);
            }}
            onMouseMove={(e) => {
              const elem = e.currentTarget;
              const { top, left } = elem.getBoundingClientRect();

              const x = e.pageX - left - window.pageXOffset;
              const y = e.pageY - top - window.pageYOffset;
              setXY([x, y]);
            }}
            onMouseLeave={() => {
              setShowMagnifier(false);
            }}
            alt={"img"}
          />

          <div
            style={{
              display: showMagnifier ? "" : "none",
              position: "absolute",
              pointerEvents: "none",
              height: `${magnifierHeight}px`,
              width: `${magnifieWidth}px`,
              top: `${y - magnifierHeight / 2}px`,
              left: `${x - magnifieWidth / 2}px`,
              opacity: "1",
              border: "1px solid lightgray",
              backgroundColor: "white",
              backgroundImage: `url('${hoveredImage}')`,
              backgroundRepeat: "no-repeat",
              borderRadius: magnifierRadius,
              backgroundSize: `${imgWidth * zoomLevel}px ${
                imgHeight * zoomLevel
              }px`,
              backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
              backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
            }}
          ></div>
        </div>
      </div>
      {isModalOpen && (
        <ImageModal
          images={src}
          onClose={() => setIsModalOpen(false)}
          initialImage={hoveredImage}
        />
      )}
    </>
  );
}
