import styles from "./page.module.css";
import Cart from "@/components/cart";

export default function Home() {
  return (
    <main className={styles.main}>
      <Cart />
    </main>
  );
}
