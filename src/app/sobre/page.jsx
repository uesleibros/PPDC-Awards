import Image from "next/image";
import Link from "next/link";

export const metadata = {
	title: "Sobre | PPDC Awards"
};

export default function Indicados() {
  const mediaKits = [
    {
      image: "/poster.png",
      title: "POSTER",
      about: "UTILIZADO NO METADATA DO SITE."
    }
  ]

  const advisors = [
    {
      team: "ERILAB",
      image: "/os-cabra/erick.png",
      member: "ERICK LUIZ VB",
      role: "CEO"
    },
    {
      team: "PPTGAMES",
      image: "/os-cabra/daniel-climaco.png",
      member: "DANIEL CLÍMACO",
      role: "CEO"
    },
    {
      team: "ONEGAMES",
      image: "/os-cabra/fabinho.png",
      member: "FABINHO",
      role: "CEO"
    },
    {
      team: "BEDROCK",
      image: "/os-cabra/ueslei.png",
      member: "UESLEI PAIM",
      role: "CEO"
    },
    {
      team: null,
      image: "/os-cabra/filipotopo.png",
      member: "Filipotopo",
      role: "CRIADOR DE JOGOS"
    },
    {
      team: "Gabbs Basement",
      image: "/os-cabra/gabb.jpg",
      member: "Gabb",
      role: "CEO"
    }
  ];

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
          <source src="https://cdn.thegameawards.com/frontend/video/rewind-bg-banner_2024.webm" type="video/webm" />
          <source src="https://cdn.thegameawards.com/frontend/video/rewind-bg-banner_2024.mp4" type="video/mp4" />
          <p className="flex items-center justify-center text-xl text-white max-w-1/2">
            Seu navegador não suporta essa tag de vídeo.
          </p>
        </video>

        <div className="relative z-10 min-h-[700px] w-full">
          <div className="z-10 p-10 lg:px-[20vh] py-[40vh]">
            <h1 className="-mt-10 font-extrabold text-5xl lg:text-7xl text-yellow-200">SOBRE</h1>
            <h2 className="mt-2 max-w-[700px] text-2xl font-bold text-slate-300">O PPDC Awards reconhece e defende a excelência criativa e técnica na indústria global de videogames.</h2>
            <p className="mt-5 text-xs text-white max-w-[700px]">
              Reunimos um grupo diversificado de desenvolvedores de jogos, jogadores e nomes notáveis da cultura popular para celebrar e promover a posição dos jogos como a forma de entretenimento mais envolvente, desafiadora e inspiradora.

              Nós nos esforçamos para reconhecer aqueles que melhoram o bem-estar da comunidade e elevam as vozes que representam o futuro do meio.
            </p>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="relative z-10 p-10">
          <h1 className="text-yellow-200 font-extrabold text-5xl">KIT DE MÍDIA</h1>
          <div className="mt-20 grid grid-cols-3 gap-4">
            {mediaKits.map((kit, index) => (
              <div key={index} className="flex flex-col gap-2">
                <Link href={`/_next/image?url=${encodeURIComponent(kit.image)}&w=640&q=100`}>
                  <Image src={kit.image} alt={kit.title} width={500} height={500} quality={100} />
                </Link>
                <h2 className="mt-2 font-bold text-3xl text-yellow-200">{kit.title}</h2>
                <h2 className="-mt-2 font-bold text-lg text-white">{kit.about}</h2>
              </div>
            ))}
          </div>
        </div>
        <div className="top-0 left-0 z-[-10] h-screen w-full bg-[url('https://cdn.thegameawards.com/frontend/jpegs/mid-section-bg_24.jpg')] bg-center bg-cover bg-no-repeat pointer-events-none fixed">
          <div className="absolute inset-0 bg-black opacity-70" />
        </div>
      </div>
      <div className="min-h-[700px] bg-[#6588ba] flex flex-col lg:flex-row justify-between lg:p-10">
        <div className="flex justify-center items-center p-10 lg:w-[550px] lg:h-[550px] clip-path-diamond relative">
          <Image src="/os-cabra/erick-2.png" alt="Erick" width={1000} height={1000} quality={100} />
        </div>
        <div className="mr-auto p-10 lg:p-20">
          <h3 className="font-bold text-3xl text-gray-900">CRIADOR</h3>
          <h1 className="font-extrabold text-5xl text-white">ERICK</h1>
          <h1 className="font-semibold text-5xl text-white">LUIZ VB</h1>
          <p className="mt-5 text-lg uppercase font-extrabold text-gray-900 max-w-[700px]">
            O PPDC Awards foi fundado em 2022 pelo empresário de mídia Erick, que também apresenta e produz o programa.
          </p>
          <p className="mt-5 text-lg text-gray-900 max-w-[700px]">
            Nos últimos anos, Erick atuou como criador de jogos, apresentador e produtor de programação de videogame em diversas plataformas, incluindo, único e honorado PowerPoint.

            Luiz é mais conhecido por seu trabalho com Erilab (equipe de jogos), bem como desenvolvimento de jogos, conhecida como &quot;Cão the Game&quot;. Luiz também produz atualmente o jogo &quot;Muito Muito Minimalista&quot;.
          </p>
        </div>
      </div>
      <div className="relative">
        <div className="relative z-10 p-10">
          <h1 className="text-yellow-200 font-extrabold text-5xl">CONSELHO CONSULTIVO</h1>
          <h3 className="mt-5 uppercase text-white font-bold text-2xl">O conselho consultivo ajuda a orientar e promover a missão do PPDC Awards.</h3>
          <p className="mt-5 font-semibold text-white max-w-[700px]">
            O Conselho não está envolvido na seleção dos indicados ou vencedores dos prêmios e toma conhecimento dos resultados da votação ao mesmo tempo que o público em geral. O conselho consultivo inclui:
          </p>
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
            {advisors.map((advisor, index) => (
              <div key={index} className="flex flex-col lg:flex-row min-h-[200px] w-auto group">
                <Image className="object-cover lg:object-fill h-[250px] lg:h-full w-full lg:w-[250px] transition-all duration-400 filter grayscale group-hover:grayscale-0" src={advisor.image} alt={advisor.member} width={1000} height={1000} quality={100} />
                <div className="p-5 border border-[#6588ba] w-full select-none transition-colors group-hover:bg-[#6588ba]">
                  {advisor.team && (
                    <h3 className="transition-colors group-hover:text-black text-gray-400 font-bold">
                      {advisor.team}
                      <div 
                        className="mt-2 w-auto h-[0.9px] transition-all duration-300 bg-gradient-to-r from-transparent via-white to-transparent group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-black group-hover:to-transparent"
                      />
                    </h3>
                  )}
                  <div className="mt-auto">
                    <h2 className="transition-colors group-hover:text-black text-white font-extrabold text-xl mt-3">{advisor.member}</h2>
                    {advisor.role && <h3 className="mt-2 transition-colors group-hover:text-black text-gray-500 font-bold">{advisor.role}</h3>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="top-0 left-0 z-[-10] h-screen w-full bg-[url('https://cdn.thegameawards.com/frontend/jpegs/mid-section-bg_24.jpg')] bg-center bg-cover bg-no-repeat pointer-events-none fixed">
          <div className="absolute inset-0 bg-black opacity-70" />
        </div>
      </div>
    </div>
	);
}