import { IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

export default function Breadcrumbs({ category, brand }) {
    const navigate = useNavigate();

    function handleBackClick () {
        navigate(-1);
    }
    
  return (
    <div className="breadcrumbs my-3 flex items-center gap-3">
        <IconButton onClick={handleBackClick} title="to back">
            <FaArrowLeft />
        </IconButton>
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center text-[14px] space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="crumb">
            <Link to="/" className="hover:underline">Home</Link>
          </li>
          {category && (
            <li className="crumb">
              / <Link to={`/category/${category}`} className="hover:underline">{category}</Link> / 
            </li>
          )}
          {brand && (
            <li className="crumb text-gray-400">
              {brand}
            </li>
          )}
        </ol>
      </nav>
    </div>
  );
}
