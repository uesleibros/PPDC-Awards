import Image from "next/image";
import Button from "@/components/ui/Button";

export default function Home() {
  const partners = [
    {
      "id": "bedrock",
      "title": "Bedrock",
      "size": 30
    },
    {
      "id": "erilab",
      "title": "Erilab",
      "size": 30
    },
    {
      "id": "brother_corporation",
      "title": "Brother Corporation",
      "size": 30
    },
    {
      "id": "digisoft",
      "title": "Digisoft",
      "size": 20
    },
    {
      "id": "pptgames",
      "title": "PPTGames",
      "size": 20
    },
    {
      "id": "vineos",
      "title": "Vine OS",
      "size": 30
    },
    {
      "id": "alabo",
      "title": "Alabo",
      "size": 30
    }
  ]
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
          <div className="z-10 p-10 lg:p-[20vh]">
            <Image src="/brand_logo.png" alt="PPDC Awards Brand Logo" width={500} height={500} quality={100} className="mb-5 lg:mb-0" />
            <h1 className="-mt-10 font-extrabold text-5xl lg:text-7xl text-white">EM DEZEMBRO</h1>
            <h2 className="mt-2 text-4xl font-bold text-yellow-100">POWERPOINT DISCORD</h2>
            <div className="mt-10 flex items-center gap-4 flex-wrap">
              <Button variant={true} content="CONHEÇA A NOSSA EQUIPE" />
              <Button url="/indicados" content="VOTE AGORA" />
            </div>
          </div>
          <div className="relative mt-auto p-4 flex flex-col justify-center min-h-[100px] text-center backdrop-blur-lg bg-black/30">
            <h3 className="font-extrabold text-white">NOSSOS PATROCINADORES</h3>
            <div className="mt-5 mx-auto grid grid-cols-3 lg:grid-cols-4 justify-center items-center gap-4">
              {partners.map((partner, index) => (
                <div key={index} className="flex flex-col items-center h-full">
                  <Image className="object-contain" src={`/patrocinadores/${partner.id}.png`} alt={partner.title} width={partner.size} height={partner.size} quality={100} />
                  <p className="font-bold text-white mt-auto text-xs">{partner.title}</p>
                </div>
              ))}
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
