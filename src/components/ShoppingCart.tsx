import React, { useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  addToShoppingCart,
  clearShoppingCart,
  deleteAllFromShoppingCart,
  deleteOneFromShoppingCart,
  selectShoppingCart
} from "../reducers/shoppingReducer";

import CarItem from "./CarItem";
import ProductItem from "./ProductItem";

// import {
//   shoppingReducer,
//   shoppingInitialState,
// } from "../reducers/shoppingReducer";

const ShoppingCart = () => {
  // const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);

  const { products, cart } = useSelector(selectShoppingCart);
  const dispatch = useDispatch();


  return (
    <div>
      <h2>Carrito de Compras</h2>
      <h3>Productos</h3>
      <article className="box grid-responsive">
        {products.map((product: any) => (
          <ProductItem
            key={product.id}
            data={product}
            addToCart={() => dispatch(addToShoppingCart(product.id))}
          />
        ))}
      </article>
      <h3>Carrito</h3>
      <article className="box"></article>
      <button onClick={() => dispatch(clearShoppingCart())}>
        Limpiar Carrito
      </button>
      {cart.map((item: any, index: number) => (
        <CarItem
          key={index}
          data={item}
          deleteOneFromCart={() => dispatch(deleteOneFromShoppingCart(item.id))}
          deleteAllFromCart={() => dispatch(deleteAllFromShoppingCart(item.id))}
        />
      ))}
    </div>
  );
};

export default ShoppingCart;
