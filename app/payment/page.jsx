"use client";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";

const page = () => {
  const dispatch = useAppDispatch();
  const totalPayableAmount = useAppSelector(
    (state) => state.checkoutReducer.totalPayableAmount
  );
  return <div>Hello World! please pay {totalPayableAmount}</div>;
};

export default page;
