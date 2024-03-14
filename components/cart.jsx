"use client";
import React, { useEffect, useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import checkoutReducer, {
  addCartProducts,
  addPaymentMethods,
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
} from "@/lib/features/cart/checkoutReducer";
import Image from "next/image";
import "@/styles/checkout.css";
import { IoMdArrowBack } from "react-icons/io";
import { IoMdArrowForward } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";

const Cart = () => {
  const isFirstLoad = useRef(true);
  const [loading, setLoading] = useState(true);
  const [expandedIndices, setExpandedIndices] = useState([]);
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(
    (state) => state.checkoutReducer.cartProducts
  );
  const paymentMethods = useAppSelector(
    (state) => state.checkoutReducer.paymentMethods
  );
  const totalRawAmount = useAppSelector(
    (state) => state.checkoutReducer.totalRawAmount
  );
  const discount = useAppSelector((state) => state.checkoutReducer.discount);
  const deliveryCharge = useAppSelector(
    (state) => state.checkoutReducer.deliveryCharge
  );
  const totalPayableAmount = useAppSelector(
    (state) => state.checkoutReducer.totalPayableAmount
  );

  useEffect(() => {
    if (isFirstLoad.current) {
      handleFetch();
      isFirstLoad.current = false;
    }
  }, []);

  const toggleExpanded = (index) => {
    if (expandedIndices.includes(index)) {
      setExpandedIndices(expandedIndices.filter((i) => i !== index));
    } else {
      setExpandedIndices([...expandedIndices, index]);
    }
  };

  const handleFetch = async () => {
    setLoading(true);
    await fetch(
      `https://groww-intern-assignment.vercel.app/v1/api/order-details`,
      { cache: "force-cache" } //force-cache
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

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity({ id }));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity({ id }));
  };

  const handleRemoveProduct = (id, price, quantity) => {
    dispatch(removeProduct({ id, price, quantity }));
  };

  return loading ? (
    <div className="loader"></div>
  ) : (
    <div className="container">
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
            {" in your cart"}
          </p>
          {cartProducts.map((item, index) => {
            return (
              <div className="cartCard" key={item.id}>
                <div className="cartItemImageBox">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="cartItemImage"
                    width={60}
                    height={50}
                    placeholder="blur"
                    loading="lazy"
                    blurDataURL="/placeholder.jpeg"
                  ></Image>
                </div>
                <div className="itemDetails">
                  <div className="itemInfo">
                    <div>
                      {expandedIndices.includes(index) ? (
                        <div className="itemTitleExpanded">
                          {item.title}
                          <span
                            className="titleExpand"
                            onClick={() => toggleExpanded(index)}
                          >
                            {" show less"}
                          </span>
                        </div>
                      ) : (
                        <div className="itemTitle">
                          {item.title.slice(0, 25)}
                          {item.title.length > 15 && (
                            <span
                              className="titleExpand"
                              onClick={() => toggleExpanded(index)}
                            >
                              {"... show more"}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <span className="itemPrice">{item.price}</span>
                  </div>
                  <div className="itemInteractions">
                    <div className="itemQuantityChange">
                      <div
                        onClick={() => handleIncreaseQuantity(item.id)}
                        className="quantityChange"
                      >
                        <FiPlus />
                      </div>
                      <div className="quantity">{item.quantity}</div>
                      <div
                        onClick={() => handleDecreaseQuantity(item.id)}
                        className="quantityChange"
                      >
                        <FiMinus />
                      </div>
                    </div>
                    <div
                      onClick={() =>
                        handleRemoveProduct(item.id, item.price, item.quantity)
                      }
                      className="deleteItem"
                    >
                      Remove Item
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="orderSummary">
        <h2>Order Summary</h2>
        <div className="amountSection">
          <div className="coupons">
            <span className="couponHeader">Coupons</span>
            <div className="couponOptions">
              <span>20% off</span>
              <span>50 off</span>
              <span>50% off upto 80</span>
            </div>
          </div>
          <div className="checkoutAmount">
            <div className="total">
              <span>Total Amount:</span>
              <span>{totalRawAmount}</span>
            </div>
            <div className="delivery">
              <span>Delivery Fee:</span>
              <span>{deliveryCharge}</span>
            </div>
            <div className="discount">
              <span>Discount:</span>
              <span>{discount}</span>
            </div>
            <div className="totalAmount">
              <span className="checkoutTotal">Total</span>
              <span className="checkoutTotalAmount">{totalPayableAmount}</span>
            </div>
          </div>
        </div>
        <div className="checkoutSection">
          <button className="checkoutButton">
            <span>{totalPayableAmount}</span>
            <span className="buttonCheckout">
              Checkout Now <IoMdArrowForward />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
