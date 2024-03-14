import React from "react";
import { IoMdArrowBack } from "react-icons/io";

const Processing = () => {
  return (
    <>
      <div className="goBack">
        <IoMdArrowBack />
        <span>Continue Shopping</span>
      </div>
      <div className="processingPage">
        Processing Payment...
        <div />
      </div>
    </>
  );
};

export default Processing;
