// Shopping confirmation page at route "/confirmation"
"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import "@/styles/confirmation.css";
import Failed from "@/components/failed";
import Processing from "@/components/processing";
import Confirmed from "@/components/confirmed";
import ThemedApp from "../themedApp";

const Confirmation = () => {
  const isFirstLoad = useRef(true);
  const [randomResult, setRandomResult] = useState(""); // setting random confirmation
  const [loading, setLoading] = useState(true); // checking cart state
  const router = useRouter();
  const cartProducts = useAppSelector(
    (state) => state.checkoutReducer.cartProducts
  );
  const darkTheme = useAppSelector((state) => state.themeReducer.darkTheme);

  useEffect(() => {
    // if cart is empty route back
    if (cartProducts.length === 0) {
      router.push("/");
    } else {
      setLoading(false);
    }
    if (isFirstLoad.current) {
      // restrict randomness to 1 time per mount
      const stringsArray = ["Confirmed"];
      const randomIndex = Math.floor(Math.random() * stringsArray.length);
      const randomString = stringsArray[randomIndex];
      setRandomResult(randomString);
      // setting random confirmation
      isFirstLoad.current = false;
    }
  });

  return loading ? (
    <div className="loader" />
  ) : (
    <ThemedApp>
      <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
        <div
          className={
            darkTheme ? " darkBg confirmationPage" : "confirmationPage"
          }
        >
          {randomResult === "Failed" ? (
            <Failed />
          ) : randomResult === "Processing" ? (
            <Processing />
          ) : (
            <Confirmed />
          )}
        </div>
      </div>
    </ThemedApp>
  );
};

export default Confirmation;
