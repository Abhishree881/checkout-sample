"use client";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";

const Checkout = () => {
  const dispatch = useAppDispatch();
  const totalPayableAmount = useAppSelector(
    (state) => state.checkoutReducer.totalPayableAmount
  );
  return <div>Hello World! please pay {totalPayableAmount}</div>;
};

export default Checkout;
