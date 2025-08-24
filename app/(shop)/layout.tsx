import Footer from "../components/organism/Footer";
import Header from "../components/organism/header/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body>
        {" "}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
