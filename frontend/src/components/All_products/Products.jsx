import { useEffect, useMemo, useState } from "react";
import axios from "../../api/axios";
import Footer from "../footer/Footer";
import "../../assets/styles/Products.scss";
import { useTheme } from "@emotion/react";
import { MdKeyboardArrowDown } from "react-icons/md";
import CardDetail from "../Card/CardDetail";
import { Oval, TailSpin } from "react-loader-spinner";
import PaginationHome from "../Pagination/PaginationHome";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [isCategoryHide, setIsCategoryHide] = useState(true);
  const [isBrandHide, setIsBrandHide] = useState(true);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [subCategoryShow, setSubCategoryShow] = useState(false);
  const [colors, setColors] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const [loadProducts, setLoadProducts] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    // getCategories();
    // getBrands();
    // getColors();
    fetchData();
  }, []);

  useEffect(() => {
    getProducts();
  }, [page, selectedCategories, selectedBrands, selectedColors]);

  function getProducts() {
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
  }

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

  const memoizedProducts = useMemo(() => {
    return products;
  }, [products]);

  // function getCategories() {
  //   axios.get("/categories").then((res) => {
  //     setCategories(res.data.data);
  //     setLoadCategory(false);
  //   });
  // }

  // function getBrands() {
  //   axios.get("/brands").then((res) => {
  //     setBrands(res.data.data);
  //     setLoadBrands(false);
  //   });
  // }

  // function getColors() {
  //   axios.get("/colors").then((res) => {
  //     setColor(res.data.data);
  //   });
  // }

  function handleCategoryChange(event) {
    const { value, checked } = event.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((c) => c !== value)
    );
  }

  function handleBrandChange(event) {
    const { value, checked } = event.target;
    setSelectedBrands((prev) =>
      checked ? [...prev, value] : prev.filter((b) => b !== value)
    );
  }

  function handleColorChange(event) {
    const { value, checked } = event.target;
    setSelectedColors((prev) =>
      checked ? [...prev, value] : prev.filter((c) => c !== value)
    );
  }

  function handleHideCategory() {
    setIsCategoryHide(!isCategoryHide);
    setSubCategoryShow(false);
  }

  function handleHideBrand() {
    setIsBrandHide(!isBrandHide);
  }

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleShowSubCategories = (categoryId) => {
    setSubCategoryShow((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  return (
    <>
      <div className="products_container max-w-screen-xl mx-auto">
        <aside
          className={`filter_container p-5 ${
            theme.palette.mode === "dark" ? "bg-[#0d1320]" : "bg-gray-200"
          }`}
        >
          <div className="flex flex-col ">
            <h2
              className="w-full flex items-center justify-between cursor-pointer"
              style={{ fontWeight: 600 }}
              onClick={handleHideCategory}
            >
              Categories
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
              categories.map((category, index) => (
                <div key={category.id}>
                  <div
                    className={`checkbox-wrapper-28 my-[5px] overflow-hidden ${
                      isCategoryHide ? "h-auto visible" : "h-0 hidden"
                    }`}
                  >
                    <input
                      id={`category-${index}`}
                      type="checkbox"
                      className="promoted-input-checkbox"
                      onChange={(e) => handleCategoryChange(e)}
                      value={category.id}
                    />
                    <svg>
                      <use xlinkHref="#checkmark-28" />
                    </svg>
                    <label htmlFor={`category-${index}`}>
                      {category.name}
                      <small>{category.products_count}</small>
                      <button
                        onClick={() => handleShowSubCategories(category.id)}
                        className="w-50 float-end bg-slate-400"
                      >
                        {/* <MdKeyboardArrowDown fontSize={30} /> */}
                        Click
                      </button>
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
                  {subCategoryShow[category.id] &&
                    category?.children.map((subCategory, subIndex) => (
                      <div
                        className={`checkbox-wrapper-28 my-[5px] overflow-hidden`}
                        key={subCategory.id}
                      >
                        <input
                          id={`subCategory-${subIndex}`}
                          type="checkbox"
                          className="promoted-input-checkbox"
                          onChange={(e) => handleCategoryChange(e)}
                          value={subCategory.id}
                        />
                        <svg>
                          <use xlinkHref="#checkmark-28" />
                        </svg>
                        <label htmlFor={`subCategory-${subIndex}`}>
                          {subCategory.name}{" "}
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
                </div>
              ))
            )}
          </div>
          <div className="brand_container flex flex-col gap-3">
            <h2
              className="w-full mt-5 flex items-center justify-between cursor-pointer"
              style={{ fontWeight: 600 }}
              onClick={handleHideBrand}
            >
              Brands
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
              brands.map((brand, index) => (
                <div
                  className={`checkbox-wrapper-28 overflow-hidden ${
                    isBrandHide ? "h-auto visible" : "h-0 hidden"
                  }`}
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
                </div>
              ))
            )}
          </div>
          <div className="color_container">
            <h2
              className="w-full mt-5 flex items-center justify-between cursor-pointer"
              style={{ fontWeight: 600 }}
              onClick={handleHideBrand}
            >
              Colors
              <span className="text-xl">
                <MdKeyboardArrowDown />
              </span>
            </h2>
            <div className="colors_container">
              {colors?.map((color) => (
                <div key={color.id} className="project">
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
        </aside>
        <section className="product_result_container">
          {loadProducts ? (
            <div className="w-full flex items-center justify-center" style={{ minHeight: 'calc(100vh - 140px)' }}>
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
