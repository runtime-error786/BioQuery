"use client"
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { Storee } from "../../Store";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <Provider store={Storee}>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </Provider>
  );
}
