import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import { TailSpin } from "react-loader-spinner";
import ImageMagnifier from "../ImageMagnifier/ImageMagnifier";
import "../../assets/styles/ProductDetail.scss";
import { Rating, useMediaQuery } from "@mui/material";
import Footer from "../footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cart";
import SliderMobileSwiper from "../HomeDetails/SliderSwiper/SliderMobileSwiper";
import CardDetail from "../Card/CardDetail";

export default function ProductDetail() {
  const { slug, id } = useParams();
  const [product, setProduct] = useState(null);
  const [seeAlsoProducts, setSeeAlsoProducts] = useState([]);
  const carts = useSelector(store => store.cart.items);
  const matches = useMediaQuery('(max-width:1020px)');
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    try {
      const response = await axios.get(`/products/${id}`);
      setProduct(response.data.data);
      setSeeAlsoProducts(response.data.recommended);
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

  function handleAddToCart () {
    dispatch(addToCart({
      productId: product.id,
      quantity: 1
    }))
  }
  return (
    <>
      <div className="max-w-screen-xl flex flex-row flex-wrap gap-10 mx-auto items-center">
        <div className={`w-full flex ${ matches && 'flex-col' }  gap-2 justify-between mt-3`}>
          <section className="product_magnifier_img_container">
              {!matches ? (
                <ImageMagnifier
                  src={product.images}
                  width={500}
                  height={550}
                  magnifierHeight={2000}
                  magnifieWidth={2000}
                  sliderMagnifier={true}
                />
              ) : (
                <SliderMobileSwiper imgUrl={product.images}/>
              )

              }
          </section>
          <section className="product_detail_container" style={{ minWidth: matches && '100%' }}>
            <article className="flex p-3 flex-col gap-2">
              <div
                className="flex flex-col pb-3"
                style={{ borderBottom: "1px solid #9a9a9a" }}
              >
                <span><Rating name="read-only" value={product?.rating} readOnly /></span>
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
                  <b>Vendor code</b> <span className="vendor_code_text">112233446</span>{" "}
                </li>
                <li className="product_params">
                  <b>Brand</b> <span>{product?.brand}</span>{" "}
                </li>
                <li className="mt-8">
                  <h3 className="text-xl font-bold">Sizes</h3>
                  <div className="flex flex-wrap gap-4 mt-4">
                      <button type="button" className="w-12 h-11 border-2 hover:border-gray-800 font-semibold text-xs rounded-lg flex items-center justify-center shrink-0">SM</button>
                      <button type="button" className="w-12 h-11 border-2 hover:border-gray-800 border-gray-800 font-semibold text-xs rounded-lg flex items-center justify-center shrink-0">MD</button>
                      <button type="button" className="w-12 h-11 border-2 hover:border-gray-800 font-semibold text-xs rounded-lg flex items-center justify-center shrink-0">LG</button>
                      <button type="button" className="w-12 h-11 border-2 hover:border-gray-800 font-semibold text-xs rounded-lg flex items-center justify-center shrink-0">XL</button>
                      <button type="button" className="w-12 h-11 border-2 hover:border-gray-800 font-semibold text-xs rounded-lg flex items-center justify-center shrink-0">XXL</button>
                  </div>
                </li>
                <li className="mt-2">
                    <h3 className="text-xl font-bold">Colors</h3>
                    <div className="flex flex-wrap gap-4 mt-4">
                        <button type="button" className="w-12 h-11 bg-black border-2 border-white hover:border-gray-800 rounded-lg shrink-0"></button>
                        <button type="button" className="w-12 h-11 bg-gray-400 border-2 border-white hover:border-gray-800 rounded-lg shrink-0"></button>
                        <button type="button" className="w-12 h-11 bg-orange-400 border-2 border-white hover:border-gray-800 rounded-lg shrink-0"></button>
                        <button type="button" className="w-12 h-11 bg-red-400 border-2 border-white hover:border-gray-800 rounded-lg shrink-0"></button>
                    </div>
                </li>
                <div className="mt-10 flex flex-wrap gap-4 w-100">
                  <button type="button" onClick={handleAddToCart} className={`${ carts.productId === product.id ? 'opacity-5' : '' } ${ matches && 'w-full' } flex items-center justify-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white border border-gray-800 text-base rounded-lg`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 cursor-pointer fill-current inline mr-3" viewBox="0 0 512 512">
                        <path d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0" data-original="#000000"></path>
                    </svg>
                    Add to cart
                  </button>
                </div>
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
      <section className="flex flex-col gap-5">
        <h2 className="text-[24px] font-[700] leading-[32px] ml-2">See also</h2>
        <div className="w-full flex justify-between flex-wrap gap-2">
          {seeAlsoProducts?.map((product) => (
            <CardDetail key={product.id} product={product}/>
          ))}
        </div>
      </section>
      </div>
      <Footer />
    </>
  );
}
