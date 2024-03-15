// Shopping confirmation page at route "/confirmation"
"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import "@/styles/confirmation.css";
import Failed from "@/components/failed";
import Processing from "@/components/processing";
import Confirmed from "@/components/confirmed";

const Confirmation = () => {
  const [randomResult, setRandomResult] = useState(""); // setting random confirmation
  const [loading, setLoading] = useState(true); // checking cart state
  const router = useRouter();
  const cartProducts = useAppSelector(
    (state) => state.checkoutReducer.cartProducts
  );

  useEffect(() => {
    // if cart is empty route back
    if (cartProducts.length === 0) {
      router.push("/");
    } else {
      setLoading(false);
    }
    const stringsArray = ["Failed", "Processing", "Confirmed"];
    const randomIndex = Math.floor(Math.random() * stringsArray.length);
    const randomString = stringsArray[randomIndex];
    setRandomResult(randomString);
    // setting random confirmation
  });

  return loading ? (
    <div className="loader" />
  ) : (
    <div className="confirmationPage">
      {randomResult === "Failed" ? (
        <Failed />
      ) : randomResult === "Processing" ? (
        <Processing />
      ) : (
        <Confirmed />
      )}
    </div>
  );
};

export default Confirmation;
