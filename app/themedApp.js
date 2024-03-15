// Home Page with route "/"
"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { addMerchant, addTheme } from "@/lib/features/theme/themeReducer";

export default function ThemedApp({ children }) {
  const isFirstLoad = useRef(true);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.themeReducer.theme);
  const merchantName = useAppSelector(
    (state) => state.themeReducer.merchantName
  );
  const merchantLogo = useAppSelector(
    (state) => state.themeReducer.merchantLogo
  );

  useEffect(() => {
    if (!loading) {
      // Change document title
      document.title = merchantName + " Insta Payemnts";

      // Change favicon
      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon) {
        favicon.href = merchantLogo;
      } else {
        // If favicon element doesn't exist, create one
        const newFavicon = document.createElement("link");
        newFavicon.rel = "icon";
        newFavicon.href = merchantLogo;
        document.head.appendChild(newFavicon);
      }
    }

    // Cleanup function
    return () => {
      // Restore document title
      document.title = "Insta Payments";
    };
  }, [loading]);

  useEffect(() => {
    // Fetch theme data from API
    const fetchTheme = async () => {
      try {
        const response = await fetch(
          "https://groww-intern-assignment.vercel.app/v1/api/merchant-metadata",
          {
            cache: "force-cache",
          }
        );
        const data = await response.json();
        dispatch(addTheme(data.theme));
        dispatch(
          addMerchant({
            merchantName: data.merchantName,
            merchantLogo: data.merchantLogo,
          })
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching theme data:", error);
      }
    };
    if (isFirstLoad.current) {
      // restrict api to 1 time per mount
      if (theme.length === 0) {
        fetchTheme();
        isFirstLoad.current = false;
      } else {
        setLoading(false);
      }
    }
  }, []);

  if (theme.length === 0 || loading) {
    return <div className="loader"></div>;
  }
  return (
    <div
      className={styles.main}
      style={{
        "--background": theme["--background"],
        "--foreground": theme["--foreground"],
        "--primary": theme["--primary"],
        "--primary-foreground": theme["--primary-foreground"],
      }}
    >
      {children}
    </div>
  );
}
