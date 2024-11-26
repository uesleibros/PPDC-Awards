"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { useState, useEffect } from "react";

export default function Categories({ minimalist }) {
	const [openedCategories, setOpenedCategories] = useState(false);
	const [categoriesList, setCategoriesList] = useState([]);
	const [searchCategory, setSearchCategory] = useState('');
	const currentYear = new Date().getFullYear();

	useEffect(() => {
		async function fetchCategories() {
			const req = await fetch("/api/categories");
			const body = await req.json();

			if (req.ok) {
				setCategoriesList(body.categories);
			}
		}

		fetchCategories();
	}, []);

	const categoriasFiltradas = categoriesList.filter((category) => category.title.toLowerCase().includes(searchCategory.toLowerCase().trim()));

	return (
		<div>
			<div>
				{!minimalist 
					?
					<Button onClick={() => setOpenedCategories(true)} variant={true} content="VER TODAS AS CATEGORIAS" />
					:
					<h1 className="cursor-pointer transition-colors hover:text-slate-300 text-lg font-extrabold text-[#a3b8d6]" onClick={() => setOpenedCategories(true)}>VER TODAS AS CATEGORIAS</h1>
				}
			</div>
			{openedCategories && (
				<div className="fixed inset-0 z-50 top-0 left-0 w-full h-full p-10 lg:px-[22vh] overflow-y-auto">
					<div>
						<div className="mb-20 flex justify-end">
							<h2 onClick={() => setOpenedCategories(false)} className="text-xl w-[max-content] font-bold text-right text-white cursor-pointer">FECHAR</h2>
						</div>
						<div>
							<h1 className="text-5xl font-extrabold text-yellow-200">
								<span className="text-white">{currentYear}</span> INDICADOS
							</h1>
							<input value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} className="outline-none py-3 px-4 text-xs border border-yellow-200 text-white bg-slate-900 w-full rounded-sm mt-5 placeholder-white" type="text" placeholder="Procure por uma categoria" />

							<div className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-4">
								{categoriasFiltradas.map((category, index) => (
									<Link key={index} href={`/indicados/${category.title.toLowerCase().replaceAll(' ', '-')}`}>
										<div className="h-full lg:aspect-square cursor-pointer flex flex-col lg:justify-center border border-[#6588ba] p-4 lg:py-14 lg:px-17 lg:text-center lg:min-h-[100px] min-w-[100px] bg-[#0a0e13b3] transition-colors hover:bg-[#1e2938] hover:border-[#1e2938]">
											<h3 className="uppercase text-white font-semibold">{category.title}</h3>
										</div>
									</Link>
								))}
							</div>
						</div>
						<div className="top-0 left-0 z-[-10] h-screen w-full bg-[url('https://cdn.thegameawards.com/frontend/jpegs/mid-section-bg_24.jpg')] bg-center bg-cover bg-no-repeat pointer-events-none fixed">
		          <div className="absolute inset-0 bg-black opacity-70" />
		        </div>
	        </div>
				</div>
			)}
		</div>
	);
}