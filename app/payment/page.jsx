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
import { updatePaymentType } from "@/lib/features/cart/checkoutReducer";
import toast, { Toaster } from "react-hot-toast";

const Payments = () => {
  const [loading, setLoading] = useState(true);
  const [upiId, setUpiId] = useState(null);
  const [cardNumber, setCardNumber] = useState(null);
  const [cvv, setCvv] = useState(null);
  const [expiry, setExpiry] = useState(null);
  const [name, setName] = useState(null);
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

  const handlePaymentSelect = (type) => {
    dispatch(updatePaymentType(type));
  };

  const handleConfirm = () => {
    if (paymentType === "UPI" && upiId === null) {
      toast.error("Please enter all the details");
    } else if (
      cardNumber === null ||
      cvv === null ||
      expiry === null ||
      name === null
    ) {
      toast.error("Please enter all the details");
    } else {
      setDisable(true);
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
                  onClick={() => handlePaymentSelect(item)}
                >
                  <div className="paymentsDetails">
                    <div className="paymentsInfo">
                      <span className="paymentsIcon">
                        <IconComponent keyword={item} />
                      </span>
                      <span className="paymentsType">{item}</span>
                    </div>
                    <div>
                      <CiCircleChevDown
                        style={{ fontSize: "20px", fontWeight: "600" }}
                      />
                    </div>
                  </div>
                  {paymentType === item &&
                    (paymentType === "UPI" ? (
                      <div className="paymentTypeDetails">
                        <input
                          className="paymentTypeSets"
                          type="text"
                          placeholder="Enter you mobile no./ upi id"
                          onChange={(e) => setUpiId(e.target.value)}
                          disabled={disable}
                          value={upiId}
                        />
                        <button
                          className="paymentTypeConfirm"
                          onClick={handleConfirm}
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
                          value={cvv}
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
                          onClick={handleConfirm}
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
