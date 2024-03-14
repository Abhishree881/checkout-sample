import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import Image from "next/image";
import checkoutReducer, {
  updateDiscount,
} from "@/lib/features/cart/checkoutReducer";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IoMdArrowForward } from "react-icons/io";
import "@/styles/ordersummary.css";
import IconComponent from "./iconComponent";

const OrderSummary = ({ type, check }) => {
  const [activeDiscount, setActiveDiscount] = useState(0);
  const router = useRouter();
  const dispatch = useAppDispatch();

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
  const paymentType = useAppSelector(
    (state) => state.checkoutReducer.paymentType
  );

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

  const handleCheckoutCLick = () => {
    if (type === "checkout") {
      if (totalPayableAmount === 0) {
        toast.error(
          "Oops! Shopping Basket is empty, please add some products :)"
        );
      } else {
        router.push("/payment");
      }
    } else {
      if (!check) {
        toast.error("Oops! Please select a payment method :)");
      } else {
        router.push("/confirmation");
      }
    }
  };

  return (
    <div className="orderSummary">
      <h2>Order Summary</h2>
      <div className="amountSection">
        <div className="coupons">
          <span className="couponHeader">
            {type === "confirmation" ? "Payment Method" : "Coupons"}
          </span>
          {type === "confirmation" ? (
            <div className="paymentMethod">
              <IconComponent keyword={paymentType} />
              <span>{paymentType}</span>
            </div>
          ) : (
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
          )}
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
        {type === "confirmation" ? (
          <button className="trackButton">
            Track Order
            <IoMdArrowForward />
          </button>
        ) : (
          <button onClick={handleCheckoutCLick} className="checkoutButton">
            <span>{totalPayableAmount.toFixed(2)}</span>
            <span className="buttonCheckout">
              {type === "checkout" ? "Checkout Now" : "Purchase Now"}
              <IoMdArrowForward />
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
