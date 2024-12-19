import { Open_Sans } from "next/font/google";
import { headers } from "next/headers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "PPDC Awards",
  description: "Comemore o que há de melhor em videogames e veja o que vem por aí - Ao vivo no PowerPoint Discord.",
  openGraph: {
    title: "PPDC Awards",
    description: "Comemore o que há de melhor em videogames e veja o que vem por aí - Ao vivo no PowerPoint Discord.",
    images: ["https://media.discordapp.net/attachments/814721385447817221/1309695987471614002/image.png?ex=674284f0&is=67413370&hm=9648160b4b165a72010ccc6347e091b162dc074b81f847a24b79b06affd3de07&=&format=webp&quality=lossless&width=881&height=403"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PPDC Awards",
    description: "Comemore o que há de melhor em videogames e veja o que vem por aí - Ao vivo no PowerPoint Discord.",
    images: ["https://media.discordapp.net/attachments/814721385447817221/1309695987471614002/image.png?ex=674284f0&is=67413370&hm=9648160b4b165a72010ccc6347e091b162dc074b81f847a24b79b06affd3de07&=&format=webp&quality=lossless&width=881&height=403"],
  },
};

export const viewport = {
  themeColor: "#000000",
}

export default async function RootLayout({ children }) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const isWinnersPage = pathname === "/vencedores";
  return (
    <html lang="pt-BR">
      <body
        className={`${font.className} antialiased`}
      >
        <NextTopLoader showSpinner={false} color="orange" zIndex="9999" />
        {!isWinnersPage && <Header />}
        {children}
        {!isWinnersPage && <Footer />}
      </body>
    </html>
  );
}
