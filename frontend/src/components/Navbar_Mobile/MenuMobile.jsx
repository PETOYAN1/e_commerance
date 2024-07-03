/* eslint-disable react/prop-types */
import { useTheme } from '@emotion/react'
import { IconButton, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { FaAngleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";

export default function MenuMobile({ setIsHideMobile, categoryData }) {
  const theme = useTheme();
  const [subMenuData, setSubMenuData] = useState(null);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const matches = useMediaQuery('(max-width:1020px)');

  useEffect(() => {
    if (matches) {
      setIsHideMobile(true);
    } else {
      setIsHideMobile(false);
    }
  }, [matches])

  function handleHideMenuMobile () {
    setIsHideMobile(false)
    setSubMenuOpen(false);
  }

  function handleOpenSubCategory (category) {
    setSubMenuData(category.children);
    setSubMenuOpen(true);
  }

  function handleSubMenuClose () {
    setSubMenuOpen(false);
    setIsHideMobile(true);
  }

  return (
    <div className={`fixed w-full top-0 z-[1021] ${ theme.palette.mode === "dark" ? 'bg-gray-900' : 'bg-gray-100' }`} style={{ minHeight: 'calc(100vh - 70px)' }}>
      <IconButton aria-label="home" onClick={handleHideMenuMobile} sx={{ position: 'absolute', top: 0, right: 3}}>
        <CgClose />
      </IconButton>
      <div className="w-full mt-10">
        <ul className='flex flex-col w-full'>
         {categoryData?.map((category) => (
            <li 
              onClick={() => handleOpenSubCategory(category)}
              className='flex justify-between p-3 w-100 select-none'
              key={category.id}
              >
                {category.name}
                <span className='text-[20px]'><FaAngleRight /></span>
            </li>
          ))}
        </ul>
      </div>

      {subMenuOpen && subMenuData && (
        <div className={`fixed w-full top-0 z-[1021] ${ theme.palette.mode === "dark" ? 'bg-gray-900' : 'bg-gray-100' }`} style={{ minHeight: 'calc(100vh - 70px)' }}>
          <ul>
            <div className='flex items-center gap-2 mb-4'>
              <IconButton aria-label="home" onClick={handleSubMenuClose} sx={{ margin: '5px' }}>
                <FaArrowLeftLong />
              </IconButton>
              <h2 className="font-bold">{categoryData.name}</h2>
            </div>
            {subMenuData.map((subCategory) => (
                <li key={subCategory.id}
                className='flex justify-between p-3 w-100 select-none'
                 onClick={handleHideMenuMobile}>
                  <Link
                    to={`/category/${subCategory.slug}/${subCategory.id}`}
                    className="sub_link"
                  >
                    {subCategory.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  )
}
