import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { db } from "./data/db";
import Producto from "./components/Producto";

function App() {
	// Declaración de States
	const [data, setData] = useState([]);
	const [cart, setCart] = useState(
		localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
	);

	const MAX_ITEMS = 5;
	const MIN_ITEMS = 1;

	//Guardo el contenido de la DB
	useEffect(() => {
		setData(db);
	}, []);

	//Guardar en LS
	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

	// FUNCIONES ================================================
	//Agrega al carrito
	function addTocart(item) {
		const itemExist = cart.findIndex((guitar) => guitar.id === item.id);
		if (itemExist >= 0) {
			if (item.quantity >= MAX_ITEMS) return;
			// El item existe
			const updateCart = [...cart];
			updateCart[itemExist].quantity++;
			setCart(updateCart);
		} else {
			//El item no existe
			//Agrego el producto al carrito
			item.quantity = 1;
			setCart([...cart, item]);
		}
	}

	//Eliminando elemento del carrito
	function removeFromCart(id) {
		/* console.log("eliminando elemento", id); */
		setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
	}

	//Aumentando producto
	function increaseQuantity(id) {
		/* console.log("Agregando cantidad", id); */
		const updateItem = cart.map((item) => {
			if (item.id === id && item.quantity < MAX_ITEMS) {
				return {
					...item,
					quantity: item.quantity + 1,
				};
			}
			return item;
		});
		setCart(updateItem);
	}

	//Reducir la cantidad
	function reduceQuantity(id) {
		/* console.log("Reduciendo cantidad", id); */
		const updateItem = cart.map((item) => {
			if (item.id === id && item.quantity > MIN_ITEMS) {
				return {
					...item,
					quantity: item.quantity - 1,
				};
			}
			return item;
		});
		setCart(updateItem);
	}

	//Vaciar carrito
	function clearCart() {
		setCart([]);
	}

	return (
		<>
			<Header
				cart={cart}
				removeFromCart={removeFromCart}
				increaseQuantity={increaseQuantity}
				reduceQuantity={reduceQuantity}
				clearCart={clearCart}
			/>

			<main>
				<h1>Nuestra Colección</h1>

				<section className="products-gallery">
					{data.map((guitar) => (
						<Producto
							key={guitar.id}
							guitar={guitar}
							addTocart={addTocart}
						/>
					))}
				</section>
			</main>
			<Footer />
		</>
	);
}

export default App;
