import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Prompt Design Gallery",
  description: "Interactive playground for AI prompt curation and web design showcases."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-950 text-slate-100`}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
