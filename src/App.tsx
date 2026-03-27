/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  User, 
  Search, 
  Menu, 
  X, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  CreditCard, 
  Headphones,
  Star,
  Instagram,
  Twitter,
  Facebook,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  colors: string[];
  sizes?: string[];
  salesCount: number;
}

interface CartItem extends Product {
  quantity: number;
}

// --- Mock Data ---
const PRODUCTS: Product[] = [
  { 
    id: 1, 
    name: "Lumina Sound S1", 
    price: 299, 
    category: "Audio", 
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    colors: ["#000000", "#FFFFFF", "#3B82F6"],
    salesCount: 150
  },
  { 
    id: 2, 
    name: "Minimalist Desk Lamp", 
    price: 89, 
    category: "Hogar", 
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=800&auto=format&fit=crop",
    colors: ["#FFFFFF", "#D1D5DB"],
    salesCount: 85
  },
  { 
    id: 3, 
    name: "Smart Watch Series X", 
    price: 399, 
    category: "Tecnología", 
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
    colors: ["#000000", "#EF4444", "#10B981"],
    sizes: ["S", "M", "L"],
    salesCount: 320
  },
  { 
    id: 4, 
    name: "Ergonomic Mouse", 
    price: 129, 
    category: "Accesorios", 
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800&auto=format&fit=crop",
    colors: ["#000000", "#6B7280"],
    salesCount: 210
  },
  { 
    id: 5, 
    name: "Lumina Air Pods", 
    price: 199, 
    category: "Audio", 
    image: "https://images.unsplash.com/photo-1588423770574-910ae27755a7?q=80&w=800&auto=format&fit=crop",
    colors: ["#FFFFFF"],
    salesCount: 450
  },
  { 
    id: 6, 
    name: "Mechanical Keyboard", 
    price: 159, 
    category: "Accesorios", 
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800&auto=format&fit=crop",
    colors: ["#000000", "#FFFFFF"],
    sizes: ["60%", "TKL", "Full"],
    salesCount: 180
  },
];

const COLORS = [
  { name: "Negro", value: "#000000" },
  { name: "Blanco", value: "#FFFFFF" },
  { name: "Azul", value: "#3B82F6" },
  { name: "Gris", value: "#6B7280" },
  { name: "Rojo", value: "#EF4444" },
  { name: "Verde", value: "#10B981" },
];

const SIZES = ["S", "M", "L", "60%", "TKL", "Full"];

const CATEGORIES = [
  { name: "Audio", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop" },
  { name: "Hogar", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop" },
  { name: "Tecnología", image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=800&auto=format&fit=crop" },
];

const TESTIMONIALS = [
  { name: "Elena R.", text: "La calidad de los productos es excepcional. El diseño minimalista encaja perfecto con mi oficina.", rating: 5 },
  { name: "Marcos T.", text: "El envío fue rapidísimo y el empaque es una experiencia en sí misma. Muy recomendado.", rating: 5 },
  { name: "Sofía L.", text: "Atención al cliente de primer nivel. Resolvieron mis dudas en minutos.", rating: 4 },
];

// --- Components ---

const Navbar = ({ cartCount, onOpenCart }: { cartCount: number; onOpenCart: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <a href="#" className="text-2xl font-bold tracking-tighter text-slate-900">LUMINA</a>
          <div className="hidden md:flex items-center gap-8">
            {['Inicio', 'Tienda', 'Categorías', 'Ofertas', 'Contacto'].map((item) => (
              <a key={item} href={item === 'Tienda' ? '#tienda' : '#'} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">{item}</a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-5">
          <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors"><Search size={20} /></button>
          <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors"><User size={20} /></button>
          <button 
            onClick={onOpenCart}
            className="p-2 text-slate-600 hover:text-slate-900 transition-colors relative"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 p-6 md:hidden flex flex-col gap-4 shadow-xl"
          >
            {['Inicio', 'Tienda', 'Categorías', 'Ofertas', 'Contacto'].map((item) => (
              <a key={item} href={item === 'Tienda' ? '#tienda' : '#'} className="text-lg font-medium text-slate-900 py-2 border-b border-slate-50">{item}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section className="relative h-screen flex items-center pt-20 overflow-hidden bg-[#F8F9FA]">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6">Nueva Colección 2026</span>
        <h1 className="text-6xl md:text-7xl font-bold text-slate-900 leading-[1.1] mb-6 tracking-tight">
          Diseño que <br /> <span className="text-blue-600">inspira</span> tu día.
        </h1>
        <p className="text-lg text-slate-600 mb-10 max-w-md leading-relaxed">
          Descubre nuestra selección curada de tecnología y accesorios minimalistas diseñados para elevar tu estilo de vida digital.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#tienda" className="px-8 py-4 bg-slate-900 text-white font-semibold rounded-full hover:bg-slate-800 transition-all transform hover:scale-105 flex items-center gap-2">
            Comprar ahora <ArrowRight size={18} />
          </a>
          <button className="px-8 py-4 bg-white text-slate-900 border border-slate-200 font-semibold rounded-full hover:bg-slate-50 transition-all">
            Ver catálogo
          </button>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative"
      >
        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
          <img 
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop" 
            alt="Featured Product" 
            className="w-full h-auto object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10"></div>
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-50 -z-10"></div>
      </motion.div>
    </div>
  </section>
);

function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: (p: Product) => void; key?: React.Key }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 transition-all hover:shadow-xl"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <button 
          onClick={() => onAddToCart(product)}
          className="absolute bottom-4 left-4 right-4 py-3 bg-white/90 backdrop-blur-sm text-slate-900 font-bold rounded-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
        >
          Añadir al carrito
        </button>
      </div>
      <div className="p-5">
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">{product.category}</p>
        <h3 className="text-lg font-bold text-slate-900 mb-2">{product.name}</h3>
        <p className="text-xl font-bold text-blue-600">${product.price}</p>
      </div>
    </motion.div>
  );
}

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onRemove, 
  onUpdateQuantity 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  cartItems: CartItem[]; 
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
}) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Tu Carrito</h2>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag size={32} className="text-slate-300" />
                  </div>
                  <p className="text-slate-500 mb-8">Tu carrito está vacío.</p>
                  <button 
                    onClick={onClose}
                    className="px-8 py-3 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-all"
                  >
                    Empezar a comprar
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-24 h-24 bg-slate-50 rounded-2xl overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-bold text-slate-900">{item.name}</h3>
                            <button onClick={() => onRemove(item.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                              <X size={16} />
                            </button>
                          </div>
                          <p className="text-xs text-slate-400 uppercase tracking-wider">{item.category}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center border border-slate-100 rounded-lg overflow-hidden">
                            <button 
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="px-3 py-1 hover:bg-slate-50 text-slate-600"
                            >-</button>
                            <span className="px-3 py-1 text-sm font-bold text-slate-900">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="px-3 py-1 hover:bg-slate-50 text-slate-600"
                            >+</button>
                          </div>
                          <p className="font-bold text-blue-600">${item.price * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-500 font-medium">Total estimado</span>
                  <span className="text-2xl font-bold text-slate-900">${total}</span>
                </div>
                <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">
                  Finalizar Compra
                </button>
                <p className="text-center text-xs text-slate-400 mt-4">
                  Impuestos y envío calculados al finalizar la compra.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Categories = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Explora Categorías</h2>
          <p className="text-slate-500">Encuentra exactamente lo que necesitas para tu espacio.</p>
        </div>
        <a href="#" className="text-blue-600 font-bold flex items-center gap-1 hover:gap-2 transition-all">
          Ver todas <ChevronRight size={20} />
        </a>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {CATEGORIES.map((cat, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ scale: 1.02 }}
            className="relative h-80 rounded-3xl overflow-hidden group cursor-pointer"
          >
            <img 
              src={cat.image} 
              alt={cat.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex flex-col justify-end p-8">
              <h3 className="text-2xl font-bold text-white mb-2">{cat.name}</h3>
              <p className="text-white/70 text-sm">Explorar productos</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const TrustSection = () => (
  <section className="py-16 bg-slate-50 border-y border-slate-100">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
      {[
        { icon: <Truck className="text-blue-600" />, title: "Envío Rápido", desc: "En 24/48 horas" },
        { icon: <ShieldCheck className="text-blue-600" />, title: "Garantía Total", desc: "2 años de cobertura" },
        { icon: <CreditCard className="text-blue-600" />, title: "Pago Seguro", desc: "100% encriptado" },
        { icon: <Headphones className="text-blue-600" />, title: "Soporte 24/7", desc: "Siempre contigo" },
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-2">
            {item.icon}
          </div>
          <h4 className="font-bold text-slate-900">{item.title}</h4>
          <p className="text-sm text-slate-500">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const FeaturedProduct = () => (
  <section className="py-24 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="bg-slate-900 rounded-[3rem] overflow-hidden flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 h-96 md:h-[600px]">
          <img 
            src="https://images.unsplash.com/photo-1525547718571-a71440c93ae8?q=80&w=1200&auto=format&fit=crop" 
            alt="Featured Tech" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="w-full md:w-1/2 p-12 md:p-20">
          <span className="text-blue-400 font-bold tracking-widest uppercase text-xs mb-6 block">Producto Estrella</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight tracking-tight">
            Lumina Pro Hub: <br /> Conecta tu mundo.
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            El centro de mando definitivo para tu setup. 12 puertos en un diseño de aluminio aeroespacial que redefine la productividad.
          </p>
          <button className="px-10 py-5 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition-all flex items-center gap-3">
            Ver detalles <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-24 bg-[#F8F9FA]">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h2 className="text-3xl font-bold text-slate-900 mb-16 tracking-tight">Lo que dicen nuestros clientes</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 text-left"
          >
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={i < t.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"} />
              ))}
            </div>
            <p className="text-slate-600 italic mb-8 leading-relaxed">"{t.text}"</p>
            <p className="font-bold text-slate-900">— {t.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white pt-24 pb-12 border-t border-slate-100">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-1">
          <a href="#" className="text-2xl font-bold tracking-tighter text-slate-900 mb-6 block">LUMINA</a>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Elevando el estándar del diseño tecnológico minimalista desde 2024.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all"><Instagram size={18} /></a>
            <a href="#" className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all"><Twitter size={18} /></a>
            <a href="#" className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all"><Facebook size={18} /></a>
          </div>
        </div>
        
        <div>
          <h5 className="font-bold text-slate-900 mb-6">Tienda</h5>
          <ul className="flex flex-col gap-4 text-slate-500 text-sm">
            <li><a href="#tienda" className="hover:text-blue-600 transition-colors">Todos los productos</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Novedades</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Ofertas</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Categorías</a></li>
          </ul>
        </div>
        
        <div>
          <h5 className="font-bold text-slate-900 mb-6">Soporte</h5>
          <ul className="flex flex-col gap-4 text-slate-500 text-sm">
            <li><a href="#" className="hover:text-blue-600 transition-colors">Envíos y Devoluciones</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Preguntas Frecuentes</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Términos de Servicio</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Privacidad</a></li>
          </ul>
        </div>
        
        <div>
          <h5 className="font-bold text-slate-900 mb-6">Newsletter</h5>
          <p className="text-slate-500 text-sm mb-6">Suscríbete para recibir ofertas exclusivas y novedades.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Tu email" 
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20"
            />
            <button className="px-4 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all">
              Unirse
            </button>
          </div>
        </div>
      </div>
      
      <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-400 text-sm">© 2026 LUMINA Store. Todos los derechos reservados.</p>
        <div className="flex gap-6 text-slate-400 text-xs uppercase tracking-widest font-bold">
          <a href="#" className="hover:text-slate-900 transition-colors">España</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Inglés</a>
        </div>
      </div>
    </div>
  </footer>
);

const FilterSidebar = ({ 
  maxPrice, 
  setMaxPrice, 
  selectedColors, 
  setSelectedColors, 
  selectedSizes, 
  setSelectedSizes,
  onReset
}: { 
  maxPrice: number; 
  setMaxPrice: (v: number) => void; 
  selectedColors: string[]; 
  setSelectedColors: (v: string[]) => void; 
  selectedSizes: string[]; 
  setSelectedSizes: (v: string[]) => void;
  onReset: () => void;
}) => {
  const toggleColor = (color: string) => {
    setSelectedColors(selectedColors.includes(color) 
      ? selectedColors.filter(c => c !== color) 
      : [...selectedColors, color]);
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(selectedSizes.includes(size) 
      ? selectedSizes.filter(s => s !== size) 
      : [...selectedSizes, size]);
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-900">Precio Máximo</h3>
          <span className="text-sm font-bold text-blue-600">${maxPrice}</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="500" 
          step="10"
          value={maxPrice}
          onChange={(e) => setMaxPrice(parseInt(e.target.value))}
          className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest">
          <span>$0</span>
          <span>$500</span>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-slate-900 mb-4">Colores</h3>
        <div className="flex flex-wrap gap-3">
          {COLORS.map((color) => (
            <button
              key={color.value}
              onClick={() => toggleColor(color.value)}
              title={color.name}
              className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                selectedColors.includes(color.value) ? 'border-blue-600 scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: color.value }}
            >
              {selectedColors.includes(color.value) && (
                <div className={`w-2 h-2 rounded-full ${color.value === '#FFFFFF' ? 'bg-slate-900' : 'bg-white'}`} />
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-slate-900 mb-4">Tamaño / Formato</h3>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all border ${
                selectedSizes.includes(size) 
                  ? 'bg-slate-900 text-white border-slate-900' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={onReset}
        className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2"
      >
        Limpiar filtros
      </button>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortOrder, setSortOrder] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(500);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const resetFilters = () => {
    setSelectedCategory('Todos');
    setMaxPrice(500);
    setSelectedColors([]);
    setSelectedSizes([]);
  };

  // Load cart from Local Storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('lumina_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error loading cart from local storage", e);
      }
    }
  }, []);

  // Save cart to Local Storage whenever it changes
  useEffect(() => {
    localStorage.setItem('lumina_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true); // Open cart when adding item
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = PRODUCTS
    .filter(p => {
      const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
      const matchesPrice = p.price <= maxPrice;
      const matchesColor = selectedColors.length === 0 || p.colors.some(c => selectedColors.includes(c));
      const matchesSize = selectedSizes.length === 0 || (p.sizes && p.sizes.some(s => selectedSizes.includes(s)));
      return matchesCategory && matchesPrice && matchesColor && matchesSize;
    })
    .sort((a, b) => {
      if (sortOrder === 'low-to-high') return a.price - b.price;
      if (sortOrder === 'high-to-low') return b.price - a.price;
      if (sortOrder === 'best-sellers') return b.salesCount - a.salesCount;
      return 0; // 'featured' or default
    });

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
      
      <main>
        <Hero />
        
        <TrustSection />

        {/* Product Grid Section */}
        <section className="py-24 bg-white" id="tienda">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight text-balance">Nuestra Colección</h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-balance">
                Diseño minimalista con tecnología de vanguardia. Filtrado dinámico para encontrar tu pieza perfecta.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
              {/* Desktop Sidebar */}
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-32">
                  <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                    Filtros <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  </h2>
                  <FilterSidebar 
                    maxPrice={maxPrice}
                    setMaxPrice={setMaxPrice}
                    selectedColors={selectedColors}
                    setSelectedColors={setSelectedColors}
                    selectedSizes={selectedSizes}
                    setSelectedSizes={setSelectedSizes}
                    onReset={resetFilters}
                  />
                </div>
              </aside>

              <div className="flex-1">
                {/* Filter and Sort Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 pb-8 border-b border-slate-100">
                  <div className="flex flex-wrap justify-center gap-2">
                    {['Todos', ...CATEGORIES.map(c => c.name)].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                          selectedCategory === cat 
                            ? 'bg-slate-900 text-white shadow-lg' 
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <button 
                      onClick={() => setIsFilterOpen(true)}
                      className="lg:hidden flex-1 flex items-center justify-center gap-2 px-6 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
                    >
                      Filtros
                    </button>
                    <div className="flex items-center gap-3 flex-1 md:flex-none">
                      <select 
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-semibold rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600/20 cursor-pointer"
                      >
                        <option value="featured">Destacados</option>
                        <option value="best-sellers">Más vendidos</option>
                        <option value="low-to-high">Precio: Bajo a Alto</option>
                        <option value="high-to-low">Precio: Alto a Bajo</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <motion.div 
                  layout
                  className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ProductCard product={product} onAddToCart={addToCart} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {filteredProducts.length === 0 && (
                  <div className="py-20 text-center bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                    <p className="text-slate-400 text-lg font-medium">No se encontraron productos con estos filtros.</p>
                    <button 
                      onClick={resetFilters}
                      className="mt-4 text-blue-600 font-bold hover:underline"
                    >
                      Ver todos los productos
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Filter Drawer */}
        <AnimatePresence>
          {isFilterOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFilterOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80]"
              />
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 bg-white z-[90] rounded-t-[2.5rem] p-8 shadow-2xl max-h-[80vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-900">Filtros</h2>
                  <button onClick={() => setIsFilterOpen(false)} className="p-2 text-slate-400 hover:text-slate-900">
                    <X size={24} />
                  </button>
                </div>
                <FilterSidebar 
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                  selectedColors={selectedColors}
                  setSelectedColors={setSelectedColors}
                  selectedSizes={selectedSizes}
                  setSelectedSizes={setSelectedSizes}
                  onReset={resetFilters}
                />
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full mt-10 py-4 bg-slate-900 text-white font-bold rounded-2xl"
                >
                  Aplicar Filtros
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <Categories />

        <FeaturedProduct />

        <Testimonials />

        {/* CTA Section */}
        <section className="py-24 bg-blue-600">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">¿Listo para transformar tu espacio?</h2>
            <p className="text-blue-100 text-lg mb-12">
              Únete a más de 50,000 profesionales que confían en Lumina para su día a día.
            </p>
            <button className="px-12 py-5 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl">
              Empezar ahora
            </button>
          </div>
        </section>
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <Footer />
    </div>
  );
}
