import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextStore",
  description: "Your best e-commerce experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Global State Provider: Wraps the entire app so Cart data is accessible everywhere */}
        <CartProvider>

          {/* Toast Notification Wrapper (Must be placed at the root level) */}
          <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />

          {/* Sticky Footer Layout: Ensures the footer stays at the bottom even on short pages */}
          <div className="flex flex-col min-h-screen"> 
            {children}
            <Footer />
          </div>
          
        </CartProvider>
      </body>
    </html>
  );
}