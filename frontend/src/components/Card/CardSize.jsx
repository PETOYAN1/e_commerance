import { IoAppsSharp } from "react-icons/io5";
import { AiFillAppstore } from "react-icons/ai";
import { Link, useSearchParams } from "react-router-dom";

export default function CardSize() {
  const [searchParams] = useSearchParams();
  const cardSize = searchParams.get("cardsize") || "small";

  const getUpdatedQueryString = (size) => {
    const params = new URLSearchParams(searchParams);
    params.set('cardsize', size);
    return `?${params.toString()}`;
  };

  return (
    <div className="flex items-center gap-2 text-[25px]">
      <Link
        to={getUpdatedQueryString('big')}
        className="relative"
      >
        <AiFillAppstore />
        {cardSize === "big" && (
          <span className="absolute rounded-lg bottom-0 translate-y-1 w-full h-[4px] bg-purple-500"></span>
        )}
      </Link>
      <Link
        to={getUpdatedQueryString('small')}
        className="relative"
      >
        <IoAppsSharp />
        {cardSize === "small" && (
          <span className="absolute rounded-lg bottom-0 translate-y-1 w-full h-[4px] bg-purple-500"></span>
        )}
      </Link>
    </div>
  );
}
