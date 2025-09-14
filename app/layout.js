import { Geist, Geist_Mono, Cinzel_Decorative } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel-deco",
  weight: ["400", "700", "900"],  
  subsets: ["latin"],
});

export const metadata = {
  title: "Quiz of Shadows",
  description: "A dark fantasy quiz game where you battle vampires, demons, and more. Answer questions, defeat enemies, and prove yourself the ultimate hunter.",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${cinzelDecorative.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
