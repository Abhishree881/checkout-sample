import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";

const Processing = () => {
  return (
    <>
      <Link href="/" className="goBack">
        <IoMdArrowBack />
        <span>Continue Shopping</span>
      </Link>
      <div className="processingPage">
        Processing Payment...
        <div />
      </div>
    </>
  );
};

export default Processing;
