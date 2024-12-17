"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const phrases = [
  "A simplicidade é o último grau da sofisticação.",
  "Uma vez já concorri ao PPDC Awards....eu era jovem.",
  "O único limite para o nosso amanhã são nossas dúvidas de hoje.",
  "A verdadeira sabedoria está em saber que você não sabe de nada.",
  "A vida é aquilo que acontece enquanto estamos ocupados fazendo planos.",
  "Somos feitos de estrelas, mas brilhamos ao criar luz própria.",
  "Cara, se o PowerPoint é a melhor Game Engine...Por que insistem em usar as outras concorrentes?",
  "O sucesso é uma jornada, não um destino.",
  "A persistência transforma sonhos em realidade.",
  "O poder da criatividade é infinito, assim como a imaginação.",
  "As melhores histórias nascem de ideias simples, mas ousadas.",
  "Cada obstáculo vencido é um degrau rumo à grandeza.",
  "A arte é a expressão mais pura da alma humana.",
  "Erick uma vez disse...",
  "A inspiração está ao seu redor, basta saber enxergar.",
  "Mesmo as estrelas mais distantes brilham no escuro.",
  "O desafio é o combustível que nos faz evoluir.",
  "Sonhar grande é o primeiro passo para realizar o impossível.",
  "Lorem Ipsum Dolor Sit Amet..."
];

export default function WaitingRoom({ phase, status }) {
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
  const [fade, setFade] = useState(true);
  let index = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        index = (index + 1) % phrases.length;
        setCurrentPhrase(phrases[index]);
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed z-10 top-0 left-0 min-h-screen w-full flex items-center justify-center bg-black">
      <div className="relative w-[700px] h-[350px]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
          	className="select-none pointer-events-none"
            src="https://i.pinimg.com/originals/87/c2/25/87c22565476e9fb9e69f06ac5f1de2e1.gif"
            alt="Círculo Grande"
            width={350}
            height={350}
            quality={100}
          />
        </div>
        <div className="absolute inset-0 text-center flex flex-col items-center justify-center">
          <h1
            className={`text-white select-none text-3xl font-extrabold transition-opacity duration-500 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            {currentPhrase}
          </h1>
          <p className="text-xl select-none text-white mt-5 font-semibold">A <strong>{phase}</strong> está com status <strong>&quot;{status}&quot;</strong>. O acesso está indisponível no momento.</p>
        </div>
      </div>
    </div>
  );
}
