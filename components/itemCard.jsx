import React, { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import checkoutReducer, {
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
} from "@/lib/features/cart/checkoutReducer";
import Image from "next/image";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";

const ItemCard = ({ item, setIsModalOpen, setSelectedImageSrc, index }) => {
  const [expandedIndices, setExpandedIndices] = useState([]);
  const dispatch = useAppDispatch();

  const toggleExpanded = (index) => {
    if (expandedIndices.includes(index)) {
      setExpandedIndices(expandedIndices.filter((i) => i !== index));
    } else {
      setExpandedIndices([...expandedIndices, index]);
    }
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

  const handleImageClick = (imageSrc) => {
    setSelectedImageSrc(imageSrc);
    setIsModalOpen(true);
  };

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
};

export default ItemCard;
