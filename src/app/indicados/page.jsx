import Button from "@/components/ui/Button";
import SeeCategories from "@/components/ui/SeeCategories";
import { headers } from "next/headers";

export const metadata = {
  title: "Indicados | PPDC Awards"
};

export default async function Indicados() {
  const headersList = await headers();
  const protocol = headersList.get("x-forwarded-proto");
  const host = headersList.get("host");

  const req = await fetch(`${protocol}://${host}/api/programing/check-available`);
  const body = await req.json();
  let status = [];

  if (req.ok) {
    status = body;
  }

  const getContent = () => {
    if (status.event_ended) {
      return (
        <div className="text-center text-white">
          <h1 className="font-extrabold text-5xl lg:text-7xl text-red-500">EVENTO ENCERRADO</h1>
          <h2 className="mt-2 max-w-[700px] text-center mx-auto text-2xl font-bold text-slate-300">Obrigado por participar! Confira os vencedores.</h2>
          <div className="mt-10 flex justify-center items-center gap-4 flex-wrap">
            <Button className="w-full" url="/indicados/vencedores/o-melhor-jogo" content="VENCEDORES" />
          </div>
        </div>
      );
    }

    if (status.last_stage_status === "rolando") {
      return (
        <div className="text-center text-white">
          <h1 className="font-extrabold text-5xl lg:text-7xl text-yellow-200">FASE 2 EM ANDAMENTO</h1>
          <h2 className="mt-2 max-w-[700px] mx-auto text-center text-2xl font-bold text-slate-300">Vote agora na segunda fase e ajude a decidir os vencedores.</h2>
          <div className="mt-10 flex justify-center items-center gap-4 flex-wrap">
            <SeeCategories />
            <Button className="w-full" url="/indicados/votar/o-melhor-jogo" content="COMECE A VOTAR" />
          </div>
        </div>
      );
    }

    if (status.first_stage_status === "rolando") {
      return (
        <div className="text-center text-white">
          <h1 className="font-extrabold text-5xl lg:text-7xl text-yellow-200">FASE 1 EM ANDAMENTO</h1>
          <h2 className="mt-2 max-w-[700px] mx-auto text-center text-2xl font-bold text-slate-300">Vote agora nos seus jogos favoritos para classificá-los na categoria que você acredita ser ideal para a Fase 2.</h2>
          <div className="mt-10 flex justify-center items-center gap-4 flex-wrap">
            <Button className="w-full" url="/indicados/classificar" content="COMECE A VOTAR" />
          </div>
        </div>
      );
    }

    return (
      <div className="text-center text-white">
        <h1 className="font-extrabold text-5xl lg:text-7xl text-gray-500">EVENTO NÃO INICIADO</h1>
        <h2 className="mt-2 max-w-[700px] text-center mx-auto text-2xl font-bold text-slate-300">Aguarde o início do evento para participar da votação.</h2>
        <div className="mt-10 flex justify-center items-center gap-4 flex-wrap">
          <Button className="w-full" url="/faq" content="VEJA O FAQS" />
        </div>
      </div>
    );
  };

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
          <div className="z-10 p-5 lg:px-[20vh] py-[40vh]">
            {getContent()}
          </div>
        </div>
      </div>
    </div>
  );
}