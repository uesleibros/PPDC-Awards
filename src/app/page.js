import Image from "next/image";
import Button from "@/components/ui/Button";
import { checkEventStatus } from "@/domain/usecases/check-status-programing-usecase";

export default async function Home() {
  const funFacts = [
    "Sabia que o PPDC Awards é tão épico que até o Crate Awards fica com ciúmes?",
    "Erickssen criou mais premiações do que o PowerPoint pode aguentar!",
    "Fabinho está convencido de que o PPDC Awards é o único prêmio que realmente importa!",
    "Luscao só joga games no PPDC Awards, onde os jogos são feitos no PowerPoint!",
    "Ueslei acha que se o PPDC Awards fosse um jogo, seria o jogo do ano, com certeza!",
    "Filipe Garcia não perdeu uma edição do PPDC Awards, só não foi premiado porque o prêmio é segredo até o fim!",
    "Gabb acha que o PPDC Awards tem mais energia do que qualquer game no Game World!",
    "Um gamer qualquer perguntou se o PPDC Awards também pode ser jogado no PowerPoint. A resposta: sim!",
    "Erick Luiz VB provavelmente tem mais slides no PowerPoint do que qualquer um no mundo!",
    "No PPDC Awards, até o Crate Awards tenta se adaptar, mas não consegue competir com tanto brilho!",
    "No PPDC Awards, a frase 'melhor que o Crate Awards' virou lema!",
    "O Crate Awards ainda tá tentando descobrir como o PPDC Awards consegue ter tanto estilo com PowerPoint.",
    "Game World? Nós do PPDC Awards preferimos um mundo onde os prêmios brilhem de verdade.",
    "Sabia que o PPverse tentou apostar contra o PPDC Awards? Spoiler: eles perderam.",
    "No PPDC Awards, todo slide vale mais que uma aposta no PPverse.",
    "Crate Awards: onde o brilho some quando o PPDC Awards aparece.",
    "O Game Awards pode ter produção de Hollywood, mas o PPDC Awards tem o coração do PowerPoint.",
    "O PPverse tentou prever os vencedores do PPDC Awards, mas nossos slides os deixaram confusos.",
    "O Crate Awards anunciou sua programação... e todo mundo achou que era só o pré-show do PPDC Awards.",
    "Sabia que no PPDC Awards até o Crate Awards ganha... mas só um PowerPoint com dicas de como melhorar?",
    "O PPDC Awards tem tanta animação que até o Game World ficou com inveja.",
    "Game Awards gasta milhões, PPDC Awards usa PowerPoint e ganha o dobro de atenção!",
    "PPverse? Só apostamos em algo seguro: o PPDC Awards ser o melhor, sempre.",
    "O Crate Awards tem um slide legal? PPDC Awards tem uma apresentação inteira épica.",
    "PPverse tentou competir com as categorias do PPDC Awards, mas a gente não trabalha com apostas incertas.",
    "No PPDC Awards, até os troféus têm animações melhores que os comerciais do Game World.",
    "O Game Awards tem fãs? O PPDC Awards tem uma legião de criadores PowerPoint!",
    "PPverse fez uma aposta sobre quem ganharia mais hype: eles perderam, óbvio.",
    "Crate Awards tentou copiar o estilo do PPDC Awards. Resultado? Ficou parecendo um slide sem tema.",
    "No PPDC Awards, até os haters acabam virando fãs de PowerPoint!",
    "O Erickssen disse que o Game Awards deveria aprender uma coisa ou duas sobre apresentações no PPDC Awards.",
    "PPverse apostou que o Crate Awards ganharia mais visualizações... piada pronta, né?",
    "No PPDC Awards, até os jogos competem para ver quem tem o slide mais bonito.",
    "PPDC Awards: onde todo mundo é um vencedor... menos o Crate Awards, claro.",
    "Filipe Garcia ama tanto o PPDC Awards que quer criar uma categoria para 'Melhor Transição de Slide'.",
    "Game World tem gráficos de última geração? O PPDC Awards tem slides de última geração.",
    "No PPDC Awards, o verdadeiro troféu é a honra de ser parte de algo tão lendário.",
    "PPverse tenta prever o futuro, mas o PPDC Awards cria o futuro!",
    "Sabia que o Crate Awards usa PowerPoint? Só que ninguém percebe porque faltam animações!",
    "Game Awards é um show de luzes, mas o PPDC Awards é um show de ideias.",
    "No PPDC Awards, todo mundo sabe que o brilho dos slides supera qualquer competição.",
    "O Fabinho fez questão de dizer que o PPDC Awards tem mais animação que qualquer outro evento.",
    "Gabb tentou explicar o PPverse, mas todo mundo só queria saber do PPDC Awards mesmo.",
    "O Crate Awards tem uma coisa boa: faz o PPDC Awards parecer ainda melhor!",
    "PPverse quis patrocinar o PPDC Awards. Resposta: 'A gente não aceita apostas incertas.'",
    "Se o Game World é um filme, o PPDC Awards é a história que todos querem assistir.",
    "Erickssen disse que o segredo do PPDC Awards é simples: paixão e PowerPoint.",
    "PPverse tentou fazer um quiz sobre o PPDC Awards, mas até eles erraram as respostas.",
    "Se você acha que o Game Awards é grande, espere até ver a próxima edição do PPDC Awards.",
    "O PPDC Awards é tão inovador que até o Crate Awards fica parecendo um esboço.",
    "Game World diz que faz história. O PPDC Awards vive no futuro!",
    "PPverse quis criar uma categoria de apostas para o PPDC Awards, mas não sabia nem por onde começar.",
    "No PPDC Awards, até os jogos feitos no PowerPoint parecem AAA.",
    "O PPDC Awards tem mais camadas que uma apresentação de slides avançada — e cada uma é um espetáculo!",
    "Enquanto o Crate Awards usa efeitos de transição básicos, o PPDC Awards faz mágica com PowerPoint.",
    "O Game World tem gráficos incríveis, mas nada que se compare ao carisma do PPDC Awards.",
    "Erickssen disse que o PPDC Awards é onde criatividade e animação se encontram.",
    "PPverse tentou patrocinar uma categoria, mas não conseguimos decidir entre 'Aposta Mais Perdida' ou 'Erro de Cálculo do Ano'.",
    "No PPDC Awards, a competição é saudável... a humilhação dos rivais, nem tanto!",
    "O Crate Awards tem categorias? O PPDC Awards tem classes!",
    "Game Awards investe em efeitos especiais. PPDC Awards investe em criatividade ilimitada.",
    "Sabia que o PPverse tentou prever o resultado do PPDC Awards, mas os dados ficaram tão confusos que desistiram?",
    "Se você achava que PowerPoint era para reuniões chatas, o PPDC Awards está aqui para mudar sua vida.",
    "O PPDC Awards é como um show de fogos de artifício, enquanto o Crate Awards é apenas uma vela acesa.",
    "No PPDC Awards, até as animações aprendem a evoluir sozinhas.",
    "Gabb disse que o PPverse precisa aprender uma coisa ou duas sobre como prender atenção — aula grátis com o PPDC Awards.",
    "Game World diz que tem o público. PPDC Awards tem a plateia inteira na palma da mão!",
    "Crate Awards anunciou um novo formato, mas a única coisa que todo mundo quer ver é o PPDC Awards.",
    "Se o Game Awards é o palco, o PPDC Awards é a inspiração por trás do show.",
    "Erickssen disse que o PPDC Awards poderia ganhar um prêmio... se não fosse ele mesmo entregando os troféus!",
    "Luscao achou que o Crate Awards fosse um tutorial básico de PowerPoint.",
    "O PPDC Awards faz tanto sucesso que até o Fabinho tentou criar um evento concorrente... no Paint.",
    "Ueslei tentou apostar no PPverse sobre o vencedor do PPDC Awards, mas foi banido por saber demais.",
    "Se o Crate Awards é um slide estático, o PPDC Awards é uma apresentação viva e pulsante.",
    "O PPDC Awards tem tanta energia que dá para iluminar todos os palcos do Game World.",
    "No PPDC Awards, cada transição é um espetáculo, e cada rival, uma piada interna.",
    "Erickssen afirmou que o Game World deveria se inspirar no PPDC Awards para aprender como realmente engajar.",
    "O PPverse anunciou que é impossível calcular a grandiosidade do PPDC Awards — estatísticas quebradas!",
    "Game Awards tem patrocínios milionários. PPDC Awards tem o coração de milhões.",
    "Crate Awards é como uma versão beta, enquanto o PPDC Awards é o lançamento oficial e definitivo.",
    "PPverse tentou prever a próxima categoria do PPDC Awards e acabou apostando que seria 'Melhor Rival Humilhado'.",
    "No PPDC Awards, até os rivais acabam virando fãs secretos.",
    "O Game Awards tem red carpet. O PPDC Awards tem uma passarela de slides épicos.",
    "Erickssen revelou que o segredo do sucesso do PPDC Awards é nunca levar a concorrência muito a sério.",
    "PPverse tentou criar um simulador de apostas do PPDC Awards, mas ele só funcionava se a aposta fosse 'PPDC sempre vence'.",
    "Fabinho disse que o PPDC Awards é tão grande que deveria ter uma categoria só para PowerPoint de outras galáxias.",
    "O Crate Awards pode ter público local, mas o PPDC Awards é universal!",
    "PPDC Awards é tão lendário que até o PowerPoint agradece por ser usado nele.",
    "Se você acha que Game Awards é icônico, é porque ainda não assistiu ao PPDC Awards com atenção.",
    "O Crate Awards é bom... mas o PPDC Awards é o melhor, sem comparações.",
    "PPverse poderia apostar contra o PPDC Awards, mas eles já sabem quem sempre sai ganhando.",
    "No PPDC Awards, a humildade é para os slides... a rivalidade, para os concorrentes.",
    "Até o Excel quis participar do PPDC Awards, mas percebeu que as tabelas não eram páreo para nossos gráficos animados.",
    "PPverse anunciou uma nova categoria, mas ninguém entendeu porque estavam todos assistindo ao PPDC Awards.",
    "Game World pode ter um público fiel, mas o PPDC Awards tem criadores apaixonados.",
    "O Crate Awards tentou fazer um upgrade, mas o PPDC Awards já estava na versão final perfeita.",
    "Erickssen revelou que até seus concorrentes assistem ao PPDC Awards para aprender algo novo.",
    "O PPDC Awards tem um lema: 'Criatividade é nossa superpotência.'",
    "PPverse apostou que o PPDC Awards era imparável, e acertaram — como sempre!",
    "O PPDC Awards tem tantas categorias incríveis que até o Game Awards se sentiu simplório.",
    "Crate Awards prometeu inovação... mas o PPDC Awards já inovou primeiro.",
    "Se o Game Awards é o Oscar dos games, o PPDC Awards é o Nobel da criatividade!"
  ];
  const randomFactIndex = Math.floor(Math.random() * funFacts.length);
  const randomFact = funFacts[randomFactIndex];
  const programming = await checkEventStatus();
  console.log(programming)

  return (
    <div className="min-h-screen w-full">
      <div className="relative">
        <div
          className="absolute z-0 inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://thegameawards.com/jpegs/home-banner-poster.jpg')",
          }}
        />
        <video playsInline autoPlay preload="auto" loop muted className="absolute inset-0 z-0 object-cover w-full h-full">
          <source src="https://cdn.thegameawards.com/frontend/video/tga-bg-video-2024.webm" type="video/webm" />
          <source src="https://cdn.thegameawards.com/frontend/video/tga-bg-video-2024.mp4" type="video/mp4" />
          <p className="flex items-center justify-center text-xl text-white max-w-1/2">
            Seu navegador não suporta essa tag de vídeo.
          </p>
        </video>

        <div className="relative z-10 min-h-[700px] w-full">
          <div className="z-10 p-5 lg:p-[20vh]">
            <Image src="/brand_logo.png" alt="PPDC Awards Brand Logo" width={500} height={500} quality={100} className="mb-5 lg:mb-0" />
            <h1 className="-mt-10 font-extrabold text-5xl lg:text-7xl text-white">
              {programming.event_ended
                ? "CONHEÇA OS VENCEDORES"
                : programming.first_stage_status === "não iniciado"
                ? "EM BREVE"
                : "COMECE A VOTAR"}
              </h1>
            <h2 className="mt-2 text-4xl font-bold text-yellow-100">POWERPOINT DISCORD</h2>
            <div className="mt-10 flex items-center gap-4 flex-wrap">
              <Button url="/sobre#conselho-consultivo" variant={true} content="CONHEÇA O NOSSO CONSELHO CONSULTIVO" />
              {programming.first_stage_status !== "não iniciado" && (
                <Button
                  url="/indicados"
                  content={
                    programming.event_ended
                      ? "CONHEÇA OS VENCEDORES"
                      : programming.first_stage_status !== "não iniciado"
                      && "VOTE AGORA"
                  }
                />
              )}
            </div>
          </div>
          <div className="relative mt-[20vh] lg:mt-0 p-4 flex flex-col justify-center min-h-[100px] text-center backdrop-blur-lg bg-black/30">
            <h2 className="uppercase font-extrabold text-xl text-white">A celebração global dos videogames</h2>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="relative z-10 p-5 lg:p-10">
          <h1 className="text-yellow-200 font-extrabold text-5xl">CURIOSIDADE</h1>
          <div className="mt-5">
            <div className="p-10 bg-[#0a0e13b3] border rounded-lg border-[#6588ba] w-full flex gap-5 flex-col lg:flex-row justify-between">
              <div>
                <p className="text-white font-extrabold text-2xl">
                  {randomFact}
                </p>
                <p className="text-white font-semibold text-xl mt-3">
                  Este evento é muito mais do que uma premiação; é uma celebração vibrante da criatividade e do impacto dos games no mundo. Conectamos desenvolvedores, jogadores e visionários, criando um espaço onde o passado, o presente e o futuro do entretenimento digital se encontram em perfeita harmonia. Aqui, histórias de dedicação e inovação ganham vida, enquanto reconhecemos os talentos que moldam a indústria com suas ideias ousadas e cativantes. Mais do que troféus, entregamos reconhecimento e inspiração, celebrando o poder dos jogos de unir pessoas, transcender barreiras e transformar vidas. O PPDC Awards é o palco onde paixão e inovação se encontram, onde cada frame, cada ideia e cada conquista são valorizados. Somos uma comunidade, uma força, um movimento que honra o que é brilhante hoje e desafia o que pode ser ainda mais extraordinário amanhã. Bem-vindo ao futuro dos games. Bem-vindo ao PPDC Awards.
                </p>
              </div>
              <Image src="/ajudantico/boqueaberto.png" width={200} height={200} alt="Ajudantico Boqueaberto" />
            </div>
          </div>
        </div>
        <div className="top-0 left-0 z-[-10] h-screen w-full bg-[url('https://cdn.thegameawards.com/frontend/jpegs/mid-section-bg_24.jpg')] bg-center bg-cover bg-no-repeat pointer-events-none fixed">
          <div className="absolute inset-0 bg-black opacity-70" />
        </div>
      </div>
    </div>
  );
}
