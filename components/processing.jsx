// payment processing
import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";

const Processing = () => {
  const merchantLogo = useAppSelector(
    (state) => state.themeReducer.merchantLogo
  );
  return (
    <>
      <Link href="/" className="goBack">
        <Image src={merchantLogo} alt="Merchant Logo" width={25} height={25} />
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
