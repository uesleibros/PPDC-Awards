import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <div className="relative">
        <div
          className="absolute z-0 inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://thegameawards.com/jpegs/home-banner-poster.jpg')",
          }}
        />
        <video playsInline autoPlay preload="auto" loop muted className="absolute inset-0 z-0 object-cover w-full h-full">
          <source src="https://cdn.thegameawards.com/frontend/video/tga-bg-video-2024.webm" type="video/webm" />
          <source src="https://cdn.thegameawards.com/frontend/video/tga-bg-video-2024.mp4" type="video/mp4" />
          <p className="flex items-center justify-center text-xl text-white max-w-1/2">
            Seu navegador não suporta essa tag de vídeo.
          </p>
        </video>

        <div className="relative z-10 min-h-[700px] w-full">
          <div className="z-10 p-20 lg:p-[20vh]">
            <Image src="/brand_logo.png" alt="PPDC Awards Brand Logo" width={500} height={500} quality={100} className="mb-5 lg:mb-0" />
            <h1 className="-mt-10 font-extrabold text-5xl lg:text-7xl text-white">EM DEZEMBRO</h1>
            <h2 className="mt-2 text-4xl font-bold text-yellow-100">POWERPOINT DISCORD</h2>
            <div className="mt-10 flex items-center gap-4 flex-wrap">
              <button className="bg-yellow-200 p-4 text-gray-900 font-bold transition-colors hover:bg-yellow-100">
                CONHEÇA A NOSSA EQUIPE
              </button>
              <button className="bg-gray-900 p-4 text-white font-bold transition-colors hover:bg-gray-800">
                VOTE AGORA
              </button>
            </div>
          </div>
          <div className="relative mt-auto p-4 flex flex-col justify-center min-h-[100px] text-center backdrop-blur-lg bg-black/30">
            <h3 className="font-extrabold text-white">NOSSOS PATROCINADORES</h3>
            <div className="mt-4 flex justify-center items-center gap-4 flex-wrap">
              <Image src="/patrocinadores/bedrock.png" alt="Bedrock" width={30} height={30} quality={100} />
              <Image src="/patrocinadores/erilab.png" alt="Erilab" width={30} height={30} quality={100} />
              <Image src="/patrocinadores/brother_corporation.png" alt="Brother Corporation" width={30} height={30} quality={100} />
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="relative z-10 p-10">
          <h1 className="text-yellow-200 font-extrabold text-5xl">VEJA</h1>
          <div className="mt-5">
            <p className="font-extrabold text-white">Sem nada por enquanto...</p>
          </div>
        </div>
        <div className="top-0 left-0 z-[-10] h-screen w-full bg-[url('https://cdn.thegameawards.com/frontend/jpegs/mid-section-bg_24.jpg')] bg-center bg-cover bg-no-repeat pointer-events-none fixed">
          <div className="absolute inset-0 bg-black opacity-70" />
        </div>
      </div>
    </div>
  );
}
