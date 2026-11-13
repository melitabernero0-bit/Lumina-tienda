import React, { useState } from 'react';
import {
  ShoppingBag, Eye, Smile, Sparkles, Brush, Heart, X,
  Plus, Minus, Trash2, Check, MessageCircle, MapPin,
  Truck, Calendar, ChevronDown, Menu
} from 'lucide-react';
import { PRODUCTOS_INICIALES } from './productos.js';

const CATEGORIAS = [
  { id: 'OJOS', nombre: 'OJOS', icono: Eye },
  { id: 'LABIOS', nombre: 'LABIOS', icono: Smile },
  { id: 'ROSTRO', nombre: 'ROSTRO', icono: Sparkles },
  { id: 'ACCESORIOS', nombre: 'ACCESORIOS', icono: Brush },
  { id: 'CUIDADO PERSONAL', nombre: 'CUIDADO PERSONAL', icono: Heart },
];

const WHATSAPP_NUMERO = '5493515091049';

export default function App() {
  const [categoriaActiva, setCategoriaActiva] = useState('TODAS');
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);
  const [desplegableCatMovil, setDesplegableCatMovil] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [metodoEntrega, setMetodoEntrega] = useState('envio');
  const [metodoPago, setMetodoPago] = useState('transferencia');
  const [nombreCliente, setNombreCliente] = useState('');
  const [direccionCliente, setDireccionCliente] = useState('');
  const [errorForm, setErrorForm] = useState('');

  const productosFiltrados = categoriaActiva === 'TODAS'
    ? PRODUCTOS_INICIALES
    : PRODUCTOS_INICIALES.filter((p) => p.categoria === categoriaActiva);

  const seleccionarCategoria = (id) => {
    setCategoriaActiva(id);
    setDesplegableCatMovil(false);
    setMenuMovilAbierto(false);
  };

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) return prev.map((item) => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item);
      return [...prev, { ...producto, cantidad: 1 }];
    });
    setCarritoAbierto(true);
  };

  const cambiarCantidad = (id, delta) => {
    setCarrito((prev) => prev.map((item) => item.id === id ? { ...item, cantidad: Math.max(0, item.cantidad + delta) } : item).filter((item) => item.cantidad > 0));
  };

  const quitarProducto = (id) => setCarrito((prev) => prev.filter((item) => item.id !== id));
  const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const costoEnvio = metodoEntrega === 'envio' && subtotal > 0 ? 4000 : 0;
  const totalFinal = subtotal + costoEnvio;

  const formatearPrecio = (valor) => new Intl.NumberFormat('es-AR', {
    style: 'currency', currency: 'ARS', maximumFractionDigits: 0,
  }).format(valor);

  const enviarPedidoWhatsApp = () => {
    if (!nombreCliente.trim()) {
      setErrorForm('Por favor, ingresá tu nombre y apellido.');
      return;
    }
    if (metodoEntrega === 'envio' && !direccionCliente.trim()) {
      setErrorForm('Por favor, ingresá tu dirección y barrio para el envío.');
      return;
    }
    setErrorForm('');

    const lineasProductos = carrito
      .map((item) => `• ${item.cantidad}x ${item.nombre} (${formatearPrecio(item.precio * item.cantidad)})`)
      .join('\n');

    let textoEntrega = 'Entrega a coordinar por WhatsApp';
    if (metodoEntrega === 'envio') textoEntrega = `Envío a domicilio ($4.000)\nDirección: ${direccionCliente}`;
    if (metodoEntrega === 'retiro') textoEntrega = 'Retiro por domicilio (Gratis · Felix de Zuñiga 4637)';

    const textoPago = metodoPago === 'transferencia' ? 'Transferencia' : 'Efectivo';
    const mensaje = `Hola LUMINA! Quiero hacer el siguiente pedido:\n\n*Cliente:* ${nombreCliente}\n\n*Productos:*\n${lineasProductos}\n\n*Entrega:* ${textoEntrega}\n*Forma de pago:* ${textoPago}\n*Total estimado:* ${formatearPrecio(totalFinal)}\n\nQuedo a la espera de la confirmación de stock. Gracias!`;

    window.location.href = `https://whatsapp.com{WHATSAPP_NUMERO}&text=${encodeURIComponent(mensaje)}`;
  };

    const linkWhatsAppConsulta = "https://wa.me.";


  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2C2C2C] font-sans">
      <div className="bg-[#EFE8E0] text-[#5C534E] text-[11px] tracking-[0.2em] uppercase py-2 overflow-hidden border-b border-[#E5DDD3]">
        <div className="animate-marquee">
          {Array.from({ length: 10 }).map((_, idx) => (
            <span key={idx} className="mx-6 whitespace-nowrap">SIN MÍNIMO DE COMPRA · ENVÍOS A DOMICILIO</span>
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#EDE6DD]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button onClick={() => setMenuMovilAbierto(!menuMovilAbierto)} className="sm:hidden p-2 text-[#2C2C2C]">
            {menuMovilAbierto ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <a href="#" onClick={() => seleccionarCategoria('TODAS')} className="font-serif text-2xl sm:text-3xl tracking-[0.22em] text-[#2C2C2C]">LUMINA</a>
          <nav className="hidden sm:flex items-center gap-8 text-xs tracking-[0.18em] text-[#6E655F]">
            <a href="#categorias" className="hover:text-[#2C2C2C] transition">CATEGORÍAS</a>
            <a href="#coleccion" className="hover:text-[#2C2C2C] transition">COLECCIÓN</a>
          </nav>
          <button onClick={() => setCarritoAbierto(true)} className="relative p-2 text-[#2C2C2C] hover:opacity-75 transition">
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            {totalProductos > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#C8A29E] text-white text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center">{totalProductos}</span>
            )}
          </button>
        </div>

        {menuMovilAbierto && (
          <div className="sm:hidden bg-[#FAF8F5] border-b border-[#EDE6DD] px-5 py-4 space-y-2">
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#8C7F78] pb-1">CATÁLOGO POR CATEGORÍA</p>
            <button onClick={() => seleccionarCategoria('TODAS')} className="block w-full text-left py-2 text-xs tracking-[0.15em] uppercase text-[#2C2C2C]">Ver todo el catálogo</button>
            {CATEGORIAS.map((cat) => (
              <button key={cat.id} onClick={() => seleccionarCategoria(cat.id)} className="block w-full text-left py-2 text-xs tracking-[0.15em] uppercase border-t border-[#F0EAE2] text-[#2C2C2C]">{cat.nombre}</button>
            ))}
          </div>
        )}
      </header>
      <section className="px-4 sm:px-6 pt-6 pb-8">
        <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-[#F9ECE4] via-[#F5EFEA] to-[#EFE8F3] border border-[#EDE4DC] py-14 sm:py-24 px-6 text-center">
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#8C7F78] mb-3">COLECCIÓN ESENCIAL</p>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#2C2C2C] mb-4">Tus esenciales</h1>
          <p className="font-serif italic text-lg sm:text-xl text-[#6E655F] max-w-md mx-auto mb-8">Productos de belleza y cuidado para todos los días.</p>
          <a href="#coleccion" className="inline-block border border-[#2C2C2C] px-7 py-3 text-xs tracking-[0.2em] uppercase text-[#2C2C2C] hover:bg-[#2C2C2C] hover:text-[#FAF8F5] transition">VER COLECCIÓN</a>
        </div>
      </section>

      <section id="categorias" className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-4 text-center">
        <h2 className="font-serif text-3xl text-[#2C2C2C] mb-6">Categorías</h2>
        <div className="sm:hidden max-w-xs mx-auto mb-4 relative">
          <button onClick={() => setDesplegableCatMovil(!desplegableCatMovil)} className="w-full flex items-center justify-between px-4 py-3 bg-[#F4EFEA] border border-[#E5DDD3] rounded-xl text-xs tracking-[0.16em] uppercase text-[#2C2C2C]">
            <span>{categoriaActiva === 'TODAS' ? 'Elegir categoría (Todas)' : categoriaActiva}</span>
            <ChevronDown className={`w-4 h-4 text-[#8C7F78] transition-transform ${desplegableCatMovil ? 'rotate-180' : ''}`} />
          </button>
          {desplegableCatMovil && (
            <div className="mt-1.5 bg-white border border-[#EDE6DD] rounded-xl shadow-md overflow-hidden text-left">
              <button onClick={() => seleccionarCategoria('TODAS')} className="w-full px-4 py-2.5 text-xs tracking-[0.15em] uppercase hover:bg-[#F4EFEA] border-b border-[#F5EFEA]">VER TODO</button>
              {CATEGORIAS.map((cat) => (
                <button key={cat.id} onClick={() => seleccionarCategoria(cat.id)} className="w-full px-4 py-2.5 text-xs tracking-[0.15em] uppercase hover:bg-[#F4EFEA] border-b border-[#F5EFEA] last:border-none">{cat.nombre}</button>
              ))}
            </div>
          )}
        </div>

        <div className="hidden sm:grid sm:grid-cols-5 gap-6 justify-items-center">
          {CATEGORIAS.map((cat) => {
            const Icono = cat.icono;
            const activa = categoriaActiva === cat.id;
            return (
              <button key={cat.id} onClick={() => seleccionarCategoria(cat.id)} className="group flex flex-col items-center gap-2.5">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center transition border ${activa ? 'bg-[#C8A29E] text-white border-[#C8A29E]' : 'bg-[#F4EFEA] text-[#5C534E] border-[#E8DFD5] group-hover:border-[#C8A29E]'}`}>
                  <Icono className="w-6 h-6 stroke-[1.4]" />
                </div>
                <span className={`text-[11px] tracking-[0.15em] uppercase ${activa ? 'font-semibold text-[#2C2C2C]' : 'text-[#6E655F]'}`}>{cat.nombre}</span>
              </button>
            );
          })}
        </div>
        <div className="hidden sm:block mt-7">
          <button onClick={() => seleccionarCategoria('TODAS')} className="text-[11px] tracking-[0.2em] uppercase text-[#6E655F] border-b border-[#C8A29E] pb-1 hover:text-[#2C2C2C]">VER TODO</button>
        </div>
      </section>

      <section id="coleccion" className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 flex-1">
        <div className="text-center mb-8">
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#8C7F78] mb-2">{categoriaActiva === 'TODAS' ? 'TODOS LOS PRODUCTOS' : categoriaActiva}</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C2C2C]">Nuestra colección</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {productosFiltrados.map((producto) => (
            <div key={producto.id} className="bg-white rounded-xl border border-[#EDE6DD] overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="aspect-square bg-[#F4EFEA] overflow-hidden">
                  <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-3 sm:p-4">
                  <p className="text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-[#9A8F88] mb-1">{producto.categoria}</p>
                  <h3 className="font-serif text-lg sm:text-xl text-[#2C2C2C] leading-snug mb-1">{producto.nombre}</h3>
                  {producto.descripcion && <p className="text-xs text-[#7A716B] line-clamp-2 mb-2">{producto.descripcion}</p>}
                </div>
              </div>
              <div className="px-3 pb-3 sm:px-4 sm:pb-4 pt-1 flex flex-col gap-2">
                <span className="text-sm sm:text-base font-medium text-[#2C2C2C]">{formatearPrecio(producto.precio)}</span>
                <button onClick={() => agregarAlCarrito(producto)} className="w-full py-2 px-3 bg-[#F4EFEA] hover:bg-[#C8A29E] text-[#2C2C2C] hover:text-white text-[11px] tracking-[0.15em] uppercase rounded-lg transition font-medium">Agregar</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <footer className="border-t border-[#EDE6DD] py-6 px-4 text-center text-xs text-[#8C7F78]">
        <p>© {new Date().getFullYear()} LUMINA · Córdoba, Argentina</p>
      </footer>

                        <a
                    href={"https://wa.me" + encodeURIComponent(
                      "Hola LUMINA! Quiero hacer el siguiente pedido:\n\n" +
                      "Cliente: " + nombreCliente + "\n\n" +
                      "Productos:\n" +
                      carrito.map((i) => "- " + i.cantidad + "x " + i.nombre + " (" + formatearPrecio(i.precio * i.cantidad) + ")").join("\n") +
                      "\n\nEntrega: " + (
                        metodoEntrega === "envio"
                          ? "Envio a domicilio ($4.000) - Dir: " + direccionCliente
                          : metodoEntrega === "retiro"
                          ? "Retiro por domicilio (Felix de Zuniga 4637)"
                          : "A coordinar"
                      ) +
                      "\nPago: " + (metodoPago === "transferencia" ? "Transferencia" : "Efectivo") +
                      "\nTotal estimado: " + formatearPrecio(totalFinal)
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs tracking-[0.18em] uppercase font-semibold rounded-xl shadow-sm"
                  >
                    ENVIAR PEDIDO POR WHATSAPP
                  </a>

                  
                )}
                <p className="text-[10px] text-center text-[#8C7F78]">Primero confirmamos disponibilidad, después podés transferir.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
