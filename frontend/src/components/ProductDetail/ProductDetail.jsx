import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import { TailSpin } from "react-loader-spinner";
import ImageMagnifier from "../ImageMagnifier/ImageMagnifier";
import "../../assets/styles/ProductDetail.scss";
import { useTheme } from "@mui/material";
import Footer from "../footer/Footer";

export default function ProductDetail() {
  const { slug, id } = useParams();
  const [product, setProduct] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    try {
      const response = await axios.get(`/products/${id}`);
      setProduct(response.data.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };
  if (!product) {
    return (
      <TailSpin
        height="100"
        width="100"
        color="#0041C2"
        ariaLabel="tail-spin-loading"
        radius="0"
        wrapperStyle={{}}
        wrapperClass="homeSpinner"
        visible={true}
      />
    );
  }
  return (
    <>
      <div className="max-w-screen-xl flex flex-row flex-wrap gap-10 mx-auto items-center">
        <div className="w-full flex items-start gap-2 justify-between mt-3">
          <section className="product_magnifier_img_container">
              <ImageMagnifier
                src={product.images}
                width={500}
                height={550}
                magnifierHeight={2000}
                magnifieWidth={2000}
                sliderMagnifier={true}
              />
          </section>
          <section className="product_detail_container">
            <article className="flex flex-col gap-2">
              <div
                className="flex flex-col pb-3"
                style={{ borderBottom: "1px solid #9a9a9a" }}
              >
                <span>Rating (???)</span>
                <h2>{product.name}</h2>
              </div>
              <label className="flex items-end gap-2 mt-3">
                <strong className="text-[30px]">${product.price}</strong>
                <del
                  className="text-sm"
                  style={{ color: "#9a9a9a", fontWeight: 300 }}
                >
                  $3000
                </del>
              </label>
              <ul className="flex flex-col gap-3 mt-3">
                <li className="product_params">
                  <b>Vendor code</b> <span>112233446</span>{" "}
                </li>
                <li className="product_params">
                  <b>Brand</b> <span>{product?.brand}</span>{" "}
                </li>
                <li className="product_params">
                  <b>Size</b> <span>{product.about_product[0]?.size}</span>{" "}
                </li>
              </ul>
            </article>
          </section>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="ml-2" style={{ width: "70%" }}>
            <span style={{ color: "#9a9a9a" }}>Description</span>
            <article className="mt-3">{product?.description}</article>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
