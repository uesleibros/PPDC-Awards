import { headers } from "next/headers";
import Image from "next/image";

export const metadata = {
	title: "Classe do Futuro | PPDC Awards"
};

export default async function ClasseDoFuturo() {
  const headersList = await headers();
  const protocol = headersList.get("x-forwarded-proto");
  const host = headersList.get("host");

  const req = await fetch(`${protocol}://${host}/api/future-class`);
  const body = await req.json();
  let futureClass = [];

  if (req.ok) {
    futureClass = body["future-class"];
  }

	return (
		<div className="min-h-screen w-full">
      <div className="relative">
      	<div
      	  className="absolute z-0 inset-0 w-full h-full bg-cover bg-center"
      	  style={{
      	    backgroundImage: "url('https://cdn.thegameawards.com/frontend/bgs/feature-class.webp')",
      	  }}
      	/>
        <div className="relative z-10 min-h-[700px] w-full">
          <div className="z-10 p-5 lg:px-[20vh] py-[40vh]">
            <h1 className="-mt-10 font-extrabold text-5xl lg:text-7xl text-[#f2a366]">
            	CONHEÇA NOSSA<br />
            	<p className="text-gray-900">CLASSE DO FUTURO</p>
            </h1>
            <h2 className="uppercase mt-2 max-w-[700px] text-lg font-bold text-gray-900">Indivíduos inspiradores que representam o futuro brilhante, ousado e inclusivo dos videogames.</h2>
            <p className="mt-5 text-xs text-gray-700 max-w-[700px]">
              Esta seção é dedicada a homenagear todos os membros de nossa comunidade que contribuíram com sua criatividade e inovação para desenvolver jogos e sistemas no PowerPoint. Além disso, celebramos aqueles que, de alguma forma, continuam a explorar o potencial dessa ferramenta, inspirando novos projetos e mantendo vivo o espírito de criação no PowerPoint. Ou não, vai saber.
            </p>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="relative z-10 p-5 lg:p-10">
          <h1 className="text-yellow-200 font-extrabold text-5xl">O NOSSO FUTURO</h1>
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-4">
            {futureClass.map((individual, index) => (
            	<div key={index}>
            		<Image className="object-cover lg:object-fill h-[300px] w-full lg:h-[260px] lg:w-[260px]" src={individual.image} alt={individual.member} width={300} height={300} quality={100} />
            		<div className="mt-auto p-5">
            			<h3 className="uppercase font-extrabold text-xl text-white max-w-[100px]">{individual.member}</h3>
            			<h3 className="uppercase mt-3 font-semibold text-lg text-gray-400">{individual.pronoun}</h3>
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