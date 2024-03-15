import { Poppins, Quicksand, Montserrat } from "next/font/google";
import "@/app/globals.scss";
import StoreProvider from "@/app/StoreProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "InstaPayments",
  description: "Generated for Groww by Abhishree",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        {/* montserrat font, which next js fetches itself */}
        <StoreProvider>{children}</StoreProvider> {/*redux store*/}
      </body>
    </html>
  );
}
