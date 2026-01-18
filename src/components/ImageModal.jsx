import React from 'react';
import { X } from 'lucide-react';

const ImageModal = ({ isOpen, onClose, image, name }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Botón Cerrar */}
      <button 
        className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50"
        onClick={onClose}
      >
        <X size={28} />
      </button>

      {/* Contenedor de Imagen */}
      <div 
        className="relative max-w-5xl w-full h-[80vh] flex flex-col items-center justify-center animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic en la imagen
      >
        <img 
          src={image} 
          alt={name} 
          className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-zinc-800" 
        />
        
        {/* Título de la comida abajo de la foto */}
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-black italic text-white uppercase tracking-tighter">{name}</h2>
          <div className="w-12 h-1 bg-orange-600 mx-auto mt-2 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;