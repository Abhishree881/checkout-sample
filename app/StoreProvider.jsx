"use client";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";
import { useRef } from "react";

export default function StoreProvider({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
