import React from "react";

const Producto = ({ guitar, addTocart }) => {
	const { id, name, image, description, price } = guitar;
	return (
		<div className="container-product">
			<img
				className="guitarra"
				src={`./img/${image}.jpg`}
				alt="Guitarra"
			/>
			<div className="product-contain">
				<h2>{name}</h2>
				<p className="text">{description}</p>
				<p className="price">$ {price}</p>
				<button
					className="btn-dark btn-vaciar"
					onClick={() => addTocart(guitar)}
				>
					Agregar al carrito
				</button>
			</div>
		</div>
	);
};

export default Producto;
