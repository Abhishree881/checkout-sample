// Item Card for cart items
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import checkoutReducer, {
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
} from "@/lib/features/cart/checkoutReducer";
import Image from "next/image";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { IoTrashBinOutline } from "react-icons/io5";
import "@/styles/itemcard.css";

const ItemCard = ({ item, setIsModalOpen, setSelectedImageSrc, index }) => {
  const [expandedIndices, setExpandedIndices] = useState([]); // for list of items that have extended title
  const dispatch = useAppDispatch();
  const darkTheme = useAppSelector((state) => state.themeReducer.darkTheme);

  const toggleExpanded = (index) => {
    if (expandedIndices.includes(index)) {
      setExpandedIndices(expandedIndices.filter((i) => i !== index));
    } else {
      setExpandedIndices([...expandedIndices, index]);
    }
  };

  // redux functions being triggered using dispatch
  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity({ id }));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity({ id }));
  };

  const handleRemoveProduct = (id, price, quantity) => {
    dispatch(removeProduct({ id, price, quantity }));
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImageSrc(imageSrc);
    setIsModalOpen(true);
  };

  return (
    <div className="cartCard">
      <div
        className={
          darkTheme ? "cartItemImageBox specialBgImage" : "cartItemImageBox"
        }
      >
        <Image
          src={item.image}
          alt={item.title}
          className={
            darkTheme ? "cartItemImage specialBgImage " : "cartItemImage"
          }
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
                {/* Items will only be displayed upto 20 chars, and remaining will be displayed on expanding */}
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
                {item.title.slice(0, 20)}
                {item.title.length > 20 ? (
                  <span
                    className="titleExpand"
                    onClick={() => toggleExpanded(index)}
                  >
                    {"... show more"}
                  </span>
                ) : null}
              </div>
            )}
          </div>
          <span className="itemPrice">{item.price}</span>
        </div>
        <div className="itemInteractions">
          {/* Change Quantity of items */}
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
          {/* Delete Item */}
          <div
            onClick={() =>
              handleRemoveProduct(item.id, item.price, item.quantity)
            }
            className="deleteItem"
          >
            <IoTrashBinOutline />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
