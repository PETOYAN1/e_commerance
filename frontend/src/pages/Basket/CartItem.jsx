import { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { changeQuantity, deleteCartItem } from "../../store/cart";
import myAxios from "../../api/axios";
import { MdDelete } from "react-icons/md";
import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/material";

const productCache = {};

function CartItem({ productId, quantity }) {
  const dispatch = useDispatch();
  const [detail, setDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (productCache[productId]) {
      setDetail(productCache[productId]);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      myAxios.get(`/products/${productId}`).then((res) => {
        const productData = res.data.data;
        productCache[productId] = productData;
        setDetail(productData);
        setIsLoading(false);
      });
    }
  }, [productId]);

  function handleMinusQuantity() {
    dispatch(
      changeQuantity({
        productId: productId,
        quantity: quantity - 1,
      })
    );
  }

  function handlePlusQuantity() {
    dispatch(
      changeQuantity({
        productId: productId,
        quantity: quantity + 1,
      })
    );
  }

  function handleDeleteCartItem() {
    dispatch(deleteCartItem(productId));
  }

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 border-b border-gray-200 group">
          <Box sx={{ width: 1000, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Skeleton
              sx={{ bgcolor: "grey.600" }}
              variant="rectangular"
              width={126}
              height={118}
            />
            <div className="w-full flex flex-col gap-2">
              <Skeleton sx={{ width: '55%' }} animation="wave" />
              <Skeleton sx={{ width: '55%' }} animation="wave" />
            </div>
          </Box>
        </div>
      ) : (
        <div className="relative flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 border-b border-gray-200 group">
          <button
            className="absolute top-5 right-5 text-xl invisible group-hover:visible transition-all duration-300"
            onClick={handleDeleteCartItem}
          >
            <MdDelete />
          </button>
          <div className="w-full md:max-w-[126px]">
            <img
              src={detail?.images?.[0]?.url || "/src/assets/images/no-image.jpg"}
              alt="perfume bottle image"
              className="mx-auto"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 w-full">
            <div className="md:col-span-2">
              <div className="flex flex-col max-[500px]:items-center gap-3">
                <h6 className="font-semibold text-base leading-7">
                  {detail.name}
                </h6>
                <h6 className="font-normal text-base leading-7 text-gray-500">
                  {detail.category}
                </h6>
                <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">
                  ${parseInt(detail.price) * quantity}
                </h6>
              </div>
            </div>
            <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
              <div className="flex items-center h-full">
                <button
                  onClick={handleMinusQuantity}
                  className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
                >
                  <FaMinus fontSize={23} />
                </button>
                <input
                  type="text"
                  className="border-y border-gray-200 outline-none font-semibold text-lg w-full max-w-[73px] min-w-[60px] py-[15px] text-center bg-transparent"
                  placeholder="1"
                  min={1}
                  max={10}
                  value={quantity}
                  onChange={(e) =>
                    dispatch(
                      changeQuantity({
                        productId: productId,
                        quantity: parseInt(e.target.value),
                      })
                    )
                  }
                />
                <button
                  onClick={handlePlusQuantity}
                  className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
                >
                  <FaPlus fontSize={23} />
                </button>
              </div>
            </div>
            <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
              <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">
                ${detail.price}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CartItem;
