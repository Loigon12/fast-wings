import React from 'react';
import { Flame } from 'lucide-react'; // Puedes usar Flame o buscar un icono de alita si prefieres

const SplashScreen = () => {
  return (
    <div className="splash-screen fixed inset-0 flex flex-col items-center justify-center bg-zinc-950 text-white z-[9999]">
      <div className="relative">
        {/* Fondo animado que simula calor */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-red-700 rounded-full blur-2xl opacity-70 animate-pulse-light"></div>
        
        {/* Icono central de alita/fuego */}
        <div className="relative p-6 bg-gradient-to-tr from-orange-500 to-red-600 rounded-full shadow-2xl shadow-orange-700/50 flex items-center justify-center animate-spin-slow">
          {/* Aquí puedes cambiar por un SVG de una alita si tienes uno, o usar un icono como Flame */}
          <Flame size={72} strokeWidth={2.5} className="text-white drop-shadow-lg" />
        </div>
      </div>
      
      {/* Texto de la marca */}
      <h1 className="mt-10 text-5xl font-black tracking-tight uppercase text-center animate-fade-in-up">
        <span className="text-white drop-shadow-md">FAST</span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400 ml-2 drop-shadow-md">WINGS</span>
      </h1>
      <p className="mt-4 text-zinc-400 text-lg tracking-[0.2em] uppercase animate-fade-in-up delay-200">
        Sabor autentico
      </p>

      {/* Barra de carga sutil */}
      <div className="absolute bottom-16 w-48 h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-orange-500 to-red-600 animate-load-bar"></div>
      </div>
    </div>
  );
};

export default SplashScreen;