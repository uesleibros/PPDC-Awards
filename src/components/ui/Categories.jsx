"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { useState, useEffect } from "react";

export default function Categories() {
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
				<Button onClick={() => setOpenedCategories(true)} variant={true} content="VER TODAS AS CATEGORIAS" />
			</div>
			{openedCategories && (
				<div className="fixed z-10 top-0 left-0 w-full h-full p-10 lg:px-[22vh] overflow-y-auto">
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
									<Link key={index} href={`/indicados/${category.title.toLowerCase().replace(' ', '-')}`}>
										<div className="h-full aspect-square cursor-pointer flex flex-col justify-center border border-[#6588ba] py-14 px-17 text-center min-h-[100px] min-w-[100px] bg-[#0a0e13b3] transition-colors hover:bg-[#1e2938] hover:border-[#1e2938]">
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