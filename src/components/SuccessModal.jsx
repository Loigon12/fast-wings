import React from 'react';
import { CheckCircle2, Flame } from 'lucide-react';

const SuccessModal = ({ isOpen, onClose, table }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl shadow-orange-600/10 text-center animate-in zoom-in-95 duration-300">
        
        {/* Icono Animado */}
        <div className="relative mx-auto w-24 h-24 mb-6">
          <div className="absolute inset-0 bg-orange-600 rounded-full animate-ping opacity-20"></div>
          <div className="relative bg-gradient-to-tr from-orange-600 to-red-600 w-24 h-24 rounded-full flex items-center justify-center shadow-xl shadow-orange-600/40">
            <CheckCircle2 size={48} className="text-white" strokeWidth={3} />
          </div>
        </div>

        <h2 className="text-3xl font-black mb-2 text-white">¡RECIBIDO!</h2>
        <p className="text-zinc-400 mb-6 leading-relaxed">
          Tu orden para la <span className="text-orange-500 font-bold">Mesa {table}</span> ya está en camino a la cocina. Prepárate para el sabor.
        </p>

        <button
          onClick={onClose}
          className="w-full bg-zinc-100 text-black font-black py-4 rounded-2xl hover:bg-orange-500 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          ¡EXCELENTE! <Flame size={18} />
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;