"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import "@/styles/payments.css";
import OrderSummary from "@/components/orderSummary";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";
import IconComponent from "@/components/iconComponent";
import { CiCircleChevDown } from "react-icons/ci";
import { CiCircleChevUp } from "react-icons/ci";
import { updatePaymentType } from "@/lib/features/cart/checkoutReducer";
import toast, { Toaster } from "react-hot-toast";
import {
  addCardDetails,
  addDisable,
  addUpiDetails,
} from "@/lib/features/payment/paymentReducer";

const Payments = () => {
  const [loading, setLoading] = useState(true);
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardCvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");
  const [name, setName] = useState("");
  const [disable, setDisable] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const paymentMethods = useAppSelector(
    (state) => state.checkoutReducer.paymentMethods
  );
  const cartProducts = useAppSelector(
    (state) => state.checkoutReducer.cartProducts
  );
  const paymentType = useAppSelector(
    (state) => state.checkoutReducer.paymentType
  );
  const reduxUpi = useAppSelector((state) => state.paymentReducer.upiId);
  const reduxDisable = useAppSelector((state) => state.paymentReducer.disable);

  useEffect(() => {
    setDisable(reduxDisable);
  });

  const handlePaymentSelect = (type) => {
    dispatch(updatePaymentType(type));
  };

  const handleConfirm = () => {
    if (paymentType === "UPI" && upiId.length === 0) {
      toast.error("Please enter all the details");
    } else if (
      paymentType === "CARDS" &&
      (cardNumber.length === 0 ||
        cardCvv.length === 0 ||
        expiry.length === 0 ||
        name.length === 0)
    ) {
      toast.error("Please enter all the details");
    } else if (paymentType === "UPI" && upiId.length < 10) {
      toast.error("Upi Id or Mobile Number should be atleast 10 digit long");
    } else if (paymentType === "CARDS" && cardNumber.length !== 16) {
      toast.error("Card Number should be only 16 digits long");
    } else if (paymentType === "CARDS" && cardCvv.length !== 3) {
      toast.error("CVV should be only 3 digits long");
    } else {
      setDisable(true);
      if (paymentType === "UPI") {
        dispatch(addUpiDetails(upiId));
        setCardNumber("");
        setCvv("");
        setExpiry("");
        setName("");
      } else {
        dispatch(addCardDetails({ cardNumber, cardCvv, expiry, name }));
        setUpiId("");
      }
      toast.success("Details filled succesfully");
    }
  };

  useEffect(() => {
    if (paymentMethods.length === 0) {
      router.push("/");
    } else {
      setLoading(false);
    }
  });

  return loading ? (
    <div className="loader" />
  ) : (
    <div className="paymentPage">
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="paymentsContainer">
        <Link href="/" className="goBack">
          <IoMdArrowBack />
          <span>Shopping Basket</span>
        </Link>
        <div className="paymentsContent">
          <h1 className="header">Shopping Checkout</h1>
          <p className="cartCount">
            {"You have "}
            {cartProducts.length}
            {" item"}
            <>{cartProducts.length !== 1 ? "s" : ""}</>
            {" in your basket"}
          </p>
          <div>
            {paymentMethods.map((item, index) => {
              return (
                <div
                  key={index}
                  className="paymentsCard"
                  onClick={() => {
                    handlePaymentSelect(item);
                    if (paymentType !== item) {
                      setDisable(false);
                      dispatch(addDisable(false));
                    }
                  }}
                >
                  <div className="paymentsDetails">
                    <div className="paymentsInfo">
                      <span className="paymentsIcon">
                        <IconComponent keyword={item} />
                      </span>
                      <span className="paymentsType">{item}</span>
                    </div>
                    <div>
                      {paymentType === item ? (
                        <CiCircleChevUp
                          style={{ fontSize: "20px", fontWeight: "600" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePaymentSelect(null);
                          }}
                        />
                      ) : (
                        <CiCircleChevDown
                          style={{ fontSize: "20px", fontWeight: "600" }}
                        />
                      )}
                    </div>
                  </div>
                  {paymentType === item &&
                    (paymentType === "UPI" ? (
                      <div className="paymentTypeDetails">
                        <input
                          className="paymentTypeSets"
                          type="text"
                          placeholder="Enter your mobile number / upi id"
                          onChange={(e) => setUpiId(e.target.value)}
                          disabled={disable}
                          value={reduxUpi ? reduxUpi : upiId}
                        />
                        <button
                          className="paymentTypeConfirm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleConfirm();
                          }}
                          disabled={disable}
                          style={{
                            cursor: disable ? "not-allowed" : "pointer",
                          }}
                        >
                          Confirm
                        </button>
                      </div>
                    ) : (
                      <div className="paymentTypeDetails">
                        <input
                          className="paymentTypeSets"
                          type="text"
                          placeholder="Enter your card no."
                          onChange={(e) => setCardNumber(e.target.value)}
                          disabled={disable}
                          value={cardNumber}
                        />
                        <input
                          className="paymentTypeSets"
                          type="text"
                          placeholder="Enter your card cvv"
                          onChange={(e) => setCvv(e.target.value)}
                          disabled={disable}
                          value={cardCvv}
                        />
                        <input
                          className="paymentTypeSets"
                          type="date"
                          placeholder="Enter your card expiry"
                          onChange={(e) => setExpiry(e.target.value)}
                          disabled={disable}
                          value={expiry}
                        />
                        <input
                          className="paymentTypeSets"
                          type="text"
                          placeholder="Enter cardholder's name"
                          onChange={(e) => setName(e.target.value)}
                          disabled={disable}
                          value={name}
                        />
                        <button
                          className="paymentTypeConfirm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleConfirm();
                          }}
                          disabled={disable}
                          style={{
                            cursor: disable ? "not-allowed" : "pointer",
                          }}
                        >
                          Confirm
                        </button>
                      </div>
                    ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <OrderSummary type={"purchase"} />
    </div>
  );
};

export default Payments;
