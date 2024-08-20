import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import myAxios from "../../api/axios";
import "ldrs/ring";
import CardDetail from "../../components/Card/CardDetail";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import CardSize from "../../components/Card/CardSize";
import Footer from "../../components/footer/Footer";

export default function Category() {
  const { catId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    if (catId) {
      handleGetData();
    }
  }, [catId]);

  const handleGetData = async () => {
    try {
      const response = await myAxios.get(`/categories/${catId}`);
      setCategory(response.data.data);
      setProduct(response.data.data.products);
      if (response) {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      setIsLoading(true);
    }
  };

  if (isLoading) {
    return (
      <div className="homeSpinner">
        <l-ring
          size="70"
          stroke="6"
          bg-opacity="0"
          speed="1.3"
          color="#581C87"
        ></l-ring>
      </div>
    );
  }

  return (
    <>
      <main className="max-w-[1440px] flex flex-col mx-auto">
        <div className="w-full flex justify-between">
            <Breadcrumbs category={category.name}/>
            <CardSize />
        </div>
        <h2 className="text-3xl font-bold">{ category.name } <span className="text-sm ml-3 text-gray-500 font-normal">({product.length}) Products</span></h2>
        <section className="w-100">
          <div className="w-100 flex justify-between flex-wrap gap-2">
            {product.map((product) => (
              <CardDetail product={product} key={product.id}/>
            ))}
          </div>
        </section>
      </main>
      <Footer/>
    </>
  );
}
