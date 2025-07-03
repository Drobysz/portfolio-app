import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";

import styles from "./layout/GridLayout.module.scss"
import "./globals.css";

import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Main page",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='bg-[#0a0a0a]'>
          <div className={styles.wrapper}>
              <Header className={styles.header}/>
              <main className={styles.main}> 
                {children}
              </main>
              <Footer className={styles.footer}/>
          </div>
      </body>
    </html>
  );
};