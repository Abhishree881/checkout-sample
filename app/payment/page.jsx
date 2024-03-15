// shopping checkout page at route "/payments"
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
import Image from "next/image";
import {
  addCardDetails,
  addUpiDetails,
} from "@/lib/features/payment/paymentReducer";
import ThemedApp from "../themedApp";
import ThemeToggle from "@/components/themeToggle";

const Payments = () => {
  const [loading, setLoading] = useState(true); // for validating size of cart
  const [check, setCheck] = useState(false); // for validating selected payment method
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardCvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");
  const [name, setName] = useState("");
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
  const merchantLogo = useAppSelector(
    (state) => state.themeReducer.merchantLogo
  );
  const reduxUpi = useAppSelector((state) => state.paymentReducer.upiId);
  const reduxCard = useAppSelector((state) => state.paymentReducer.cardNumber);
  const reduxCvv = useAppSelector((state) => state.paymentReducer.cardCvv);
  const reduxExpiry = useAppSelector(
    (state) => state.paymentReducer.expiryDate
  );
  const reduxName = useAppSelector((state) => state.paymentReducer.name);
  const darkTheme = useAppSelector((state) => state.themeReducer.darkTheme);

  useEffect(() => {
    if (reduxUpi) {
      setUpiId(reduxUpi);
      setCheck(true);
    }
    if (reduxCard) {
      setCardNumber(reduxCard);
      if (reduxCvv) {
        setCvv(reduxCvv);
        if (reduxExpiry) {
          setExpiry(reduxExpiry);
          if (reduxName) {
            setName(reduxName);
            setCheck(true);
          }
        }
      }
    }
  });

  const handlePaymentSelect = (type) => {
    dispatch(updatePaymentType(type));
    if (type === "UPI") {
      // if upi details are added remove card details
      setCardNumber("");
      setCvv("");
      setExpiry("");
      setName("");
      // dispatch(
      //   addCardDetails({ cardNumber: "", cardCvv: "", expiry: "", name: "" })
      // );
    } else {
      // if card details are added remove upi details
      setUpiId("");
      // dispatch(addUpiDetails(""));
    }
  };

  const handleConfirm = () => {
    // all kinds of vaildation
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
      if (paymentType === "UPI") {
        dispatch(addUpiDetails(upiId));
      } else {
        dispatch(addCardDetails({ cardNumber, cardCvv, expiry, name }));
      }
      setCheck(true);
      toast.success("Details filled succesfully");
    }
  };

  useEffect(() => {
    // if cart is empty route back
    if (paymentMethods.length === 0) {
      router.push("/");
    } else {
      setLoading(false);
    }
  });

  return loading ? (
    <div className="loader" />
  ) : (
    <ThemedApp>
      <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
        <div className={darkTheme ? "paymentPage darkBg" : "paymentPage"}>
          <Toaster toastOptions={{ duration: 4000 }} />
          <div className="paymentsContainer">
            <div className="topBar">
              <Link href="/" className="goBack">
                <Image
                  src={merchantLogo}
                  alt="Merchant Logo"
                  width={25}
                  height={25}
                />
                <IoMdArrowBack />
                <span>Shopping Basket</span>
              </Link>
              <ThemeToggle />
            </div>

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
                        // if (paymentType !== item) {
                        //   setDisable(false);
                        //   dispatch(addDisable(false));
                        // }
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
                              value={upiId}
                            />
                            <button
                              className="paymentTypeConfirm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleConfirm();
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
                              value={cardNumber}
                            />
                            <input
                              className="paymentTypeSets"
                              type="text"
                              placeholder="Enter your card cvv"
                              onChange={(e) => setCvv(e.target.value)}
                              value={cardCvv}
                            />
                            <input
                              className="paymentTypeSets"
                              type="text"
                              placeholder="Enter cardholder's name"
                              onChange={(e) => setName(e.target.value)}
                              value={name}
                            />
                            <label className="paymentTypeSetsLabel" for="id">
                              Enter your card&apos;s expiry date
                            </label>
                            <input
                              className="paymentTypeSets"
                              type="date"
                              id="date"
                              placeholder="Enter your card expiry date"
                              onChange={(e) => setExpiry(e.target.value)}
                              value={expiry}
                            />
                            <button
                              className="paymentTypeConfirm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleConfirm();
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
          <OrderSummary type={"purchase"} check={check} />
        </div>
      </div>
    </ThemedApp>
  );
};

export default Payments;
