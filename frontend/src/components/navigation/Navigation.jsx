import { Link } from "react-router-dom";
import Header from "../header/Header";
import Search from "../header/Search";
import { MdPerson } from "react-icons/md";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { grey } from "@mui/material/colors";


export const Navigation = () => {

  
  const StyledBadge = styled(Badge)(() => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid dark:bg-gray-700`,
      padding: '0 4px',
      color: 'dark:bg-gray-700' 
    },
  }));
  return (
    <>    
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo"/>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                      E-commerce
                    </span>
                </Link>
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                    <Link to="tel:5541251234" className="text-sm  text-gray-500 dark:text-white hover:underline">
                        (555) 412-1234
                    </Link>
                    <Link to="/login" className="text-sm flex items-center gap-1 text-blue-500 hover:underline">
                      <MdPerson /> Login
                    </Link>
                    <Link to="/register" className="text-sm  text-blue-500 hover:underline">
                        Register
                    </Link>
                    <Header/>
                </div>
            </div>
        </nav>
        <nav className="bg-gray-50 dark:bg-gray-700 w-50 mx-auto">
          <div className="max-w-screen-xl px-4 py-3 mx-auto">
            <div className="flex items-center justify-between">
              <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                <li>
                  <Link to="/" className="text-gray-900 dark:text-white hover:underline" aria-current="page">
                    Home
                  </Link>
                </li>
              </ul>
              <div className="w-80">
                <Search/>
              </div>
              <div className="flex items-center justify-normal gap-2">
                <IconButton aria-label="cart" sx={{ color: grey[100] }}>
                  <StyledBadge badgeContent={4} color="primary" sx={{ color: grey[100] }}>
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
                <IconButton>
                  <PersonIcon sx={{ color: grey[100] }}/>
                </IconButton>
              </div>
            </div>
          </div>
        </nav>
    </>
  )
}
