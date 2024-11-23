import Button from "@/components/ui/Button";

export default function Indicados() {
	return (
		<div className="min-h-screen w-full">
      <div className="relative">
        <div
          className="absolute z-0 inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://thegameawards.com/jpegs/rewind-banner-poster.jpg')",
          }}
        />
        <video playsInline autoPlay preload="auto" loop muted className="absolute inset-0 z-0 object-cover w-full h-full">
          <source src="https://cdn.thegameawards.com/frontend/video/about-bg-banner_2024.webm" type="video/webm" />
          <source src="https://cdn.thegameawards.com/frontend/video/about-bg-banner_2024.mp4" type="video/mp4" />
          <p className="flex items-center justify-center text-xl text-white max-w-1/2">
            Seu navegador não suporta essa tag de vídeo.
          </p>
        </video>

        <div className="relative z-10 min-h-[700px] w-full">
          <div className="z-10 p-10 lg:px-[20vh] py-[40vh]">
            <h1 className="-mt-10 font-extrabold text-5xl lg:text-7xl text-yellow-200">INDICADOS</h1>
            <h2 className="mt-2 max-w-[700px] text-2xl font-bold text-slate-300">Vote agora ou veja os indicados deste ano. Descubra os vencedores ao vivo no PowerPoint Discord</h2>
            <div className="mt-10 flex items-center gap-4 flex-wrap">
              <Button variant={true} content="VER TODAS AS CATEGORIAS" />
              <Button url="/indicados" content="COMECE A VOTAR" />
            </div>
          </div>
        </div>
      </div>
    </div>
	);
}