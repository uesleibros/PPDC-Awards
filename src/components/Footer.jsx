import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="min-h-[400px] bg-gray-900 p-10 flex flex-col lg:flex-row justify-between">
			<div>
				<Link href="/">
					<Image src="/brand_logo.png" alt="PPDC Awards Brand Logo" width={350} height={350} quality={100} />
				</Link>
				<div className="-mt-2">
					<div className="flex items-center gap-10 flex-wrap lg:w-[600px] mb-10">
						<Link href="/sobre" className="font-bold w-[max-content] text-slate-300 transition-colors hover:text-white hover:underline">SOBRE</Link>
						<Link href="/faq" className="font-bold w-[max-content] text-slate-300 transition-colors hover:text-white hover:underline">FAQ</Link>
						<Link href="/classe-do-futuro" className="font-bold w-[max-content] text-slate-300 transition-colors hover:text-white hover:underline">CLASSE DO FUTURO</Link>
						<Link href="/termos-e-condicoes" className="font-bold w-[max-content] text-slate-300 transition-colors hover:text-white hover:underline">TERMOS</Link>
					</div>
					<p className="font-semibold text-white">© {currentYear}, PPDC Awards</p>
				</div>
			</div>
			<div className="mr-auto mt-20 lg:mt-0 lg:p-20">
				<h2 className="font-extrabold text-3xl text-yellow-200">PPDC AWARDS</h2>
				<p className="text-white font-semibold mt-5">
					O PPDC Awards reconhece os talentos que moldam o futuro da indústria de jogos, entretenimento e tecnologia. Com uma missão de inspirar e promover a inovação, celebramos criadores, desenvolvedores e visionários que estão redefinindo a maneira como interagimos com o mundo digital.

					Explore nossas iniciativas, conheça os indicados e faça parte desta jornada incrível!
				</p>
			</div>
		</footer>
	);
}