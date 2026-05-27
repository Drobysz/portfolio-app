import { Header, Footer, SidebarMenu } from "./layout/index";
import styles from "./layout/GridLayout.module.scss"
import { AppContextProvider } from "./context/app.context";
import "./globals.css";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
   params: Promise<{ locale: string }>;
}>) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

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