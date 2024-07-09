import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaPen } from "react-icons/fa6";
import { GoPersonFill } from "react-icons/go";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import Footer from "../../components/footer/Footer";
import myAxios from "../../api/axios";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);


const productCache = {};


export default function Basket() {
    const carts = useSelector(store => store.cart.items); 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [authUser, setAuthUser] = useState(null);
    const theme = useTheme();
    const matches = useMediaQuery('(max-width:1020px)');
    const [productDetails, setProductDetails] = useState({});
    const [displayedTotal, setDisplayedTotal] = useState("$0.00");
    const priceRef = useRef(null);

    useEffect(() => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
  
      if (token) {
        setIsLoggedIn(true);
      }
      if (user) {
        setAuthUser(JSON.parse(user));
      }
    }, []);
  
    useEffect(() => {  
      fetchProductDetails();
    }, [carts]);

    useEffect(() => {
      if (priceRef.current) {
          gsap.to(priceRef.current, {
            textContent: displayedTotal, 
              duration: 0.3,
              snap: { textContent: 1 },
              ease: "power1.inOut",
          });
      }
  }, [displayedTotal]);

    async function fetchProductDetails() {
      let total = 0;

      const promises = carts.map(async (item) => {
        if (productCache[item.productId]) {
          return productCache[item.productId];
        } else {
          const res = await myAxios.get(`/products/${item.productId}`);
          const productData = res.data.data;
          productCache[item.productId] = productData;
          return productData;
        }
      });

      const details = await Promise.all(promises);
      const productDetailsMap = {};

      details.forEach((detail, index) => {
        productDetailsMap[carts[index].productId] = detail;
        total += detail.price * carts[index].quantity;
      });

      setProductDetails(productDetailsMap);
      setDisplayedTotal(total);
    }

    function handleCheckout() {
      if (!isLoggedIn) {
        navigate('/login');
      } else {
        console.log("Checkout");
      }
    }

    return (
        <>    
            {carts.length < 1 ? (
                <div className="w-full  flex flex-col items-center justify-center" style={{ minHeight: 'calc(100vh - 142px)' }}>
                    <div className="flex flex-col justify-center items-center w-[55%]">
                        <h2>The cart is still empty</h2>
                        <p className="text-gray-500">Visit the main page to select products or find what you need in the search</p>
                        <Link to={'/'} className="bg-purple-500 hover:bg-purple-700 mt-5 text-white font-bold py-2 px-4 rounded-full">Go to Main page</Link>
                    </div>
                </div>
            ) : (
                <section className="relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0">
                    <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8  w-full max-xl:max-w-3xl max-xl:mx-auto">
                                <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                                    <h2 className="font-manrope font-bold text-3xl leading-10">
                                        Shopping Cart
                                    </h2>
                                    <h2 className="font-manrope font-bold text-xl leading-8 text-gray-500">
                                        {carts.length} Items
                                    </h2>
                                </div>
                                <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                                    <div className="col-span-12 md:col-span-7">
                                        <p className="font-normal text-lg leading-8 text-gray-400">
                                            Product Details
                                        </p>
                                    </div>
                                    <div className="col-span-12 md:col-span-5">
                                        <div className="grid grid-cols-5">
                                            <div className="col-span-3">
                                                <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                                                    Quantity
                                                </p>
                                            </div>
                                            <div className="col-span-2">
                                                <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                                                    Total
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {carts.slice().reverse().map((item, index) => (
                                    <CartItem
                                        key={index}
                                        productId={item.productId}
                                        quantity={item.quantity}
                                        detail={productDetails[item.productId]}
                                    />
                                ))}

                                <div className="flex items-center justify-center mt-8">
                                    <div className="basket_pay_details_box w-full">
                                        <div className={`basket_section grow ${ theme.palette.mode === "dark" ? 'bg-gray-600' : 'bg-gray-50' }`}>
                                            <h2 className="title_btn">Payment method</h2>
                                            <span className="flex gap-2 items-center">Select Payment method</span>
                                        </div>
                                        <div className={`basket_section ${ theme.palette.mode === "dark" ? 'bg-gray-600' : 'bg-gray-50' }`}>
                                            <div>
                                                <Link className="title_btn" to={`${ authUser !== null ? '/profile' : '/login' }`}>My details <FaPen /></Link>
                                                {authUser !== null? (
                                                    <span className="flex gap-2 items-center"><GoPersonFill /> {authUser?.email}</span>
                                                ) : (
                                                    <span className="flex gap-2 items-center"><GoPersonFill /> Login or create account</span>
                                                )}
                                            </div>    
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" col-span-12 xl:col-span-4 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
                                <h2 className="font-manrope font-bold text-3xl leading-10 pb-8 border-b">
                                    Order Summary
                                </h2>
                                <div className="mt-8">
                                    <div className="flex items-center justify-between pb-6">
                                        <p className="font-normal text-lg leading-8">
                                            {carts.length} Items
                                        </p>
                                        <h6 ref={priceRef} className="font-medium text-lg leading-8">
                                          {displayedTotal}
                                        </h6>
                                    </div>
                                    <button onClick={handleCheckout} className="w-full text-center bg-purple-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-purple-700">
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            <Footer/>
        </>
    );
}
