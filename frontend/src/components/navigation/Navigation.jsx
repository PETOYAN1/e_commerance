import { Link } from "react-router-dom";
import Header from "../header/Header";
import Search from "../header/Search";


export const Navigation = () => {
  return (
    <>    
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo"/>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                    E-commerce Martin Nelson
                    </span>
                </Link>
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                    <Link to="tel:5541251234" className="text-sm  text-gray-500 dark:text-white hover:underline">
                        (555) 412-1234
                    </Link>
                    <Link to="/login" className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">
                        Login Martin Nelson
                    </Link>
                    <Link to="/register" className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">
                        Register Martin Nelson
                    </Link>
                    <Header/>
                </div>
            </div>
        </nav>
        <nav className="bg-gray-50 dark:bg-gray-700">
          <div className="max-w-screen-xl px-4 py-3 mx-auto">
            <div className="flex items-center">
              <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                <li>
                  <Link to="/" className="text-gray-900 dark:text-white hover:underline" aria-current="page">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-900 dark:text-white hover:underline">
                    Team
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-900 dark:text-white hover:underline">
                    Features
                  </Link>
                </li>
              </ul>
              <div>
                <Search/>
              </div>
            </div>
          </div>
        </nav>
    </>
  )
}
