import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import myAxios from "../api/axios";
import CardDetail from "../components/Card/CardDetail";
import { TailSpin } from "react-loader-spinner";
import Footer from "../components/footer/Footer";
import { GiGrass } from "react-icons/gi";
import { MdOutlineGrass } from "react-icons/md";
import { GiGrassMushroom } from "react-icons/gi";
import CardSize from "../components/Card/CardSize"

export default function SearchedResults() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search_query");
  const [searchedResult, setSearchedResult] = useState([]);
  const [loadProducts, setLoadProducts] = useState(true);
  const [totalCount, setTotalCount] = useState();
  const [offset, setOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allProductsLoaded, setAllProductsLoaded] = useState(false);

  useEffect(() => {
    setLoadProducts(true);
    setSearchedResult([]);
    setOffset(0);
    setAllProductsLoaded(false);
    getSearchData(0, true);
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight =
        e.target.documentElement.scrollTop + window.innerHeight;
      if (
        currentHeight + 200 >= scrollHeight &&
        !loadingMore &&
        !allProductsLoaded
      ) {
        setLoadingMore(true);
        getSearchData(offset + 20);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingMore, allProductsLoaded, offset]);

  function getSearchData(newOffset, isNewSearch = false) {
    myAxios
      .get(`/search?search=${searchQuery}&offset=${newOffset}&limit=20`)
      .then((res) => {
        setSearchedResult((prev) =>
          isNewSearch ? res.data.data : [...prev, ...res.data.data]
        );
        setTotalCount(res.data.total);
        setLoadProducts(false);
        setLoadingMore(false);
        setOffset(newOffset);
        if (res.data.data.length === 0 || res.data.data.length < 10) {
          setAllProductsLoaded(true);
        }
      })
      .catch(() => {
        setLoadingMore(false);
      });
  }

  return (
    <>
      <main className="w-full">
        <div className="max-w-[1540px] mx-auto">
          <div className="flex items-center justify-between gap-2 p-3">
            <div className="flex items-center gap-2 p-3">
              <h2 className="text-[25px]">{searchQuery}</h2>
              <span className="text-gray-500 text-[12px]">
                {totalCount} products found
              </span>
            </div>
            <div>
              <CardSize cardsize={"big"}/>
            </div>
          </div>
          <section className="justify-around max-w-[1540px] flex flex-row flex-wrap gap-3 mx-auto items-center">
            {loadProducts && searchedResult.length === 0 ? (
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
            ) : (
              searchedResult?.map((product, index) => (
                <CardDetail
                  key={`${product.id}-${index}`}
                  product={product}
                  loadingCard={loadProducts}
                />
              ))
            )}
          </section>
          {loadingMore && (
            <div className="w-full flex justify-center items-center my-7">
              <TailSpin
                visible={true}
                height="50"
                width="50"
                color="#0041C2"
                ariaLabel="tail-spin-loading"
                radius="0"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
          {allProductsLoaded && (
            <div className="w-full flex items-end justify-center py-4 my-5">
              <span className="text-[20px] text-gray-500 flex items-end">
                <GiGrass />
                <MdOutlineGrass />
                <GiGrassMushroom />
                <MdOutlineGrass />
                <GiGrass />
              </span>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
