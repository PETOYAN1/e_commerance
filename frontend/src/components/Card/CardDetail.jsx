/* eslint-disable react/prop-types */
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import "../../assets/styles/Card.scss";

export function CardDetail({ product, loadingCard }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [value, setValue] = useState(3);
  const imageUrl =
  product?.images?.[0]?.url ?? "/src/assets/images/no-image.jpg";

  function handleTitleLimit(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }

  function handleFavoriteActive() {
    setIsFavorite(!isFavorite);
  }

  return (
    <article className="card_wrapper">
      {loadingCard ? (
        <SkeletonTheme baseColor="#bdbdbd" highlightColor="#999">
          <Skeleton count={1} style={{ height: "83%" }} />
          <p style={{ marginTop: "5px" }}>
            <Skeleton count={3} />
          </p>
        </SkeletonTheme>
      ) : (
        <>
          <button onClick={handleFavoriteActive} className="card_favorite_btn">
            {isFavorite ? <MdFavorite color="red" /> : <MdFavoriteBorder />}
          </button>
          <Link
            to={`/product/${product.slug}/${product.id}`}
            style={{ textDecoration: "none", color: "#333" }}
            className="card_link"
          >
            <div className="card_img_box">
              <div className="card_image md:shrink-0">
                <img src={imageUrl} alt="" />
                <span className="view-card-btn">View</span>
              </div>
            </div>
          </Link>
          <div className="card_data">
            <h5 className="name_product">
              {product ? handleTitleLimit(product.name, 45) : ""}
            </h5>
            <strong>{product ? product.price : ""}$ <del className="text-sm" style={{ fontWeight: 500, color: "#868695" }}>6500$</del></strong>
            <div className="card_star_rating">
              <span className="flex items-center gap-2 mb-2 text-gray-400">
                <Rating
                  precision={0.1}
                  name="simple-controlled"
                  value={value}
                  size="small"
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
                <small>(120)</small>
              </span>
              {/* <Button className="card_buy_btn"> */}
              <Button
                variant="contained"
                sx={{
                  display: "flex",
                  gap: "5px",
                  backgroundColor: "#772EB0",
                  width: "100%",
                  color: "#fff",
                  padding: "5px 24px 7px",
                  fontWeight: 600,
                  borderRadius: "12px",
                }}
                className="card_buy_btn"
              >
                <FaCartShopping />{" "}
                <span style={{ fontSize: "14px" }}>Add Basket</span>
              </Button>
            </div>
          </div>
          {/* <ProductAlert showAlert={showAlert} setShowAlert={() => setShowAlert()} errorAlert={errorAlert} setErrorAlert={() => setErrorAlert()}/> */}
        </>
      )}
    </article>
  );
}

export default CardDetail;
