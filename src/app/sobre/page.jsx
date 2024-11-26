import Image from "next/image";
import { headers } from "next/headers";

export const metadata = {
	title: "Sobre | PPDC Awards"
};

export default async function Indicados() {
  const mediaKits = [
    {
      image: "/poster.png",
      title: "POSTER",
      about: "UTILIZADO NO METADATA DO SITE."
    }
  ]

  const headersList = await headers();
  const protocol = headersList.get("x-forwarded-proto");
  const host = headersList.get("host");

  const req = await fetch(`${protocol}://${host}/api/advisors`);
  const body = await req.json();
  let advisors = [];

  if (req.ok) {
    advisors = body.advisors;
  }

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
          <div className="z-10 p-5 lg:px-[20vh] py-[40vh]">
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
        <div className="relative z-10 p-5">
          <h1 className="text-yellow-200 font-extrabold text-5xl">KIT DE MÍDIA</h1>
          <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-4">
            {mediaKits.map((kit, index) => (
              <div key={index} className="flex flex-col gap-2">
                <a href={`/_next/image?url=${encodeURIComponent(kit.image)}&w=640&q=100`}>
                  <Image src={kit.image} alt={kit.title} width={500} height={500} quality={100} />
                </a>
                <h2 className="mt-2 font-bold text-2xl text-yellow-200">{kit.title}</h2>
                <h2 className="-mt-2 font-bold text-sm text-white">{kit.about}</h2>
              </div>
            ))}
          </div>
        </div>
        <div className="top-0 left-0 z-[-10] h-screen w-full bg-[url('https://cdn.thegameawards.com/frontend/jpegs/mid-section-bg_24.jpg')] bg-center bg-cover bg-no-repeat pointer-events-none fixed">
          <div className="absolute inset-0 bg-black opacity-70" />
        </div>
      </div>
      <div className="min-h-[700px] bg-gradient-to-r from-[#6588ba] to-[#305f91] flex flex-col lg:flex-row justify-between lg:p-5 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-[300px] h-[300px] bg-[#4d719e] blur-[150px] rounded-full absolute top-20 left-20" />
          <div className="w-[200px] h-[200px] bg-[#5e82ad] blur-[100px] rounded-full absolute bottom-20 right-20" />
          <div className="w-[150px] h-[150px] bg-[#507da2] blur-[100px] rounded-full absolute top-5 right-10" />
          <div className="w-[250px] h-[250px] bg-[#3e668d] blur-[120px] rounded-full absolute bottom-10 left-10" />

          <div className="w-[400px] h-[400px] border-[5px] border-[#90b4d4] rounded-full absolute top-1/3 left-1/3 mix-blend-overlay" />
          <div className="w-[150px] h-[150px] border-[3px] border-[#8da3c4] rounded-full absolute bottom-10 right-1/3 mix-blend-overlay" />
          <div className="w-[200px] h-[200px] border-[4px] border-[#7098bd] rounded-full absolute top-5 left-1/4 mix-blend-overlay" />
          <div className="w-[180px] h-[180px] border-[4px] border-[#779ebf] rounded-full absolute bottom-5 right-1/4 mix-blend-overlay" />

          <div className="absolute w-[2px] h-full bg-[#90b4d4] left-[10%] opacity-20" />
          <div className="absolute w-[2px] h-full bg-[#90b4d4] right-[10%] opacity-20" />
          <div className="absolute h-[2px] w-full bg-[#90b4d4] top-[10%] opacity-20" />
          <div className="absolute h-[2px] w-full bg-[#90b4d4] bottom-[10%] opacity-20" />
        </div>

        <Image className="p-5 lg:p-0 z-10" src="/criador.png" alt="Erick Luiz VB" width={600} height={600} quality={100} />

        <div className="z-10 mr-auto p-5 lg:p-20">
          <h3 className="font-bold text-3xl text-gray-900">CRIADOR</h3>
          <h1 className="font-extrabold text-5xl text-white">ERICK</h1>
          <h1 className="font-semibold text-5xl text-white">LUIZ VB</h1>
          <p className="mt-5 text-lg uppercase font-extrabold text-gray-900 max-w-[700px]">
            O PPDC Awards foi fundado em 2022 pelo empresário de mídia Erick, que também apresenta e produz o programa.
          </p>
          <p className="mt-5 text-lg text-gray-900 max-w-[700px]">
            Nos últimos anos, Erick atuou como criador de jogos, apresentador e produtor de programação de videogame em diversas plataformas, incluindo o único e honorado PowerPoint.
            Luiz é mais conhecido por seu trabalho com Erilab (equipe de jogos), bem como desenvolvimento de jogos, incluindo &quot;Cão the Game&quot;. Luiz também produz atualmente o jogo &quot;Muito Muito Minimalista&quot;.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="relative z-10 p-5 lg:p-10">
          <h1 id="conselho-consultivo" className="text-yellow-200 font-extrabold text-5xl">CONSELHO CONSULTIVO</h1>
          <h3 className="mt-5 uppercase text-white font-bold text-2xl">O conselho consultivo ajuda a orientar e promover a missão do PPDC Awards.</h3>
          <p className="mt-5 font-semibold text-white max-w-[700px]">
            O Conselho não está envolvido na seleção dos indicados ou vencedores dos prêmios e toma conhecimento dos resultados da votação ao mesmo tempo que o público em geral. O conselho consultivo inclui:
          </p>
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
            {advisors.map((advisor, index) => (
              <div key={index} className="flex flex-col lg:flex-row min-h-[200px] w-auto group">
                <Image className="object-cover lg:object-fill h-[250px] lg:h-full w-full lg:w-[250px] transition-all duration-400 filter grayscale group-hover:grayscale-0" src={advisor.image} alt={advisor.member} width={1000} height={1000} quality={100} />
                <div className="p-5 lg:p-10 border border-[#6588ba] w-full select-none transition-colors group-hover:bg-[#6588ba]">
                  {advisor.team && (
                    <h3 className="uppercase transition-colors group-hover:text-black text-gray-400 font-bold">
                      {advisor.team}
                      <div 
                        className="mt-2 w-auto h-[0.9px] transition-all duration-300 bg-gradient-to-r from-transparent via-white to-transparent group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-black group-hover:to-transparent"
                      />
                    </h3>
                  )}
                  <div className="mt-auto">
                    <h2 className="uppercase transition-colors group-hover:text-black text-white font-extrabold text-xl mt-3">{advisor.member}</h2>
                    {advisor.role && <h3 className="uppercase mt-2 transition-colors group-hover:text-black text-gray-500 font-bold">{advisor.role}</h3>}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {advisors.length === 0 && <p className="mt-10 font-extrabold text-xl">SEM CONSELHEIROS NO MOMENTO.</p>}
        </div>
        <div className="top-0 left-0 z-[-10] h-screen w-full bg-[url('https://cdn.thegameawards.com/frontend/jpegs/mid-section-bg_24.jpg')] bg-center bg-cover bg-no-repeat pointer-events-none fixed">
          <div className="absolute inset-0 bg-black opacity-70" />
        </div>
      </div>
      <div className="p-5 lg:p-20 min-h-[200px] bg-[#f2a366] flex gap-5 flex-col lg:flex-row justify-between">
        <div>
          <h1 className="font-extrabold text-6xl text-gray-900">ENTRE EM CONTATO</h1>
          <h3 className="uppercase mt-5 max-w-[700px] font-bold text-xl text-gray-900">Se você tiver alguma dúvida ou solicitação, entre em contato pelo discord.</h3>
        </div>
        <div>
          <Image src="/ajudantico/boqueaberto.png" width={200} height={200} quality={100} alt="Ajudantico Boqueaberto" />
        </div>
      </div>
    </div>
	);
}