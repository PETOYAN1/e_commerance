/* eslint-disable react/prop-types */
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useEffect } from "react";


const PaginationHome = ({ currentPage, pageCount, onPageChange }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);
  
  return (
    <div className="my-8 flex justify-center">
      <Stack spacing={2}>
        <Pagination
          count={pageCount}
          onChange={onPageChange}
          page={currentPage}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Stack>
    </div>
  );
};

export default PaginationHome;
