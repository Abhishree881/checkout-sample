import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import OrderSummary from "./orderSummary";
import moment from "moment";

const Confirmed = () => {
  const getFormattedDate = (timestamp) => {
    return moment(timestamp).format("DD-MM-YYYY");
  };
  const timestamp = Date.now();
  const currentDate = new Date(timestamp);
  const numberOfDaysToAdd = 4;
  currentDate.setDate(currentDate.getDate() + numberOfDaysToAdd);
  const updatedTimestamp = currentDate.getTime();

  return (
    <div className="confirmedPage">
      <div className="confirmationSide">
        <div className="goBack">
          <IoMdArrowBack />
          <span>Continue Shopping</span>
        </div>
        <div className="confirmation">
          <h2>Thank You for Shopping with Us!</h2>
          <p>
            We have successfully received your order. You will receive a
            confirmation email shortly. As soon as the package has been shipped,
            you will receive another email with the tracking information and
            delivery details.
          </p>
          <div className="shippingDetails">
            <h3>Order Details</h3>
            <div>
              <span>Address: </span>
              <span>ABC Tower, XYZ Road, Groww City</span>
            </div>
            <div>
              <span>Delivery Date: </span>
              <span>{getFormattedDate(updatedTimestamp)}</span>
            </div>
            <div>
              <span>Order Id: </span>
              <span>21</span>
            </div>
            <div>
              <span>Order Date: </span>
              <span>{getFormattedDate(timestamp)}</span>
            </div>
            <div>
              <span>Payment: </span>
              <span>Completed</span>
            </div>
          </div>
        </div>
      </div>
      <OrderSummary type={"confirmation"} />
    </div>
  );
};

export default Confirmed;
