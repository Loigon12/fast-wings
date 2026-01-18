import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Utensils, Flame, ChevronDown, IceCream, Beer, Ham } from 'lucide-react';
import SplashScreen from './components/SplashScreen'; 
import SuccessModal from './components/SuccessModal';
import ImageModal from './components/ImageModal';
import imgAlitasFuego from './assets/images.jpg';
import imgAlitasBBQ from './assets/Alitas.webp';
import imgAlitasx24 from './assets/x24.jpg';


const MENU_DATA = [
  // ... ALITAS ...
  { id: 1, name: "Alitas Fuego Clásicas", price: 25.000, category: "Alitas", description: "Bañadas en nuestra salsa picante secreta.", image: imgAlitasFuego },
  { id: 2, name: "Alitas BBQ Ahumadas", price: 21.000, category: "Alitas", description: "Dulces, ahumadas y pegajosas. Un clásico.", image: imgAlitasBBQ },
  { id: 3, name: "Lemon Pepper Wings", price: 32.500, category: "Alitas", description: "Cítricas y con el toque justo de pimienta.", image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800&q=80" },
  { id: 4, name: "Alitas X24", price: 51.300, category: "Alitas", description: "Ideal para compartir con tu grupo de amigos.", image: imgAlitasx24 },
  
  
  // --- ACOMPAÑANTES ---
  { id: 4, name: "Papas Fritas Rústicas", price: 4.500, category: "Acompañantes", description: "Corte grueso con especias cajún.", image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=800&q=80" },
  { id: 5, name: "Aros de Cebolla Jumbo", price: 5.500, category: "Acompañantes", description: "Crujientes y dorados, con salsa ranch.", image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=800&q=80" },

  // --- BEBIDAS ---
  { id: 6, name: "Cerveza Artesanal IPA", price: 6.000, category: "Bebidas", description: "Refrescante y con cuerpo.", image: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757?w=800&q=80" },
  { id: 7, name: "Limonada de Hierbabuena", price: 3.500, category: "Bebidas", description: "Natural y 100% refrescante.", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80" },
  
  // --- POSTRES ---
  { id: 8, name: "Brownie con Helado", price: 7.000, category: "Postres", description: "Chocolate fundido con helado de vainilla.", image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800&q=80" },
  { id: 9, name: "Cheesecake de Frutos Rojos", price: 6.500, category: "Postres", description: "Base de galleta crujiente y salsa natural.", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80" },
];

const CATEGORIES = [
  { id: 'Alitas', icon: <Flame size={18} /> },
  { id: 'Acompañantes', icon: <Ham size={18} /> },
  { id: 'Bebidas', icon: <Beer size={18} /> },
  { id: 'Postres', icon: <IceCream size={18} /> }
];

function WingShopApp() {
  const [cart, setCart] = useState([]);
  const [table, setTable] = useState("");
  const [view, setView] = useState('menu');
  const [activeCategory, setActiveCategory] = useState('Alitas');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  // Nuevo estado para controlar el Modal de Éxito
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Simula una carga de 2.5 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Muestra la pantalla de carga por 2.5 segundos
    return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
  }, []); // Se ejecuta solo una vez al montar el componente

  const addToCart = (product) => {
    const exists = cart.find(item => item.id === product.id);
    if (exists) {
      setCart(cart.map(item => item.id === product.id ? { ...exists, qty: exists.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const exists = cart.find(item => item.id === id);
    if (exists.qty === 1) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => item.id === id ? { ...exists, qty: exists.qty - 1 } : item));
    }
  };

  const handleConfirmOrder = () => {
    // 1. Mostramos el mensaje de éxito
    setShowSuccess(true);
    
    // 2. Después de un pequeño retraso o al cerrar, limpiamos todo (se hace en closeSuccess)
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    setCart([]);        // Limpia el carrito
    setView('menu');    // Regresa al menú automáticamente
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const totalItems = cart.reduce((a, b) => a + b.qty, 0);
  const filteredItems = MENU_DATA.filter(item => item.category === activeCategory);

  // Si isLoading es true, muestra la SplashScreen
  if (isLoading) {
    return <SplashScreen />;
  }

  // Si isLoading es false, muestra el menú principal
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased flex flex-col items-center">
      
      <div className="w-full md:max-w-3xl md:border-x md:border-zinc-800 min-h-screen flex flex-col bg-zinc-950 shadow-2xl relative pb-32">
        
        {/* Modal de éxito */}
      <SuccessModal 
        isOpen={showSuccess} 
        onClose={closeSuccess} 
        table={table} 
      />

      {/* Modal de Imagen (Añádelo aquí junto a los otros modales) */}
  <ImageModal 
    isOpen={!!selectedImage} 
    onClose={() => setSelectedImage(null)} 
    image={selectedImage?.image} 
    name={selectedImage?.name} 
  />
      
        {/* --- Header --- */}
        <header className="bg-zinc-950/90 backdrop-blur-md p-4 sticky top-0 z-20 border-b border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Círculo del Logo */}
              <div className="relative">
                <div className="bg-gradient-to-tr from-orange-600 to-red-600 p-2 rounded-2xl shadow-lg shadow-orange-600/20 rotate-3">
                   <Flame size={24} className="text-white" strokeWidth={3} />
                </div>
                {/* Un pequeño adorno para que parezca un logo diseñado */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse border-2 border-zinc-950"></div>
              </div>

              <div>
                <h1 className="text-xl font-black tracking-tighter uppercase leading-none">
                  <span className="text-white">FAST</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500 ml-1">WINGS</span>
                </h1>
                <p className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase leading-none mt-1">Sabor autentico</p>
              </div>
            </div>
            
            {/* Selector de Mesa */}
            <div className="relative">
              <select 
                className="appearance-none bg-zinc-900 pl-4 pr-10 py-2 rounded-2xl text-xs font-black focus:ring-2 focus="
                value={table}
                onChange={(e) => setTable(e.target.value)}
              >
                <option value="">Mesa?</option>
                {[...Array(19)].map((_, i) => (
                  <option key={i+1} value={i+1}>Mesa {i+1}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"/>
            </div>
          </div>
          
          {view === 'menu' && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-4 mt-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 border ${
                    activeCategory === cat.id 
                    ? 'bg-orange-600 border-orange-500 text-white shadow-lg shadow-orange-600/20' 
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                  }`}
                >
                  {cat.icon} {cat.id}
                </button>
              ))}
            </div>
          )}
        </header>

        {/* --- Main Content --- */}
        <main className="p-4 flex-1">
          {view === 'menu' ? (
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                  <h2 className="text-2xl font-black">{activeCategory}</h2>
                  <span className="text-zinc-500 text-sm font-medium">{filteredItems.length} opciones</span>
              </div>
              
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {filteredItems.map(item => (
    <div key={item.id} className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800/50 flex flex-col relative animate-in fade-in slide-in-from-bottom-2 duration-300 hover:border-zinc-700 transition-colors group">
      
      {/* 1. CAMBIO AQUÍ: Añadimos el onClick y el cursor de lupa a este contenedor */}
      <div 
        className="w-full h-40 relative cursor-zoom-in" 
        onClick={() => setSelectedImage(item)}
      >
        <img src={item.image} alt={item.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
        
        {/* Un icono sutil de "lupa" que aparece al pasar el mouse (opcional) */}
        <div className="absolute top-3 right-3 bg-black/40 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
           <Plus size={16} className="text-white" />
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between -mt-10 relative z-10">
        <div>
          <h3 className="text-lg font-bold leading-tight">{item.name}</h3>
          <p className="text-zinc-400 text-xs mt-1 line-clamp-2">{item.description}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-black text-orange-500">${item.price.toFixed(3)}</p>
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Evita que al tocar el botón también se abra la imagen
              addToCart(item);
            }}
            className="bg-white text-black p-2 rounded-2xl shadow-xl active:scale-90 transition-all hover:bg-orange-500 hover:text-white"
          >
            <Plus size={22} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
            </div>
          ) : (
            /* --- Carrito / Orden --- */
            <div className="space-y-6 animate-in fade-in duration-300 max-w-xl mx-auto w-full">
              <h2 className="text-2xl font-black text-center mt-4">Tu Orden Final</h2>
              {cart.length === 0 ? (
                <div className="text-center py-20 opacity-30">
                  <ShoppingCart size={48} className="mx-auto mb-2"/>
                  <p>No hay productos seleccionados</p>
                </div>
              ) : (
                <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 shadow-xl">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center py-4 border-b border-zinc-800 last:border-0">
                      <div className="flex items-center gap-4">
                        <img src={item.image} alt={item.name} className="w-14 h-14 rounded-2xl object-cover" />
                        <div>
                          <p className="font-bold text-base">{item.name}</p>
                          <p className="text-orange-500 font-black text-sm">${(item.price * item.qty).toFixed(3)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-zinc-800 rounded-full px-3 py-1.5 border border-zinc-700">
                        <button onClick={() => removeFromCart(item.id)} className="p-1 text-zinc-400 hover:text-white"><Minus size={16}/></button>
                        <span className="font-bold text-sm w-4 text-center">{item.qty}</span>
                        <button onClick={() => addToCart(item)} className="p-1 text-orange-500 hover:text-white"><Plus size={16}/></button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-6 pt-6 border-t border-dashed border-zinc-700">
                    <div className="flex justify-between text-2xl font-black">
                      <span>Total:</span>
                      <span className="text-orange-500">${total.toFixed(3)}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <button 
                disabled={!table || cart.length === 0}
          className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-black text-lg py-5 rounded-2xl shadow-xl disabled:opacity-20 transition-all hover:brightness-110 active:scale-95"
          onClick={handleConfirmOrder} // <--- Llamamos a la nueva función
              >
                CONFIRMAR PEDIDO {table && `- MESA ${table}`}
              </button>
              <p className="text-xs text-zinc-500 text-center mt-2">*Asegúrate de seleccionar tu mesa antes de confirmar</p>
            </div>
          )}
        </main>

        {/* --- Navbar Móvil/PC --- */}
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:max-w-md bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-full p-2 shadow-2xl flex justify-around z-30">
          <button 
            onClick={() => setView('menu')}
            className={`flex items-center gap-2 px-8 py-3 rounded-full transition-all ${view === 'menu' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/40' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Utensils size={22} />
            <span className={`text-sm font-black ${view === 'menu' ? 'block' : 'hidden md:block'}`}>Menú</span>
          </button>
          <button 
            onClick={() => setView('order')}
            className={`flex items-center gap-2 px-8 py-3 rounded-full transition-all relative ${view === 'order' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/40' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <div className="relative">
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-orange-600 text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center border-2 border-zinc-900">
                  {totalItems}
                </span>
              )}
            </div>
            <span className={`text-sm font-black ${view === 'order' ? 'block' : 'hidden md:block'}`}>Orden</span>
          </button>
        </nav>

      </div>
    </div>
  );
}

export default function App() {
  return <WingShopApp />;
}