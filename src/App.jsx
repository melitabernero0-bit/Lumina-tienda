import React, { useState } from 'react';
import { ShoppingBag, Eye, Smile, Sparkles, Brush, Heart, X, Plus, Minus, Trash2, Check, MessageCircle, MapPin, Truck, Calendar, ChevronDown, Menu } from 'lucide-react';
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
const productosFiltrados = categoriaActiva === 'TODAS' ? PRODUCTOS_INICIALES : PRODUCTOS_INICIALES.filter((p) => p.categoria === categoriaActiva);
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
const formatearPrecio = (valor) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(valor);
const enviarPedidoWhatsApp = () => {
if (!nombreCliente.trim()) { setErrorForm('Por favor, ingresá tu nombre y apellido.'); return; }
if (metodoEntrega === 'envio' && !direccionCliente.trim()) { setErrorForm('Por favor, ingresá tu dirección y barrio para el envío.'); return; }
setErrorForm('');
const lineasProductos = carrito.map((item) => • ${item.cantidad}x ${item.nombre} (${formatearPrecio(item.precio * item.cantidad)})).join('\n');
let textoEntrega = 'Entrega a coordinar por WhatsApp';
if (metodoEntrega === 'envio') textoEntrega = Envío a domicilio ($4.000)\nDirección: ${direccionCliente};
if (metodoEntrega === 'retiro') textoEntrega = 'Retiro por domicilio (Gratis · Felix de Zuñiga 4637)';
const textoPago = metodoPago === 'transferencia' ? 'Transferencia' : 'Efectivo';
const mensaje = Hola LUMINA! Quiero hacer el siguiente pedido:\n\n*Cliente:* ${nombreCliente}\n\n*Productos:*\n${lineasProductos}\n\n*Entrega:* ${textoEntrega}\n*Forma de pago:* ${textoPago}\n*Total estimado:* ${formatearPrecio(totalFinal)}\n\nQuedo a la espera de la confirmación de stock. Gracias!;
window.open(https://wa.me{WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}, '_blank');
};
const linkWhatsAppConsulta = https://wa.me{WHATSAPP_NUMERO}?text=${encodeURIComponent('Hola Lumina! Quiero más información sobre sus productos.')};
return (



{Array.from({ length: 10 }).map((_, idx) => (
SIN MÍNIMO DE COMPRA · ENVÍOS A DOMICILIO
))}

<button onClick={() => setMenuMovilAbierto(!menuMovilAbierto)} className="sm:hidden p-2 text-[#2C2C2C]">
{menuMovilAbierto ?  : }

<a href="#" onClick={() => seleccionarCategoria('TODAS')} className="font-serif text-2xl sm:text-3xl tracking-[0.22em] text-[#2C2C2C]">LUMINA

CATEGORÍAS
COLECCIÓN

<button onClick={() => setCarritoAbierto(true)} className="relative p-2 text-[#2C2C2C] hover:opacity-75 transition">

{totalProductos > 0 && {totalProductos}}


{menuMovilAbierto && (

CATÁLOGO POR CATEGORÍA
<button onClick={() => seleccionarCategoria('TODAS')} className="block w-full text-left py-2 text-xs tracking-[0.15em] uppercase text-[#2C2C2C]">Ver todo el catálogo
{CATEGORIAS.map((cat) => (
<button key={cat.id} onClick={() => seleccionarCategoria(cat.id)} className="block w-full text-left py-2 text-xs tracking-[0.15em] uppercase border-t border-[#F0EAE2] text-[#2C2C2C]">{cat.nombre}
))}

)}
COLECCIÓN ESENCIAL
Tus esenciales
Productos de belleza y cuidado para todos los días.
VER COLECCIÓN
Categorías

<button onClick={() => setDesplegableCatMovil(!desplegableCatMovil)} className="w-full flex items-center justify-between px-4 py-3 bg-[#F4EFEA] border border-[#E5DDD3] rounded-xl text-xs tracking-[0.16em] uppercase text-[#2C2C2C]">
{categoriaActiva === 'TODAS' ? 'Elegir categoría (Todas)' : categoriaActiva}
<ChevronDown className={w-4 h-4 text-[#8C7F78] transition-transform ${desplegableCatMovil ? 'rotate-180' : ''}} />

{desplegableCatMovil && (

<button onClick={() => seleccionarCategoria('TODAS')} className="w-full px-4 py-2.5 text-xs tracking-[0.15em] uppercase hover:bg-[#F4EFEA] border-b border-[#F5EFEA]">VER TODO
{CATEGORIAS.map((cat) => (
<button key={cat.id} onClick={() => seleccionarCategoria(cat.id)} className="w-full px-4 py-2.5 text-xs tracking-[0.15em] uppercase hover:bg-[#F4EFEA] border-b border-[#F5EFEA] last:border-none">{cat.nombre}
))}

)}


{CATEGORIAS.map((cat) => {
const Icono = cat.icono;
const activa = categoriaActiva === cat.id;
return (
<button key={cat.id} onClick={() => seleccionarCategoria(cat.id)} className="group flex flex-col items-center gap-2.5">
<div className={w-20 h-20 rounded-full flex items-center justify-center transition border ${activa ? 'bg-[#C8A29E] text-white border-[#C8A29E]' : 'bg-[#F4EFEA] text-[#5C534E] border-[#E8DFD5] group-hover:border-[#C8A29E]'}}>


<span className={text-[11px] tracking-[0.15em] uppercase ${activa ? 'font-semibold text-[#2C2C2C]' : 'text-[#6E655F]'}}>{cat.nombre}

);
})}


<button onClick={() => seleccionarCategoria('TODAS')} className="text-[11px] tracking-[0.2em] uppercase text-[#6E655F] border-b border-[#C8A29E] pb-1 hover:text-[#2C2C2C]">VER TODO
{categoriaActiva === 'TODAS' ? 'TODOS LOS PRODUCTOS' : categoriaActiva}
Nuestra colección


{productosFiltrados.map((producto) => (






{producto.categoria}
{producto.nombre}
{producto.descripcion && {producto.descripcion}}



{formatearPrecio(producto.precio)}
<button onClick={() => agregarAlCarrito(producto)} className="w-full py-2 px-3 bg-[#F4EFEA] hover:bg-[#C8A29E] text-[#2C2C2C] hover:text-white text-[11px] tracking-[0.15em] uppercase rounded-lg transition font-medium">Agregar


))}
© {new Date().getFullYear()} LUMINA · Córdoba, Argentina
{carritoAbierto && (

<div className="fixed inset-0 bg-black/30 backdrop-blur-[1px]" onClick={() => setCarritoAbierto(false)} />



Tu carrito
PEDIDO POR WHATSAPP

<button onClick={() => setCarritoAbierto(false)} className="p-2 text-[#6E655F]">


{carrito.length === 0 ? (


Tu carrito está vacío

) : (
<>

{carrito.map((item) => (




{item.nombre}
<button onClick={() => quitarProducto(item.id)} className="text-[10px] uppercase text-[#9A8F88] hover:text-red-500 flex items-center gap-0.5"> QUITAR

{formatearPrecio(item.precio)} c/u


<button onClick={() => cambiarCantidad(item.id, -1)} className="p-1.5">
{item.cantidad}
<button onClick={() => cambiarCantidad(item.id, 1)} className="p-1.5">

{formatearPrecio(item.precio * item.cantidad)}



))}


ELEGÍ CÓMO RECIBIR TU PEDIDO

<button type="button" onClick={() => setMetodoEntrega('envio')} className={w-full text-left p-3.5 rounded-xl border ${metodoEntrega === 'envio' ? 'bg-[#F4EFEA] border-[#C8A29E]' : 'bg-white border-[#EDE6DD]'}}>
 Envío a domicilio$4.000
Dentro del anillo de circunvalación · Coordinar día y horario por WhatsApp

<button type="button" onClick={() => setMetodoEntrega('retiro')} className={w-full text-left p-3.5 rounded-xl border ${metodoEntrega === 'retiro' ? 'bg-[#F4EFEA] border-[#C8A29E]' : 'bg-white border-[#EDE6DD]'}}>
 Retiro por domicilioGratis
Felix de Zuñiga 4637

<button type="button" onClick={() => setMetodoEntrega('coordinar')} className={w-full text-left p-3.5 rounded-xl border ${metodoEntrega === 'coordinar' ? 'bg-[#F4EFEA] border-[#C8A29E]' : 'bg-white border-[#EDE6DD]'}}>
 Entrega a coordinarA convenir
Consultanos por WhatsApp para coordinar la entrega




TUS DATOS
<input type="text" placeholder="Nombre y Apellido *" value={nombreCliente} onChange={(e) => setNombreCliente(e.target.value)} className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E5DDD3] rounded-xl" />
{metodoEntrega === 'envio' && <input type="text" placeholder="Dirección y Barrio (calle, altura, piso/depto) *" value={direccionCliente} onChange={(e) => setDireccionCliente(e.target.value)} className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E5DDD3] rounded-xl" />}


ELEGÍ CÓMO PAGAR

<button type="button" onClick={() => setMetodoPago('transferencia')} className={p-3 rounded-xl border text-left ${metodoPago === 'transferencia' ? 'bg-[#F4EFEA] border-[#C8A29E]' : 'bg-white border-[#EDE6DD]'}}>
Transferencia
Luego de confirmar el stock

<button type="button" onClick={() => setMetodoPago('efectivo')} className={p-3 rounded-xl border text-left ${metodoPago === 'efectivo' ? 'bg-[#F4EFEA] border-[#C8A29E]' : 'bg-white border-[#EDE6DD]'}}>
Efectivo
Para retiros o entregas coordinadas



</>
)}

{carrito.length > 0 && (


TOTAL ESTIMADO
{formatearPrecio(totalFinal)}



Tu pedido quedará pendiente de confirmación. Te escribimos por WhatsApp para confirmar stock y coordinar el pago.

{errorForm && {errorForm}}
ENVIAR PEDIDO POR WHATSAPP
Primero confirmamos disponibilidad, después podés transferir.

)}


)}

);
}
