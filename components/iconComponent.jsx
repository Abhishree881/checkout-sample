import React from "react";
import { LuPiggyBank } from "react-icons/lu";
import { CiCreditCard1 } from "react-icons/ci";

const keywordIconMap = {
  UPI: LuPiggyBank,
  CARDS: CiCreditCard1,
};

const IconComponent = ({ keyword }) => {
  const IconComponent = keywordIconMap[keyword];

  if (!IconComponent) {
    return <div>No icon found for keyword: {keyword}</div>;
  }

  return (
    <div>
      <IconComponent style={{ fontSize: "20px" }} />
    </div>
  );
};

export default IconComponent;
