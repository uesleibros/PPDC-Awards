import Link from "next/link";
import SeeCategories from "@/components/ui/SeeCategories";

export default function VotingStatusBar({ votedCategories, classifiedGamesCount, selectedCategory }) {
	return (
		<div className="bg-slate-700 flex flex-col items-center justify-center w-full p-5 shrink-nav">
		  <div className="container flex flex-col gap-10 lg:gap-0 lg:flex-row items-center justify-between">
		    <div>
		      <Link className="uppercase flex items-center gap-2 font-bold text-white text-lg transition-colors hover:text-slate-300 hover:underline" href="/indicados">
		        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition group-hover:-translate-x-5"><path d="M15.8332 9.99996H4.1665M4.1665 9.99996L9.99984 15.8333M4.1665 9.99996L9.99984 4.16663" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
		        Sair da votação
		      </Link>
		    </div>
		    <div className="flex flex-col lg:flex-row gap-10 items-center">
		      {selectedCategory.prev ? ( 
		        <Link className="uppercase hover:underline transition-colors hover:text-slate-300 flex items-center gap-2 font-bold text-white text-lg" href={`/indicados/votar/${selectedCategory.prev.title.toLowerCase().replaceAll(' ', '-')}`}>
		          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition group-hover:-translate-x-5"><path d="M15.8332 9.99996H4.1665M4.1665 9.99996L9.99984 15.8333M4.1665 9.99996L9.99984 4.16663" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
		          Anterior
		        </Link>
		      ) : (
		        <p className="select-none flex items-center gap-2 uppercase font-bold text-white opacity-30 text-lg">
		          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition group-hover:-translate-x-5"><path d="M15.8332 9.99996H4.1665M4.1665 9.99996L9.99984 15.8333M4.1665 9.99996L9.99984 4.16663" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
		          Anterior
		        </p>
		      )}
		      <SeeCategories minimalist={true} />
		      {selectedCategory.next ? ( 
		        <Link className="uppercase hover:underline transition-colors hover:text-slate-300 flex items-center gap-2 font-bold text-white text-lg" href={`/indicados/votar/${selectedCategory.next.title.toLowerCase().replaceAll(' ', '-')}`}>
		          Próximo
		          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition group-hover:-translate-x-5"><path d="M3.3335 10H16.6668M16.6668 10L11.6668 5M16.6668 10L11.6668 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
		        </Link>
		      ) : (
		        <p className="select-none flex items-center gap-2 uppercase font-bold text-white opacity-30 text-lg">
		          Próximo
		          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition group-hover:-translate-x-5"><path d="M3.3335 10H16.6668M16.6668 10L11.6668 5M16.6668 10L11.6668 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
		        </p>
		      )}
		    </div>
		    <div className="flex items-center gap-4">
		      <h3 className="font-bold text-white text-sm">VOTOS LANÇADOS</h3>
		      <h1 className="font-extrabold text-[#a3b8d6] text-4xl">{votedCategories?.length || "0"}/{classifiedGamesCount?.count || "0"}</h1>
		    </div>
		  </div>
		</div>
	);
}