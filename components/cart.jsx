// Shoping Basket
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
import ThemeToggle from "./themeToggle";

const Cart = () => {
  const isFirstLoad = useRef(true);
  const [loading, setLoading] = useState(true); // for api load
  const [refresh, setRefresh] = useState(false); // for cache method
  const [isModalOpen, setIsModalOpen] = useState(false); //for picture preview
  const [selectedImageSrc, setSelectedImageSrc] = useState(""); // for picture preview
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(
    (state) => state.checkoutReducer.cartProducts
  );
  const merchantLogo = useAppSelector(
    (state) => state.themeReducer.merchantLogo
  );

  useEffect(() => {
    // to call api only once per mount
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
    await fetch(
      `https://groww-intern-assignment.vercel.app/v1/api/order-details`, // next by default caches the data, using no-store to override caching
      refresh ? { cache: "no-store" } : { cache: "force-cache" }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(addCartProducts(data.products)); // adding cart products from api to redux
        dispatch(addPaymentMethods(data.paymentMethods)); // adding payment methods from api to redux
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setLoading(false);
      });
  };

  const handleRefreshClick = () => {
    setRefresh(true);
    handleFetch();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImageSrc("");
  };

  return loading ? (
    <div className="loader"></div>
  ) : (
    <div className="container">
      <div className="cacheMethod">
        <span onClick={handleRefreshClick}>Refresh Cart</span>{" "}
        {/* Changing cache method */}
      </div>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="cartSide">
        <div className="goBack">
          <Image
            src={merchantLogo}
            alt="Merchant Logo"
            width={25}
            height={25}
          />
          <IoMdArrowBack />
          <span>Continue Shopping</span>
          {/* <ThemeToggle /> */}
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
      {/* Modal to preview the image of items in the cart */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        imageSrc={selectedImageSrc}
      />
    </div>
  );
};

export default Cart;
