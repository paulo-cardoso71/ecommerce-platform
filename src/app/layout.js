import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext"; // <--- Importe isso

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextStore",
  description: "Your best e-commerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Envolva tudo aqui dentro */}
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}