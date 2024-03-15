// Home Page with route "/"
import styles from "./page.module.css";
import Cart from "@/components/cart";
import ThemedApp from "./themedApp";

export default function Home() {
  return (
    <main>
      <ThemedApp>
        <Cart /> {/*Shopping Basket*/}
      </ThemedApp>
    </main>
  );
}
