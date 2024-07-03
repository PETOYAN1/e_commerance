import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "../../api/axios";
import Footer from "../footer/Footer";
import "../../assets/styles/Products.scss";
import { useTheme } from "@emotion/react";
import { MdKeyboardArrowDown } from "react-icons/md";
import CardDetail from "../Card/CardDetail";
import { Oval, TailSpin } from "react-loader-spinner";
import PaginationHome from "../Pagination/PaginationHome";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CardSize from "../Card/CardSize";
import { useSearchParams } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { FaFilter } from "react-icons/fa";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [isCategoryHide, setIsCategoryHide] = useState(true);
  const [isBrandHide, setIsBrandHide] = useState(true);
  const [isColorHide, setIsColorHide] = useState(true);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [colors, setColors] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const [loadProducts, setLoadProducts] = useState(true);
  const [visibleMoreCategories, setVisibleMoreCategories] = useState(5);
  const [visibleMoreBrands, setVisibleMoreBrands] = useState(5);
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(1500);
  const matches = useMediaQuery('(max-width:1020px)');
  const theme = useTheme();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    getProducts();
  }, [page, selectedCategories, selectedBrands, selectedColors, minPrice, maxPrice]);

  const getProducts = useCallback(() => {
    setLoadProducts(true);
    axios
      .get("/products_filter", {
        params: {
          page,
          category_id: selectedCategories,
          brand_id: selectedBrands,
          color: selectedColors,
        },
      })
      .then((res) => {
        setPageCount(res.data.last_page);
        setProducts(res.data.data);
        setLoadProducts(false);
      })
      .catch(() => {
        setLoadProducts(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    page,
    selectedCategories,
    selectedBrands,
    selectedColors,
    minPrice,
    maxPrice,
  ]);

  const fetchData = async () => {
    try {
      setLoadData(true);
      const [productRes, categoryRes, brandRes, colorRes] = await Promise.all([
        axios.get("/products_filter", {
          params: {
            page,
            category_id: selectedCategories,
            brand_id: selectedBrands,
            color: selectedColors,
            min_price: minPrice,
            max_price: maxPrice,
          },
        }),
        axios.get("/categories"),
        axios.get("/brands"),
        axios.get("/colors"),
      ]);

      setProducts(productRes.data.data);
      setCategories(categoryRes.data.data);
      setBrands(brandRes.data.data);
      setColors(colorRes.data.data);
      setPageCount(productRes.data.last_page);
      setLoadData(false);
    } catch (error) {
      setLoadData(false);
    }
  };

  const memoizedProducts = useMemo(() => products, [products]);

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    if (name === "minPrice") {
      setMinPrice(value);
    } else {
      setMaxPrice(value);
    }
  };

  const handleCategoryChange = useCallback((event) => {
    const { value, checked } = event.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((c) => c !== value)
    );
  }, []);

  const handleBrandChange = useCallback((event) => {
    const { value, checked } = event.target;
    setSelectedBrands((prev) =>
      checked ? [...prev, value] : prev.filter((b) => b !== value)
    );
  }, []);

  const handleColorChange = useCallback((event) => {
    const { value, checked } = event.target;
    setSelectedColors((prev) =>
      checked ? [...prev, value] : prev.filter((c) => c !== value)
    );
  }, []);

  const handleHideCategory = useCallback(() => {
    setIsCategoryHide(!isCategoryHide);
    setVisibleMoreCategories(5);
  }, [isCategoryHide]);

  const handleHideBrand = useCallback(() => {
    setIsBrandHide(!isBrandHide);
  }, [isBrandHide]);

  const handleHideColor = useCallback(() => {
    setIsColorHide(!isColorHide);
  }, [isColorHide]);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleShowMoreCategories = () => {
    setVisibleMoreCategories((prevValue) => prevValue + 5);
  };

  const handleShowMoreBrands = () => {
    setVisibleMoreBrands((prevValue) => prevValue + 5);
    if (visibleMoreBrands >= brands.length) {
      setVisibleMoreBrands(5);
    }
  };
  return (
    <>
      <div className="products_container max-w-[1500px] mx-auto">
        <aside
          className={`filter_container ${ matches && 'mobile_filter_container' } p-5 h-[600px] ${
            theme.palette.mode === "dark" ? "bg-[#0d1320]" : "bg-gray-200"
          }`}
        >
          <button className="filter_button">
            <FaFilter />
          </button>
          <div className="relative">
            {/* <div className="relative mb-6">
              <label htmlFor="min-price" className="sr-only">Min price</label>
              <input
                id="min-price"
                type="number"
                name="minPrice"
                value={minPrice}
                min="100"
                max={maxPrice}
                className="w-full mb-2 p-1 border rounded"
                onChange={handlePriceChange}
              />
              <label htmlFor="max-price" className="sr-only">Max price</label>
              <input
                id="max-price"
                type="number"
                name="maxPrice"
                value={maxPrice}
                min={minPrice}
                max="1500"
                className="w-full mb-2 p-1 border rounded"
                onChange={handlePriceChange}
              />
            </div> */}
            <div className="flex flex-col ">
              <h2
                className="w-full flex items-center justify-between cursor-pointer"
                style={{ fontWeight: 600 }}
                onClick={handleHideCategory}
              >
                <span className="border-b-4 border-purple-500">Categories</span>
                <span className="text-xl">
                  <MdKeyboardArrowDown />
                </span>
              </h2>

              {loadData ? (
                <div className="w-full flex justify-center">
                  <Oval
                    visible={true}
                    height="20"
                    width="20"
                    color="#0041C2"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
              ) : (
                <div
                  className={` ${
                    isCategoryHide ? "h-auto visible" : "h-[0px] hidden"
                  } `}
                >
                  {categories
                    .slice(0, visibleMoreCategories)
                    .map((category, index) => (
                      <li className="list-none mb-1 mt-2" key={category.id}>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${category.id}-content`}
                            id={`panel${category.id}-header`}
                          >
                            <div className="overflow-hidden w-[100%]">
                              <label
                                htmlFor={`category-${index}`}
                                className="cursor-pointer flex justify-between items-center gap-2"
                              >
                                {category.name}
                                <small className="text-[11px] text-gray-500">
                                  {category.products_count}
                                </small>
                              </label>
                            </div>
                          </AccordionSummary>
                          <AccordionDetails>
                            {category.children.map((subCategory) => (
                              <div
                                className={`checkbox-wrapper-29 overflow-hidden ml-3`}
                                key={subCategory.id}
                              >
                                <input
                                  id={`subCategory-${subCategory.id}`}
                                  type="checkbox"
                                  className="promoted-input-checkbox"
                                  onChange={(e) => handleCategoryChange(e)}
                                  value={subCategory.id}
                                />
                                <svg>
                                  <use xlinkHref="#checkmark-28" />
                                </svg>
                                <label
                                  htmlFor={`subCategory-${subCategory.id}`}
                                  className="text-small"
                                >
                                  {subCategory.name}
                                  <small>{subCategory.products_count}</small>
                                </label>
                                <svg style={{ display: "none" }}>
                                  <symbol id="checkmark-28" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeMiterlimit="10"
                                      fill="none"
                                      d="M22.9 3.7l-15.2 16.6-6.6-7.1"
                                    ></path>
                                  </symbol>
                                </svg>
                              </div>
                            ))}
                          </AccordionDetails>
                        </Accordion>
                      </li>
                    ))}
                  <button
                    className="btn btn-sm text-[12px] outline-none"
                    onClick={handleShowMoreCategories}
                  >
                    Show More
                  </button>
                </div>
              )}
            </div>
            <div className="brand_container flex flex-col gap-3">
              <h2
                className="w-full mt-5 flex items-center justify-between cursor-pointer"
                style={{ fontWeight: 600 }}
                onClick={handleHideBrand}
              >
                <span className="border-b-4 border-purple-500">Brands</span>
                <span className="text-xl">
                  <MdKeyboardArrowDown />
                </span>
              </h2>
              {loadData ? (
                <div className="w-full flex justify-center">
                  <Oval
                    visible={true}
                    height="20"
                    width="20"
                    color="#0041C2"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
              ) : (
                <div
                  className={` flex flex-col gap-[6px] ${
                    isBrandHide ? "h-auto visible" : "h-0 hidden"
                  } `}
                >
                  {brands.slice(0, visibleMoreBrands).map((brand, index) => (
                    <li
                      className={`checkbox-wrapper-28 overflow-hidden`}
                      key={brand.id}
                    >
                      <input
                        id={`brand-${index}`}
                        type="checkbox"
                        className="promoted-input-checkbox"
                        onChange={(e) => handleBrandChange(e)}
                        value={brand.id}
                      />
                      <svg>
                        <use xlinkHref="#checkmark-28" />
                      </svg>
                      <label htmlFor={`brand-${index}`}>{brand.b_name}</label>
                      <svg style={{ display: "none" }}>
                        <symbol id="checkmark-28" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeMiterlimit="10"
                            fill="none"
                            d="M22.9 3.7l-15.2 16.6-6.6-7.1"
                          ></path>
                        </symbol>
                      </svg>
                    </li>
                  ))}
                  <button
                    className="btn btn-sm text-[12px] outline-none"
                    onClick={handleShowMoreBrands}
                  >
                    Show More
                  </button>
                </div>
              )}
            </div>
            <div className="color_container">
              <h2
                className="w-full mt-5 flex items-center justify-between cursor-pointer"
                style={{ fontWeight: 600 }}
                onClick={handleHideColor}
              >
                <span className="border-b-4 border-purple-500">Colors</span>
                <span className="text-xl">
                  <MdKeyboardArrowDown />
                </span>
              </h2>
              <div
                className={`colors_container ${
                  isColorHide ? "h-auto visible" : "h-0 hidden"
                } `}
              >
                {colors?.map((color) => (
                  <div key={color.id} className="project mt-2">
                    <div className="boxes">
                      <div className="box">
                        <div>
                          <input
                            type="checkbox"
                            onChange={(e) => handleColorChange(e)}
                            value={color}
                            name="box[]"
                            id="box1"
                            style={{ backgroundColor: color.color }}
                          />
                        </div>
                        <label htmlFor="box1"></label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
        <section className="root_product_result_container">
          <div className="w-full flex justify-end items-center">
            <CardSize />
          </div>
          <div className="product_result_container">
            {loadProducts ? (
              <div
                className="w-full flex items-center justify-center"
                style={{ minHeight: "calc(100vh - 140px)" }}
              >
                <TailSpin
                  visible={true}
                  height="80"
                  width="80"
                  color="#0041C2"
                  ariaLabel="tail-spin-loading"
                  radius="0"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            ) : memoizedProducts.length === 0 ? (
              <div
                className="flex items-center justify-center min-h-screen"
                style={{ width: "100%" }}
              >
                <strong>No result</strong>
              </div>
            ) : (
              memoizedProducts.map((product) => (
                <div className="flex flex-row" key={product.id}>
                  <CardDetail product={product} loadingCard={loadProducts} />
                </div>
              ))
            )}
          </div>
        </section>
      </div>
      <PaginationHome
        currentPage={page}
        pageCount={pageCount}
        onPageChange={handlePageChange}
      />
      <Footer />
    </>
  );
}
