import React from "react";
import avatar from "../../assets/images/avatar.png";

export default function Profile() {
  return (
    <div className="mt-5 flex rounded-lg flex-wrap items-center justify-center">
      <div className="container mt-20 sm:w-full md:w-2/3  shadow-lg    transform   duration-200 easy-in-out">
        <div className="flex justify-center px-5 -mt-12">
          <img
            className="h-32 w-32 bg-white p-2 rounded-full   "
            src={avatar}
            alt=""
          />
        </div>
        <div className=" ">
          <div className="text-center px-14">
            <h2 className="text-gray-500 text-3xl font-bold">Mohit Dhiman</h2>
            <p className="mt-2 text-gray-500 text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,{" "}
            </p>
          </div>
          <hr className="mt-6" />
          <div className="flex">
            <div className="text-center w-1/2 p-4 cursor-pointer">
              <p>
                <span className="font-semibold">Location</span>
              </p>
            </div>
            <div className="border"></div>
            <div className="text-center w-1/2 p-4 cursor-pointer">
              <p>
                {" "}
                <span className="font-semibold">My Orders</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
