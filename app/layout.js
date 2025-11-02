import { Red_Hat_Display, Red_Hat_Text } from "next/font/google";
import Header from "./components/Header/Header";
import SideMenu from "./components/SideMenu/SideMenu";
import "./styles/globals.scss";

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-red-hat-display",
});

const redHatText = Red_Hat_Text({
  subsets: ["latin"],
  variable: "--font-red-hat-text",
});

export const metadata = {
  title: "Trucker English",
  description: "CDL training and vocabulary practice",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${redHatDisplay.className} ${redHatText.variable}`}>
        <Header />
        <main className="main">
          <SideMenu />
          <div className="content">{children}</div>
        </main>
      </body>
    </html>
  );
}