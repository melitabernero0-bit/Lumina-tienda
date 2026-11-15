import React, { useState } from 'react';
import {
  ShoppingBag, Eye, Smile, Sparkles, Brush, Heart, X,
  Plus, Minus, Trash2, Check, MessageCircle, MapPin,
  Truck, ChevronDown, ChevronLeft, ChevronRight, Menu
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

  const [productoModal, setProductoModal] = useState(null);
  const [opcionElegida, setOpcionElegida] = useState('');
  const [cantidadModal, setCantidadModal] = useState(1);
  const [fotoActivaIdx, setFotoActivaIdx] = useState(0);

  const abrirDetalleProducto = (producto) => {
    setProductoModal(producto);
    setCantidadModal(1);
    setFotoActivaIdx(0);
    const opcionesDisponibles = producto.opciones || producto.tonos || producto.colores || [];
    const sinStock = producto.opcionesSinStock || [];
    const primeraConStock = opcionesDisponibles.find((op) => !sinStock.includes(op)) || '';
    setOpcionElegida(primeraConStock);
  };


  const cerrarDetalleProducto = () => {
    setProductoModal(null);
    setOpcionElegida('');
  };

  const fotosModal = productoModal
    ? (productoModal.imagenes && productoModal.imagenes.length > 0 ? productoModal.imagenes : [productoModal.imagen])
    : [];

  const opcionesModal = productoModal
    ? (productoModal.opciones || productoModal.tonos || productoModal.colores || [])
    : [];

  const productosFiltrados = categoriaActiva === 'TODAS'
    ? PRODUCTOS_INICIALES
    : PRODUCTOS_INICIALES.filter((p) =>
        Array.isArray(p.categoria)
          ? p.categoria.includes(categoriaActiva)
          : p.categoria === categoriaActiva
      );

  const seleccionarCategoria = (id) => {
    setCategoriaActiva(id);
    setDesplegableCatMovil(false);
    setMenuMovilAbierto(false);
  };

  const agregarAlCarrito = (producto, cantidad = 1, tono = '') => {
    const claveUnica = tono ? `${producto.id}-${tono}` : `${producto.id}`;
    setCarrito((prev) => {
      const existe = prev.find((item) => item.claveUnica === claveUnica);
      if (existe) {
        return prev.map((item) =>
          item.claveUnica === claveUnica ? { ...item, cantidad: item.cantidad + cantidad } : item
        );
      }
      return [...prev, { ...producto, claveUnica, opcionElegida: tono, cantidad }];
    });
    setCarritoAbierto(true);
  };

  const cambiarCantidad = (claveUnica, delta) => {
    setCarrito((prev) =>
      prev
        .map((item) => (item.claveUnica === claveUnica ? { ...item, cantidad: Math.max(0, item.cantidad + delta) } : item))
        .filter((item) => item.cantidad > 0)
    );
  };

  const quitarProducto = (claveUnica) => setCarrito((prev) => prev.filter((item) => item.claveUnica !== claveUnica));

  const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const costoEnvio = metodoEntrega === 'envio' && subtotal > 0 ? 4000 : 0;
  const totalFinal = subtotal + costoEnvio;

  const formatearPrecio = (valor) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(valor);

  const linkWhatsAppConsulta = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent('Hola Lumina! Quiero más información sobre sus productos.')}`;

  const enviarPedidoWhatsApp = () => {
    if (carrito.length === 0) return;

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
      .map((item) => {
        const detalleTono = item.opcionElegida ? ` (Tono/Opción: ${item.opcionElegida})` : '';
        return `• ${item.cantidad}x ${item.nombre}${detalleTono} (${formatearPrecio(item.precio * item.cantidad)})`;
      })
      .join('\n');

    let textoEntrega = 'Entrega a coordinar por WhatsApp';
    if (metodoEntrega === 'envio') textoEntrega = `Envío a domicilio ($4.000)\nDirección: ${direccionCliente}`;
       if (metodoEntrega === 'retiro') textoEntrega = 'Retiro por domicilio (Gratis · Felix de Zuñiga 4637)';
    if (metodoEntrega === 'coordinar') textoEntrega = 'Entrega a coordinar';

    const textoPago = metodoPago === 'transferencia' ? 'Transferencia' : 'Efectivo';
    const mensaje = `Hola LUMINA! Soy *${nombreCliente}*. Quiero hacer el siguiente pedido:\n\n*Productos:*\n${lineasProductos}\n\n*Subtotal:* ${formatearPrecio(subtotal)}\n*Entrega:* ${textoEntrega}\n*Forma de pago:* ${textoPago}\n*Total estimado:* ${formatearPrecio(totalFinal)}\n\nQuedo a la espera de la confirmación de stock. ¡Gracias!`;

    window.open(`https://wa.me{encodeURIComponent(mensaje)}`, '_blank', 'noopener,noreferrer');
  };
  return (
    <div className="min-h-screen flex flex-col bg-[#FDF2F4] text-[#2C2C2C] font-sans">
      <div className="bg-[#EFE8E0] text-[#5C534E] text-[11px] tracking-[0.2em] uppercase py-2 overflow-hidden border-b border-[#E5DDD3]">
        <div className="animate-marquee whitespace-nowrap">
          {Array.from({ length: 10 }).map((_, idx) => (
            <span key={idx} className="mx-6">SIN MÍNIMO DE COMPRA · ENVÍOS A DOMICILIO</span>
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-30 bg-[#FDF2F4]/95 backdrop-blur-sm border-b border-[#EDE6DD]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button onClick={() => setMenuMovilAbierto(!menuMovilAbierto)} className="sm:hidden p-2 text-[#2C2C2C]">
            {menuMovilAbierto ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <a href="#" onClick={() => seleccionarCategoria('TODAS')} className="font-serif text-2xl sm:text-3xl tracking-[0.22em] text-[#2C2C2C]">
            LUMINA
          </a>

          <nav className="hidden sm:flex items-center gap-8 text-xs tracking-[0.18em] text-[#6E655F]">
            <a href="#categorias" className="hover:text-[#2C2C2C] transition">CATEGORÍAS</a>
            <a href="#coleccion" className="hover:text-[#2C2C2C] transition">COLECCIÓN</a>
          </nav>
          <button onClick={() => setCarritoAbierto(true)} className="relative p-2 text-[#2C2C2C] hover:opacity-75 transition">
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            {totalProductos > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#C8A29E] text-white text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                {totalProductos}
              </span>
            )}
          </button>
        </div>

        {menuMovilAbierto && (
          <div className="sm:hidden bg-[#FDF2F4] border-b border-[#EDE6DD] px-5 py-4 space-y-2">
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#8C7F78] pb-1">CATÁLOGO POR CATEGORÍA</p>
            <button onClick={() => seleccionarCategoria('TODAS')} className="block w-full text-left py-2 text-xs tracking-[0.15em] uppercase text-[#2C2C2C]">
              Ver todo el catálogo
            </button>
            {CATEGORIAS.map((cat) => (
              <button key={cat.id} onClick={() => seleccionarCategoria(cat.id)} className="block w-full text-left py-2 text-xs tracking-[0.15em] uppercase border-t border-[#F0EAE2] text-[#2C2C2C]">
                {cat.nombre}
              </button>
            ))}
          </div>
        )}
      </header>

      <section className="px-4 sm:px-6 pt-6 pb-8">
        <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-[#F9ECE4] via-[#F5EFEA] to-[#EFE8F3] border border-[#EDE4DC] py-14 sm:py-24 px-6 text-center">
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#8C7F78] mb-3">COLECCIÓN ESENCIAL</p>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#2C2C2C] mb-4">Tus esenciales</h1>
          <p className="font-serif italic text-lg sm:text-xl text-[#6E655F] max-w-md mx-auto mb-8">
            Productos de belleza y cuidado para todos los días.
          </p>
          <a href="#coleccion" className="inline-block border border-[#2C2C2C] px-7 py-3 text-xs tracking-[0.2em] uppercase text-[#2C2C2C] hover:bg-[#2C2C2C] hover:text-[#FDF2F4] transition">
            VER COLECCIÓN
          </a>
        </div>
      </section>

      <section id="categorias" className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-4 text-center">
        <h2 className="font-serif text-3xl text-[#2C2C2C] mb-6">Categorías</h2>

        <div className="sm:hidden max-w-xs mx-auto mb-4 relative">
          <button
            onClick={() => setDesplegableCatMovil(!desplegableCatMovil)}
            className="w-full flex items-center justify-between px-4 py-3 bg-[#F4EFEA] border border-[#E5DDD3] rounded-xl text-xs tracking-[0.16em] uppercase text-[#2C2C2C]"
          >
            <span>{categoriaActiva === 'TODAS' ? 'Elegir categoría (Todas)' : categoriaActiva}</span>
            <ChevronDown className={`w-4 h-4 text-[#8C7F78] transition-transform ${desplegableCatMovil ? 'rotate-180' : ''}`} />
          </button>
          {desplegableCatMovil && (
            <div className="mt-1.5 bg-white border border-[#EDE6DD] rounded-xl shadow-md overflow-hidden text-left">
              <button onClick={() => seleccionarCategoria('TODAS')} className="w-full px-4 py-2.5 text-xs tracking-[0.15em] uppercase hover:bg-[#F4EFEA] border-b border-[#F5EFEA]">
                VER TODO
              </button>
              {CATEGORIAS.map((cat) => (
                <button key={cat.id} onClick={() => seleccionarCategoria(cat.id)} className="w-full px-4 py-2.5 text-xs tracking-[0.15em] uppercase hover:bg-[#F4EFEA] border-b border-[#F5EFEA]">
                  {cat.nombre}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="hidden sm:flex flex-wrap justify-center gap-3">
          <button
            onClick={() => seleccionarCategoria('TODAS')}
            className={`px-5 py-2.5 rounded-full text-xs tracking-[0.16em] uppercase transition border ${
              categoriaActiva === 'TODAS' ? 'bg-[#2C2C2C] text-white border-[#2C2C2C]' : 'bg-white text-[#6E655F] border-[#E5DDD3] hover:border-[#2C2C2C]'
            }`}
          >
            TODAS
          </button>
          {CATEGORIAS.map((cat) => {
            const Icono = cat.icono;
            return (
              <button
                key={cat.id}
                onClick={() => seleccionarCategoria(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs tracking-[0.16em] uppercase transition border ${
                  categoriaActiva === cat.id ? 'bg-[#2C2C2C] text-white border-[#2C2C2C]' : 'bg-white text-[#6E655F] border-[#E5DDD3] hover:border-[#2C2C2C]'
                }`}
              >
                <Icono className="w-3.5 h-3.5" />
                {cat.nombre}
              </button>
            );
          })}
        </div>
      </section>
      <section id="coleccion" className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 flex-1">
        <div className="text-center mb-8">
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#8C7F78] mb-2">{categoriaActiva === 'TODAS' ? 'TODOS LOS PRODUCTOS' : categoriaActiva}</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C2C2C]">Nuestra colección</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {productosFiltrados.map((producto) => {
            const tieneTonos = (producto.opciones || producto.tonos || producto.colores || []).length > 0;
            return (
              <div
                key={producto.id}
                className="bg-white rounded-2xl border border-[#EDE6DD] overflow-hidden flex flex-col shadow-sm hover:shadow-md transition"
              >
                <div
                  onClick={() => abrirDetalleProducto(producto)}
                  className="cursor-pointer group relative aspect-square bg-[#F9F6F2] overflow-hidden"
                >
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  {tieneTonos && (
                    <span className="absolute bottom-2 left-2 bg-white/90 text-[#2C2C2C] text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full border border-[#E5DDD3]">
                      Varios tonos
                    </span>
                  )}
                </div>

                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                  <div onClick={() => abrirDetalleProducto(producto)} className="cursor-pointer">
                    <p className="text-[10px] tracking-[0.15em] uppercase text-[#8C7F78] mb-1">
                      {Array.isArray(producto.categoria) ? producto.categoria.join(' · ') : producto.categoria}
                    </p>
                    <h3 className="font-serif text-base sm:text-lg text-[#2C2C2C] leading-snug mb-1">{producto.nombre}</h3>
                    <p className="font-medium text-sm sm:text-base text-[#2C2C2C] mb-3">{formatearPrecio(producto.precio)}</p>
                  </div>

                  <button
                    onClick={() => (tieneTonos ? abrirDetalleProducto(producto) : agregarAlCarrito(producto, 1, ''))}
                    className="w-full py-2.5 rounded-xl bg-[#F4EFEA] hover:bg-[#2C2C2C] text-[#2C2C2C] hover:text-white text-[11px] tracking-[0.16em] uppercase transition font-medium"
                  >
                    {tieneTonos ? 'Elegir tono' : 'Agregar'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {productoModal && (
        <div
          onClick={cerrarDetalleProducto}
          className="fixed inset-0 z-50 bg-black/75 flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FDF2F4] w-full sm:max-w-lg max-h-[92vh] rounded-t-3xl sm:rounded-3xl overflow-y-auto shadow-2xl border border-[#EDE6DD] relative flex flex-col"
          >
            <button
              onClick={cerrarDetalleProducto}
              className="absolute top-3 right-3 z-20 bg-white/90 text-[#2C2C2C] p-2.5 rounded-full shadow-md hover:bg-white transition"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full bg-white flex items-center justify-center">
              <img
                src={fotosModal[fotoActivaIdx]}
                alt={productoModal.nombre}
                className="w-full max-h-[55vh] sm:max-h-[450px] object-contain bg-white"
              />

              {fotosModal.length > 1 && (
                <>
                  <button
                    onClick={() => setFotoActivaIdx((prev) => (prev === 0 ? fotosModal.length - 1 : prev - 1))}
                    className="absolute left-3 bg-white/90 p-2 rounded-full shadow text-[#2C2C2C]"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setFotoActivaIdx((prev) => (prev === fotosModal.length - 1 ? 0 : prev + 1))}
                    className="absolute right-3 bg-white/90 p-2 rounded-full shadow text-[#2C2C2C]"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            <div className="p-5 sm:p-7 space-y-4">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#8C7F78]">
                  {Array.isArray(productoModal.categoria) ? productoModal.categoria.join(' · ') : productoModal.categoria}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#2C2C2C] mt-0.5">{productoModal.nombre}</h2>
                <p className="text-xl font-semibold text-[#2C2C2C] mt-1">{formatearPrecio(productoModal.precio)}</p>
              </div>

              {productoModal.descripcion && (
                <p className="text-sm text-[#5C534E] leading-relaxed border-t border-[#E5DDD3] pt-3">
                  {productoModal.descripcion}
                </p>
              )}

              {opcionesModal.length > 0 && (
                <div className="border-t border-[#E5DDD3] pt-4">
                  <p className="text-xs tracking-[0.15em] uppercase text-[#6E655F] mb-2.5">
                    Tono / Color: <strong className="text-[#2C2C2C]">{opcionElegida}</strong>
                  </p>
                                    <div className="flex flex-wrap gap-2">
                    {opcionesModal.map((opcion, idx) => {
                      const sinStock = (productoModal?.opcionesSinStock || []).includes(opcion);
                      return (
                        <button
                          key={idx}
                          disabled={sinStock}
                          onClick={() => !sinStock && setOpcionElegida(opcion)}
                          className={`px-3.5 py-2 rounded-xl text-xs border transition ${
                            sinStock
                              ? 'bg-[#F4EFEA] text-[#9A8F88] border-[#E5DDD3] cursor-not-allowed line-through opacity-75'
                              : opcionElegida === opcion
                              ? 'bg-[#2C2C2C] text-white border-[#2C2C2C] font-medium'
                              : 'bg-white text-[#2C2C2C] border-[#D8CFC4] hover:border-[#2C2C2C]'
                          }`}
                        >
                          {opcion} {sinStock && '(Sin stock)'}
                        </button>
                      );
                    })}
                  </div>

                </div>
              )}

              <div className="border-t border-[#E5DDD3] pt-4 flex items-center gap-3">
                <div className="flex items-center border border-[#D8CFC4] bg-white rounded-xl">
                  <button
                    onClick={() => setCantidadModal((c) => Math.max(1, c - 1))}
                    className="p-3 text-[#2C2C2C]"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 text-sm font-medium">{cantidadModal}</span>
                  <button
                    onClick={() => setCantidadModal((c) => c + 1)}
                    className="p-3 text-[#2C2C2C]"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => {
                    agregarAlCarrito(productoModal, cantidadModal, opcionElegida);
                    cerrarDetalleProducto();
                  }}
                  className="flex-1 bg-[#2C2C2C] text-white py-3.5 px-5 rounded-xl text-xs tracking-[0.18em] uppercase font-medium hover:bg-[#444] transition"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {carritoAbierto && (
        <div onClick={() => setCarritoAbierto(false)} className="fixed inset-0 z-50 bg-black/50 flex justify-end">
          <div onClick={(e) => e.stopPropagation()} className="bg-[#FAF8F5] w-full max-w-md h-full flex flex-col shadow-2xl">
                                    <div className="p-5 bg-white border-b border-[#EDE6DD] flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl text-[#3A3532]">Tu pedido</h3>
                <p className="text-xs text-[#6E655F]">{totalProductos} {totalProductos === 1 ? 'producto' : 'productos'}</p>
              </div>
              <button onClick={() => setCarritoAbierto(false)} className="p-2 text-[#5C534E] hover:text-[#2C2C2C]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {carrito.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <ShoppingBag className="w-10 h-10 text-[#C8A29E] mx-auto stroke-[1.2]" />
                  <p className="font-serif text-xl text-[#3A3532]">Tu carrito está vacío</p>
                  <p className="text-xs text-[#6E655F]">Explorá la colección y agregá tus productos favoritos.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {carrito.map((item) => (
                      <div key={item.claveUnica} className="flex gap-3 bg-white p-3.5 rounded-xl border border-[#E5DDD3]">
                        <img src={item.imagen} alt={item.nombre} className="w-16 h-16 rounded-lg object-cover bg-[#F4EFEA] shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-serif text-base text-[#3A3532] truncate">{item.nombre}</h4>
                            <button onClick={() => quitarProducto(item.claveUnica)} className="text-[10px] uppercase text-[#7A716B] hover:text-red-500 flex items-center gap-0.5 shrink-0">
                              <Trash2 className="w-3 h-3" /> QUITAR
                            </button>
                          </div>
                          {item.opcionElegida && (
                            <p className="text-xs text-[#6E655F] font-medium">Tono: {item.opcionElegida}</p>
                          )}
                          <p className="text-xs text-[#6E655F] mb-2">{formatearPrecio(item.precio)} c/u</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-[#E5DDD3] rounded-lg text-[#3A3532]">
                              <button onClick={() => cambiarCantidad(item.claveUnica, -1)} className="p-1.5"><Minus className="w-3 h-3" /></button>
                              <span className="px-2.5 text-xs font-medium">{item.cantidad}</span>
                              <button onClick={() => cambiarCantidad(item.claveUnica, 1)} className="p-1.5"><Plus className="w-3 h-3" /></button>
                            </div>
                            <span className="text-sm font-medium text-[#3A3532]">{formatearPrecio(item.precio * item.cantidad)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  
                                   <div className="bg-white p-4 rounded-xl border border-[#E5DDD3] space-y-3">
                    <p className="text-[11px] tracking-[0.18em] uppercase text-[#5C534E] font-medium">1. MÉTODO DE ENTREGA</p>
                    <div className="grid grid-cols-1 gap-2">
                      <button
                        onClick={() => setMetodoEntrega('envio')}
                        className={`p-3 rounded-xl border text-left transition flex items-start gap-2.5 ${
                          metodoEntrega === 'envio' ? 'border-[#8C7F78] bg-[#FAF8F5]' : 'border-[#EDE6DD] hover:border-[#C8A29E]'
                        }`}
                      >
                        <Truck className="w-4 h-4 text-[#C8A29E] shrink-0 mt-0.5 stroke-[1.5]" />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-[#3A3532]">Envío a domicilio</span>
                            <span className="text-xs font-semibold text-[#3A3532]">$4.000</span>
                          </div>
                          <p className="text-[11px] text-[#6E655F]">Entrega en Córdoba Capital</p>
                        </div>
                      </button>

                      <button
                        onClick={() => setMetodoEntrega('retiro')}
                        className={`p-3 rounded-xl border text-left transition flex items-start gap-2.5 ${
                          metodoEntrega === 'retiro' ? 'border-[#8C7F78] bg-[#FAF8F5]' : 'border-[#EDE6DD] hover:border-[#C8A29E]'
                        }`}
                      >
                        <MapPin className="w-4 h-4 text-[#C8A29E] shrink-0 mt-0.5 stroke-[1.5]" />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-[#3A3532]">Retiro por domicilio</span>
                            <span className="text-xs font-semibold text-[#25D366]">Gratis</span>
                          </div>
                          <p className="text-[11px] text-[#6E655F]">Felix de Zuñiga 4637 (a coordinar)</p>
                        </div>
                      </button>

                      <button
                        onClick={() => setMetodoEntrega('coordinar')}
                        className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 ${
                          metodoEntrega === 'coordinar' ? 'border-[#8C7F78] bg-[#FAF8F5]' : 'border-[#EDE6DD] hover:border-[#C8A29E]'
                        }`}
                      >
                        <svg className="w-4 h-4 text-[#C8A29E] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="9" />
                          <polyline points="12 7 12 12 15 14" />
                        </svg>
                        <span className="text-xs font-medium text-[#3A3532]">Entrega a coordinar</span>
                      </button>
                    </div>

                    {metodoEntrega === 'envio' && (
                      <input
                        type="text"
                        placeholder="Tu dirección y barrio para el envío *"
                        value={direccionCliente}
                        onChange={(e) => setDireccionCliente(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs text-[#3A3532] placeholder-[#7A716B] border border-[#E5DDD3] rounded-xl focus:outline-none focus:border-[#8C7F78]"
                      />
                    )}
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E5DDD3] space-y-3">
                    <p className="text-[11px] tracking-[0.18em] uppercase text-[#5C534E] font-medium">2. FORMA DE PAGO</p>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setMetodoPago('transferencia')}
                        className={`p-3 rounded-xl border text-left transition ${
                          metodoPago === 'transferencia' ? 'border-[#8C7F78] bg-[#FAF8F5]' : 'border-[#EDE6DD] hover:border-[#C8A29E]'
                        }`}
                      >
                        <p className="text-xs font-medium text-[#3A3532]">Transferencia</p>
                        <p className="text-[11px] text-[#6E655F]">Te pasamos el alias al confirmar</p>
                      </button>

                      <button
                        onClick={() => setMetodoPago('efectivo')}
                        className={`p-3 rounded-xl border text-left transition ${
                          metodoPago === 'efectivo' ? 'border-[#8C7F78] bg-[#FAF8F5]' : 'border-[#EDE6DD] hover:border-[#C8A29E]'
                        }`}
                      >
                        <p className="text-xs font-medium text-[#3A3532]">Efectivo</p>
                        <p className="text-[11px] text-[#6E655F]">Para retiros o entregas coordinadas</p>
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E5DDD3] space-y-3">
                    <p className="text-[11px] tracking-[0.18em] uppercase text-[#5C534E] font-medium">3. DATOS DE CONTACTO</p>
                    <input
                      type="text"
                      placeholder="Tu nombre y apellido *"
                      value={nombreCliente}
                      onChange={(e) => setNombreCliente(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs text-[#3A3532] placeholder-[#7A716B] border border-[#E5DDD3] rounded-xl focus:outline-none focus:border-[#8C7F78]"
                    />
                  </div>

                </>
              )}
            </div>
            {carrito.length > 0 && (
              <div className="p-5 bg-white border-t border-[#EDE6DD] space-y-3">
                <div className="space-y-1 text-xs text-[#5C534E]">
                  <div className="flex justify-between">
                    <span>Subtotal productos</span>
                    <span>{formatearPrecio(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Costo de envío</span>
                    <span>{metodoEntrega === 'coordinar' ? 'A coordinar' : costoEnvio === 0 ? 'Gratis' : formatearPrecio(costoEnvio)}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-1.5 border-t border-[#F0EAE2]">
                  <span className="text-xs tracking-[0.15em] uppercase text-[#5C534E] font-medium">TOTAL ESTIMADO</span>
                  <span className="font-serif text-2xl font-semibold text-[#3A3532]">{formatearPrecio(totalFinal)}</span>
                </div>
                <div className="bg-[#F4EFEA] p-2.5 rounded-lg flex items-start gap-2 text-[11px] text-[#4A433E]">
                  <Check className="w-4 h-4 text-[#C8A29E] shrink-0 mt-0.5" />
                  <span>Tu pedido quedará pendiente de confirmación. Te escribimos por WhatsApp para confirmar stock y coordinar el pago.</span>
                </div>
                {errorForm && <p className="text-xs text-red-600 font-medium">{errorForm}</p>}
                <button
                  onClick={enviarPedidoWhatsApp}
                  className="w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs tracking-[0.18em] uppercase font-semibold rounded-xl shadow-sm flex items-center justify-center gap-2 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  ENVIAR PEDIDO POR WHATSAPP
                </button>
                <p className="text-[11px] text-center text-[#6E655F]">Primero confirmamos disponibilidad, después podés transferir.</p>
              </div>
            )}

          </div>
        </div>
      )}

      <a
        href={linkWhatsAppConsulta}
        target="_blank"
        rel="noreferrer"
        aria-label="Consultar por WhatsApp"
        className="fixed bottom-5 right-5 z-30 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:scale-105 transition"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}
