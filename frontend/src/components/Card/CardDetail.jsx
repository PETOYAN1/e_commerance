/* eslint-disable react/prop-types */
import Button from "@mui/material/Button";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { TiStarFullOutline } from "react-icons/ti";
import { FaCartShopping } from "react-icons/fa6";
import "../../assets/styles/Card.scss";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cart";
import AlertSuccess from "../AlertSuccess/AlertSuccess";

export function CardDetail({ product, loadingCard }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [searchParams] = useSearchParams();
  const cardSize = searchParams.get("cardsize") || "small";
  const imageUrl = product?.images?.[0]?.url ?? "/src/assets/images/no-image.jpg";
  const carts = useSelector((store) => store.cart.items);
  const productAlreadyExists = carts.some(
    (cart) => cart.productId === product.id
  );
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();

  function handleTitleLimit(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }

  function handleFavoriteActive() {
    setIsFavorite(!isFavorite);
  }

  const cardSizeClass =
    cardSize === "big" ? "card_wrapper_big" : "card_wrapper_small";

  function handleToTop() {
    window.scroll({
      top: 0,
    });
  }

  // const handleTimeoutAlert = setTimeout(() => {
  //   setShowAlert(false);
  // }, 3000);

  // useEffect(() => {
  //   return () => {
  //     clearTimeout(handleTimeoutAlert);
  //   }
  // }, [showAlert])
  
  function handleAddToCart() {
    dispatch(
      addToCart({
        productId: product.id,
        quantity: 1,
      })
    );
    setShowAlert(true)
  }
  return (
    <article className={`card_wrapper ${cardSizeClass}`}>
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
            onClick={handleToTop}
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
            <strong>
              {product ? product.price : ""}${" "}
              <del
                className="text-sm"
                style={{ fontWeight: 500, color: "#868695" }}
              >
                6500$
              </del>
            </strong>
            <div className="card_star_rating">
              <span className="flex items-center gap-1 mb-2 text-gray-400">
                <TiStarFullOutline color="#FFD700" />
                <small>●</small>
                <small>({product.rating})</small>
              </span>
              {productAlreadyExists ? (
                <Link  className="to_basket_link" to={"/basket"}>
                  In the basket
                </Link>
              ) : (
                <Button
                  disabled={productAlreadyExists}
                  onClick={handleAddToCart}
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
              )}
            </div>
          </div>
          <AlertSuccess
            CartAdded={showAlert}
            textAlert="The product has been added to the cart"
            onAlertClose={() => setShowAlert(false)}
          />
        </>
      )}
    </article>
  );
}

export default CardDetail;
