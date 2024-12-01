import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";

export default async function Footer() {
	const currentYear = new Date().getFullYear();
	const headersList = await headers();
	const protocol = headersList.get("x-forwarded-proto");
	const host = headersList.get("host");

	const req = await fetch(`${protocol}://${host}/api/partners`);
	const body = await req.json();
	let partners = [];

	if (req.ok) {
	  partners = body.partners;
	}

	return (
		<footer className="min-h-[400px] bg-[#0a0e13] p-10 ">
			<div className="flex flex-col lg:flex-row justify-between">
				<div>
					<Link href="/">
						<Image src="/brand_logo.png" alt="PPDC Awards Brand Logo" width={350} height={350} quality={100} />
					</Link>
					<div className="-mt-2">
						<div className="flex items-center gap-10 flex-wrap lg:w-[600px]">
							<Link href="/sobre" className="font-bold w-[max-content] text-slate-300 transition-colors hover:text-white hover:underline">SOBRE</Link>
							<Link href="/faq" className="font-bold w-[max-content] text-slate-300 transition-colors hover:text-white hover:underline">FAQ</Link>
							<Link href="/classe-do-futuro" className="font-bold w-[max-content] text-slate-300 transition-colors hover:text-white hover:underline">CLASSE DO FUTURO</Link>
							<Link href="/termos-e-condicoes" className="font-bold w-[max-content] text-slate-300 transition-colors hover:text-white hover:underline">TERMOS</Link>
						</div>
					</div>
				</div>
				<div className="mr-auto mt-20 lg:mt-0 lg:p-20">
					<h2 className="font-extrabold text-3xl text-yellow-200">PPDC AWARDS</h2>
					<p className="text-white font-semibold mt-5">
						O PPDC Awards reconhece os talentos que moldam o futuro da indústria de jogos, entretenimento e tecnologia. Com uma missão de inspirar e promover a inovação, celebramos criadores, desenvolvedores e visionários que estão redefinindo a maneira como interagimos com o mundo digital.

						Explore nossas iniciativas, conheça os indicados e faça parte desta jornada incrível!
					</p>
					{partners.length > 0 && <h3 className="mt-5 font-extrabold text-white">NOSSOS PATROCINADORES</h3>}
					<div className="mt-5 flex items-center gap-4 flex-wrap">
						{partners.map((partner, index) => (
							<div key={index}>
								<Image className="object-contain" style={{ width: `${partner.size}px`, height: `${partner.size}px` }} src={partner.image} width={1000} height={1000} quality={100} alt={partner.partner} />
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="flex flex-col w-full items-center justify-center">
				<div 
          className="my-10 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"
        />
				<p className="font-semibold text-white text-center">© {currentYear}, PPDC Awards</p>
			</div>
		</footer>
	);
}