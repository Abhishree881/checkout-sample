"use client";
import React, { useEffect, useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import checkoutReducer, {
  addCartProducts,
  addPaymentMethods,
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
  updateDiscount,
} from "@/lib/features/cart/checkoutReducer";
import Image from "next/image";
import "@/styles/checkout.css";
import { IoMdArrowBack } from "react-icons/io";
import { IoMdArrowForward } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import Modal from "./modal";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Cart = () => {
  const isFirstLoad = useRef(true);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [expandedIndices, setExpandedIndices] = useState([]);
  const [activeDiscount, setActiveDiscount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState("");
  const router = useRouter();

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
      if (cartProducts.length === 0) {
        handleFetch();
        isFirstLoad.current = false;
      } else {
        setLoading(false);
      }
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

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity({ id }));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity({ id }));
  };

  const handleRemoveProduct = (id, price, quantity) => {
    dispatch(removeProduct({ id, price, quantity }));
  };

  const handle20OffDiscount = (price) => {
    if (activeDiscount === 20) {
      setActiveDiscount(0);
      dispatch(updateDiscount(0));
    } else {
      setActiveDiscount(20);
      const discount = 0.2 * price;
      dispatch(updateDiscount(discount));
    }
  };

  const handle25OffDiscount = (price) => {
    if (activeDiscount === 25) {
      setActiveDiscount(0);
      dispatch(updateDiscount(0));
    } else {
      setActiveDiscount(25);
      let discount = 0.25 * price;
      if (discount > 100) discount = 100;
      dispatch(updateDiscount(discount));
    }
  };

  const handle50OffDiscount = (price) => {
    if (activeDiscount === 50) {
      setActiveDiscount(0);
      dispatch(updateDiscount(0));
    } else {
      setActiveDiscount(50);
      let discount = 0.5 * price;
      if (discount > 80) discount = 80;
      dispatch(updateDiscount(discount));
    }
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImageSrc(imageSrc);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImageSrc("");
  };

  const handleCheckoutCLick = () => {
    if (totalPayableAmount === 0) {
      toast.error(
        "Oops! Shopping Basket is empty, please add some products :)",
        {
          style: {
            backgroundColor: "rgb(250,24,34,0.3)",
            color: "white",
          },
        }
      );
    } else {
      router.push("/payment");
    }
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
            {" in your cart"}
          </p>
          {cartProducts.length === 0 ? (
            <div className="emptyCart">
              <Image
                width={250}
                height={250}
                src="/emptyCart.png"
                alt="Empty Cart"
              />
              <spa>Your Basket is Empty!</spa>
            </div>
          ) : (
            cartProducts.map((item, index) => {
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
                      onClick={() => handleImageClick(item.image)}
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
                          handleRemoveProduct(
                            item.id,
                            item.price,
                            item.quantity
                          )
                        }
                        className="deleteItem"
                      >
                        Remove Item
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="orderSummary">
        <h2>Order Summary</h2>
        <div className="amountSection">
          <div className="coupons">
            <span className="couponHeader">Coupons</span>
            <div className="couponOptions">
              <div className="discountCouponContainer">
                <Image
                  src="/20Off.jpeg"
                  width={100}
                  height={100}
                  className={
                    activeDiscount === 20
                      ? "activeDiscount discountCoupon"
                      : "discountCoupon"
                  }
                />
                <div
                  onClick={() => {
                    handle20OffDiscount(totalRawAmount);
                  }}
                  className="couponOverlay"
                >
                  <span className="couponText">20% off</span>
                </div>
              </div>
              <div className="discountCouponContainer">
                <Image
                  src="/25Off.jpeg"
                  width={100}
                  height={100}
                  className={
                    activeDiscount === 25
                      ? "activeDiscount discountCoupon"
                      : "discountCoupon"
                  }
                />
                <div
                  onClick={() => {
                    handle25OffDiscount(totalRawAmount);
                  }}
                  className="couponOverlay"
                >
                  <span className="couponText">25% off upto 100</span>
                </div>
              </div>
              <div className="discountCouponContainer">
                <Image
                  src="/50Off.jpeg"
                  width={100}
                  height={100}
                  className={
                    activeDiscount === 50
                      ? "activeDiscount discountCoupon"
                      : "discountCoupon"
                  }
                />
                <div
                  onClick={() => {
                    handle50OffDiscount(totalRawAmount);
                  }}
                  className="couponOverlay"
                >
                  <span className="couponText">50% off upto 80</span>
                </div>
              </div>
            </div>
          </div>
          <div className="checkoutAmount">
            <div className="total">
              <span>Total Amount:</span>
              <span>{totalRawAmount.toFixed(2)}</span>
            </div>
            <div className="delivery">
              <span>Delivery Fee:</span>
              <span>{deliveryCharge.toFixed(2)}</span>
            </div>
            <div className="discount">
              <span>Discount:</span>
              <span>{discount.toFixed(2)}</span>
            </div>
            <div className="totalAmount">
              <span className="checkoutTotal">Total</span>
              <span className="checkoutTotalAmount">
                {totalPayableAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <div className="checkoutSection">
          <button onClick={handleCheckoutCLick} className="checkoutButton">
            <span>{totalPayableAmount.toFixed(2)}</span>
            <span className="buttonCheckout">
              Checkout Now <IoMdArrowForward />
            </span>
          </button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        imageSrc={selectedImageSrc}
      />
    </div>
  );
};

export default Cart;
