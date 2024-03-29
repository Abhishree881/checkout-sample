// payment failed
import React from "react";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";

const Failed = () => {
  const merchantLogo = useAppSelector(
    (state) => state.themeReducer.merchantLogo
  );
  return (
    <div className="failedPage">
      <Link href="/" className="goBack">
        <Image src={merchantLogo} alt="Merchant Logo" width={25} height={25} />
        <IoMdArrowBack />
        <span>Shopping Basket</span>
      </Link>
    </div>
  );
};

export default Failed;
