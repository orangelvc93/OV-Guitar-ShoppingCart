import React, { useMemo } from "react";

const Header = ({
	cart,
	removeFromCart,
	increaseQuantity,
	reduceQuantity,
	clearCart,
}) => {
	//States Derivados
	const isEmpty = useMemo(() => cart.length === 0, [cart]);
	const totalPrice = useMemo(() =>
		cart.reduce((total, item) => total + item.quantity * item.price, 0)
	);

	return (
		<header className="header">
			<div className="container-header">
				<img
					className="img-logo"
					src="./img/logo.svg"
					alt="Imagen Logo"
				/>
				<div className="container-cart">
					<img
						className="icon-cart"
						src="./img/carrito.png"
						alt="Carrito de compras"
					/>
					<div className="cart-table">
						{isEmpty ? (
							<p className="table-empty">El carrito está vacío</p>
						) : (
							<>
								<table>
									<thead className="table-head">
										<tr>
											<th>Imagen</th>
											<th>Nombre</th>
											<th>Precio</th>
											<th>Cantidad</th>
											<th className="space"></th>
										</tr>
									</thead>
									<tbody>
										{cart.map((guitar) => (
											<tr
												key={guitar.id}
												className="table-body"
											>
												<td>
													<img
														src={`./img/${guitar.image}.jpg`}
														alt="imagen guitarra"
													/>
												</td>
												<td>{guitar.name}</td>
												<td>$ {guitar.price}</td>
												<td>
													<button
														className="btn-dark btn-ctd"
														onClick={() => reduceQuantity(guitar.id)}
													>
														-
													</button>
													{guitar.quantity}
													<button
														className="btn-dark btn-ctd"
														onClick={() => increaseQuantity(guitar.id)}
													>
														+
													</button>
												</td>
												<td>
													<button
														className="btn-delete"
														onClick={() => removeFromCart(guitar.id)}
													>
														x
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
								<p>
									Total a pagar: <span className="total">$ {totalPrice}</span>
								</p>
							</>
						)}

						<button
							className="btn-dark btn-vaciar"
							onClick={clearCart}
						>
							Vaciar Carrito
						</button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
