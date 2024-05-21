/* eslint-disable react/prop-types */
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationHome = ({ pageCount }) => {
  return (
    <div className="my-8">
      <Stack spacing={2}>
        <Pagination count={pageCount} />
      </Stack>
    </div>
  );
};

export default PaginationHome;
