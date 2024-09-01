import { useState } from "react";
import { useTheme } from "@mui/material";

const EditNameModal = ({ handleClose, userName}) => {
  const [value, setValue] = useState(userName);
  const theme = useTheme()

  function handleChangeName (e) {
    setValue(e.target.value)
  }

    return (
      <div
        id="crud-modal"
        aria-hidden="true"
        className="overflow-y-auto overflow-x-hidden fixed top-0 left-0 z-[155] flex justify-center items-center w-full h-full" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className={`relative rounded-lg shadow ${ theme.palette.mode === "dark" ? 'bg-purple-950' : 'bg-purple-100' }`}>
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-lg font-semibold">
                Update name
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                onClick={handleClose}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-1">
                <div className="col-span-1">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={value}
                    onChange={(e) => handleChangeName(e)}
                    className="border outline-none border-gray-300 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500 text-black"
                    placeholder="Type product name"
                    required=""
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white flex items-center justify-center bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default EditNameModal;
  