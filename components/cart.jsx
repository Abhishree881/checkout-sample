"use client";
import React, { useEffect, useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import checkoutReducer, {
  addCartProducts,
  addPaymentMethods,
} from "@/lib/features/cart/checkoutReducer";
import Image from "next/image";
import "@/styles/checkout.css";
import { IoMdArrowBack } from "react-icons/io";
import Modal from "./modal";
import OrderSummary from "./orderSummary";
import { Toaster } from "react-hot-toast";
import ItemCard from "./itemCard";

const Cart = () => {
  const isFirstLoad = useRef(true);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState("");
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(
    (state) => state.checkoutReducer.cartProducts
  );

  useEffect(() => {
    if (isFirstLoad.current) {
      if (cartProducts.length === 0) {
        handleFetch();
        isFirstLoad.current = false;
      } else {
        setLoading(false);
      }
    }
  });

  const handleFetch = async () => {
    setLoading(true);
    const cacheMethod = refresh ? "no-store" : "force-cache";
    await fetch(
      `https://groww-intern-assignment.vercel.app/v1/api/order-details`,
      { cache: cacheMethod }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(addCartProducts(data.products));
        dispatch(addPaymentMethods(data.paymentMethods));
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setLoading(false);
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImageSrc("");
  };

  return loading ? (
    <div className="loader"></div>
  ) : (
    <div className="container">
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="cartSide">
        <div className="goBack">
          <IoMdArrowBack />
          <span>Continue Shopping</span>
        </div>
        <div className="cartContent">
          <h1 className="header">Shopping Basket</h1>
          <p className="cartCount">
            {"You have "}
            {cartProducts.length}
            {" item"}
            <>{cartProducts.length !== 1 ? "s" : ""}</>
            {" in your basket"}
          </p>
          {cartProducts.length === 0 ? (
            <div className="emptyCart">
              <Image
                width={150}
                height={150}
                src="/emptyCart.png"
                alt="Empty Cart"
              />
              <spa>Your Basket is Empty!</spa>
            </div>
          ) : (
            <div className="itemCards">
              {cartProducts.map((item, index) => {
                return (
                  <ItemCard
                    key={item.id}
                    item={item}
                    index={index}
                    setIsModalOpen={setIsModalOpen}
                    setSelectedImageSrc={setSelectedImageSrc}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
      <OrderSummary type={"checkout"} />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        imageSrc={selectedImageSrc}
      />
    </div>
  );
};

export default Cart;
