import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";
import { SidebarMenu } from "./layout/SidebarMenu/SidebarMenu";

import styles from "./layout/GridLayout.module.scss"
import { AppContextProvider } from "./context/AppContext";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='bg-[#0a0a0a]'>
          <AppContextProvider>
            <SidebarMenu />
            <div className={styles.wrapper}>
                <Header className={styles.header}/>
                <main className={styles.main}> 
                  {children}
                </main>
                <Footer className={styles.footer}/>
            </div>
          </AppContextProvider>
      </body>
    </html>
  );
};