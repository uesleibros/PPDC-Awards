import Button from "@/components/ui/Button";

export default function NotFound() {
	return (
		<div className="relative flex flex-col justify-center min-h-[600px]">
			<div className="h-full w-full text-center">
				<h1 className="text-9xl font-extrabold text-yellow-200">404</h1>
				<p className="mt-5 font-bold text-white text-2xl">VOCÊ CHEGOU NO LIMITE.</p>
				<Button className="mt-5" variant={true} url="/" content="Ir para o início" />
			</div>
			<div className="top-0 left-0 z-[-10] h-screen w-full bg-[url('https://cdn.thegameawards.com/frontend/jpegs/mid-section-bg_24.jpg')] bg-center bg-cover bg-no-repeat pointer-events-none fixed">
          <div className="absolute inset-0 bg-black opacity-70" />
        </div>
		</div>
	);
}