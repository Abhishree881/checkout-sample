// payment failed
import React from "react";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";

const Failed = () => {
  return (
    <div className="failedPage">
      <Link href="/" className="goBack">
        <IoMdArrowBack />
        <span>Shopping Basket</span>
      </Link>
    </div>
  );
};

export default Failed;
