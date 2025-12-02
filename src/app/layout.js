import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext"; // <--- Importe isso
import Footer from "@/components/Footer"; // <--- Importe
import { Toaster } from "react-hot-toast"; // <--- 1. Importe isso

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

          {/* 2. FALTOU COLOCAR AQUI! Sem isso, as notificações não aparecem */}
          <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />

        <div className="flex flex-col min-h-screen"> {/* Adicione essa div flex para o footer ficar embaixo */}
        {children}
        <Footer /> {/* <--- Adicione aqui */}
      </div>
        </CartProvider>
      </body>
    </html>
  );
}