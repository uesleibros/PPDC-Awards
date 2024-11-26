export const metadata = {
	title: "Termos e Condições | PPDC Awards"
};

export default function TermosECondicoes() {
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
          <div className="z-10 p-5 lg:px-[20vh] py-[40vh]">
            <h1 className="-mt-10 font-extrabold text-5xl lg:text-7xl text-yellow-200">TERMOS &<br />CONDIÇÕES</h1>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="relative z-10 p-5 lg:p-10">
          <div className="mt-5 lg:p-10">
            <p className="font-semibold text-white">
            	Leia atentamente estes Termos e Condições (&quot;Termos&quot;) antes de usar o site oficial do PPDC Awards (o &quot;Serviço&quot;) operado pela equipe organizadora do evento (&quot;nós&quot;, &quot;nosso&quot;).<br /><br />

            	<strong>Aceitação dos Termos</strong> <br />
            	Ao acessar ou usar o Serviço, você concorda em cumprir estes Termos. Caso não concorde com algum dos termos apresentados, você não tem permissão para acessar o Serviço. <br /><br />

            	<strong>Propriedade Intelectual</strong> <br />
            	O Serviço, incluindo todo o conteúdo original, funcionalidades e design, permanece como propriedade exclusiva do PPDC Awards e seus licenciadores. O conteúdo é protegido por leis de direitos autorais e marcas comerciais locais e internacionais. O uso de nossa marca sem consentimento prévio é estritamente proibido. <br /><br />

            	<strong>Links para Sites de Terceiros</strong> <br />
            	O Serviço pode conter links para sites ou serviços de terceiros que não são de nossa propriedade ou controlados por nós. Não assumimos responsabilidade pelo conteúdo, políticas de privacidade ou práticas desses terceiros. Recomenda-se a leitura dos Termos de Uso e Políticas de Privacidade desses sites antes de utilizá-los. <br /><br />

            	<strong>Rescisão de Acesso</strong> <br />
            	Reservamo-nos o direito de suspender ou encerrar seu acesso ao Serviço a qualquer momento, sem aviso prévio, por qualquer motivo, incluindo violação destes Termos. <br /><br /> 

            	<strong>Limitação de Responsabilidade</strong> <br />
            	Em nenhuma circunstância seremos responsáveis por danos indiretos, incidentais, ou punitivos decorrentes do uso ou incapacidade de usar o Serviço.  <br /><br /> 

            	<strong>Alterações nos Termos</strong> <br />
            	Reservamo-nos o direito de alterar estes Termos a qualquer momento. Se mudanças significativas forem realizadas, notificaremos os usuários com pelo menos 30 dias de antecedência. O uso contínuo do Serviço após as alterações implicará na aceitação dos novos Termos.  
            </p>
          </div>
        </div>
        <div className="top-0 left-0 z-[-10] h-screen w-full bg-[url('https://cdn.thegameawards.com/frontend/jpegs/mid-section-bg_24.jpg')] bg-center bg-cover bg-no-repeat pointer-events-none fixed">
          <div className="absolute inset-0 bg-black opacity-70" />
        </div>
      </div>
    </div>
	);
}