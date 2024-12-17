import { headers } from "next/headers";
import PromoteGamesPhase1 from "@/components/frontend/PromoteGamesPhase1";
import WaitingRoom from "@/components/WaitingRoom";

export const metadata = {
	title: "Classificar Jogo - Fase 1 | PPDC Awards"
};

export default async function ClassificarJogo() {
	const headersList = await headers();
  const protocol = headersList.get("x-forwarded-proto");
  const host = headersList.get("host");

	const reqstatus = await fetch(`${protocol}://${host}/api/programing/check-available`);
	const bodystatus = await reqstatus.json();
	let status = [];

	if (reqstatus.ok) {
	  status = bodystatus;
	}

	if (status.first_stage_status !== "rolando") {
		return (
			<WaitingRoom status={status.first_stage_status} phase="Fase 1" />
		);
	}

	return (
		<div className="min-h-screen max-w-7xl mx-auto">
			<div className="mt-10 p-5 lg:p-10">
				<div>
					<h1 className="uppercase text-6xl text-yellow-200 font-extrabold max-w-[700px]">VOTE NOS JOGOS</h1>
					<p className="mt-5 text-2xl text-white font-semibold max-w-[700px]">Escolha um ou mais jogos que na sua opinião deveriam disputar em uma categoria específica.</p>
				</div>
			</div>
			<div className="p-5 lg:p-10">
				<PromoteGamesPhase1 />
			</div>
			<div className="top-0 left-0 z-[-10] h-screen w-full bg-[url('https://cdn.thegameawards.com/frontend/jpegs/mid-section-bg_24.jpg')] bg-center bg-cover bg-no-repeat pointer-events-none fixed">
			  <div className="absolute inset-0 bg-black opacity-70" />
			</div>
		</div>
	);
}
