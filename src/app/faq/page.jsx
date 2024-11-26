import Image from "next/image";

export const metadata = {
	title: "FAQ | PPDC Awards"
};

export default function FAQ() {
	const eventFaqs = [
	  {
	    title: "QUANDO COMEÇA O PPDC AWARDS?",
	    description: "O PPDC Awards será transmitido ao vivo em algum dia entre dezembro e janeiro."
	  },
	  {
	    title: "COMO POSSO ASSISTIR A LIVE?",
	    description: "No dia, será transmitido em uma das chamadas de voz do servidor PowerPoint Discord. Certifique-se de ler o anúncio no dia para se atentar aos detalhes."
	  },
	  {
	    title: "COMO VOTAR NOS CANDIDATOS?",
	    description: "Os votos serão realizados por meio de uma pesquisa online que será compartilhada com todos os participantes do evento. Fique atento aos detalhes que serão divulgados antes da cerimônia."
	  },
	  {
	    title: "QUAIS SÃO OS CRITÉRIOS DE AVALIAÇÃO PARA OS JOGOS?",
	    description: "Os jogos serão avaliados com base em inovação, jogabilidade, design gráfico, impacto na comunidade e etc. Além disso, os jogos precisam ser lançados nos últimos três anos para serem elegíveis."
	  },
	  {
	    title: "COMO OS JOGOS SÃO PUBLICADOS?",
	    description: "Utilizamos o Banco de Dados do Crate da PPTGames como fornecedora dos jogos, não há a necessidade de publicar nada, tudo estará no site quando o momento chegar."
	  },
	  {
	    title: "O PPDC AWARDS PERMITE JOGOS EM DESENVOLVIMENTO?",
	    description: "Sim, jogos em fase de desenvolvimento podem ser votados, contudo, limitado apenas a categoria 'Mais Aguardado', ao menos que lance uma versão jogável."
	  },
	  {
	    title: "QUAL A DURAÇÃO DO EVENTO DE PREMIAÇÃO?",
	    description: "O evento de premiação terá uma duração aproximada de 2 horas, com apresentação dos vencedores, depoimentos e algumas surpresas para os participantes."
	  },
	  {
	    title: "QUAL A FAIXA ETÁRIA DOS JOGOS ACEITOS?",
	    description: "Não há uma faixa etária, todos os jogos podem concorrer sem problemas."
	  },
	  {
	    title: "POSSO ALTERAR MEU JOGO APÓS O INÍCIO DO EVENTO?",
	    description: "Não, após iniciar o evento nós fazemos uma colheita de todos os jogos existentes e salvamos temporariamente como um cache, o que torna qualquer atualização ou publicação de jogos inúteis já que não serão atualizados."
	  }
	];

	const awardFaqs = [
	  {
			"title": "COMO FUNCIONAM AS FASES?",
			"description": "São no total duas fases, ambas com métodos de avaliação diferente. A primeira fase, é a famosa classificação, você escolhe os jogos que devem concorrer em uma determinada categoria, cada jogo tendo um máximo de três votos para cada, passando disso ele já é classificado para concorrer na categoria mais votada. Já a segunda e última fase, você vai votar para o jogo que merece ganhar aquela categoria, tendo limite de um voto por jogo por categoria. O jogo mais votado é o vencedor."
		},
	  {
	    "title": "COMO OS GANHADORES SÃO SELECIONADOS?",
	    "description": "Os vencedores do PPDC Awards são escolhidos 100% por voto dos fãs. Nenhum júri ou conselho consultivo pode alterar os resultados."
	  },
	  {
	    "title": "POSSO VOTAR EM JOGOS QUE NÃO ESTÃO NA MINHA CATEGORIA PREFERIDA?",
	    "description": "Sim, você pode votar em qualquer jogo, independentemente da categoria em que ele se enquadra. A votação é aberta e os fãs podem apoiar seus jogos favoritos em qualquer categoria que escolherem."
	  },
	  {
	    "title": "QUANDO A VOTAÇÃO ESTÁ ABERTA PARA O PÚBLICO?",
	    "description": "A votação pública estará aberta por um período determinado, normalmente semanas antes da cerimônia. As datas exatas serão anunciadas no site oficial do PPDC Awards."
	  }
	];

	return (
		<div className="min-h-screen w-full">
      <div className="relative">
      	<div
      	  className="absolute z-0 inset-0 w-full h-full bg-cover bg-center"
      	  style={{
      	    backgroundImage: "url('https://cdn.thegameawards.com/frontend/jpegs/banner-poster.webp')",
      	  }}
      	/>
        <div className="relative z-10 min-h-[700px] w-full">
          <div className="z-10 p-10 lg:px-[20vh] py-[40vh]">
            <h1 className="-mt-10 font-extrabold text-5xl lg:text-7xl text-yellow-200">FAQ &<br />REGRAS</h1>
            <h2 className="mt-2 max-w-[700px] text-lg font-bold text-slate-300">ESTA FAQ FOI PROJETADA PARA RESPONDER MUITAS PERGUNTAS COMUNS SOBRE OS PRÊMIOS DO JOGO, AS REGRAS E O PROCESSO DE VOTAÇÃO.</h2>
            <p className="mt-5 text-xs text-white max-w-[700px]">
              Esta seção visa esclarecer as principais dúvidas sobre os critérios de premiação, o processo de votação e as regras do evento. Nossa missão é garantir que os prêmios sejam dados de maneira justa, reconhecendo os melhores jogos e desenvolvedores da comunidade, com base no mérito e impacto no setor de games.
            </p>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="relative z-10 p-10">
          <h1 className="text-yellow-200 font-extrabold text-5xl">O EVENTO</h1>
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
          	{eventFaqs.map((faq, index) => (
          		<div key={index} className="p-4 border border-[#6588ba] rounded-lg">
          			<h2 className="text-[#6588ba] text-2xl max-w-[700px] font-extrabold">{faq.title}</h2>
          			<p className="font-semibold max-w-[700px] text-white mt-2">
          				{faq.description}
          			</p>
          		</div>
          	))}
          </div>
        </div>
        <div className="relative z-10 p-10">
          <h1 className="text-yellow-200 font-extrabold text-5xl break-words">PROCEDIMENTO DO EVENTO</h1>
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
          	{awardFaqs.map((faq, index) => (
          		<div key={index} className="p-4 border border-[#6588ba] rounded-lg">
          			<h2 className="text-[#6588ba] text-2xl max-w-[700px] font-extrabold">{faq.title}</h2>
          			<p className="font-semibold max-w-[700px] text-white mt-2">
          				{faq.description}
          			</p>
          		</div>
          	))}
          </div>
        </div>
        <div className="top-0 left-0 z-[-10] h-screen w-full bg-[url('https://cdn.thegameawards.com/frontend/jpegs/mid-section-bg_24.jpg')] bg-center bg-cover bg-no-repeat pointer-events-none fixed">
          <div className="absolute inset-0 bg-black opacity-70" />
        </div>
      </div>
      <div className="p-10 lg:p-20 min-h-[200px] bg-[#f2a366] flex gap-10 flex-col lg:flex-row justify-between">
        <div>
          <h1 className="font-extrabold text-6xl text-gray-900 break-words">NÃO ENCONTROU A RESPOSTA PARA A SUA PERGUNTA?</h1>
          <h3 className="uppercase mt-5 max-w-[700px] font-bold text-xl text-gray-900">Pergunte para um dos conselheiros consultativos, nós nos responsabilizamos por qualquer dúvida sua, é nosso trabalho ajudar.</h3>
        </div>
        <div>
          <Image src="/ajudantico/meh.png" width={250} height={250} quality={100} alt="Ajudantico Meh" />
        </div>
      </div>
    </div>
	);
}
