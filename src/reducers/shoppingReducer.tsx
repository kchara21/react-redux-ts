import { createSlice } from "@reduxjs/toolkit";

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState: {
    products: [
      { id: 1, name: "Producto 1", price: 100 },
      { id: 2, name: "Producto 2", price: 200 },
      { id: 3, name: "Producto 3", price: 300 },
      { id: 4, name: "Producto 4", price: 400 },
      { id: 5, name: "Producto 5", price: 500 },
      { id: 6, name: "Producto 6", price: 600 },
    ],
    cart: [],
  },
  reducers: {
    
    addToShoppingCart: (state: any, action: any) => {
      let newItem = state.products.find(
        // Crear item en caso de que exista entre el inventario existente.
        (product: any) => product.id === action.payload
      );

      let itemInCart = state.cart.find((item: any) => item.id === newItem.id); // Si el item agregado ya habia sido agregado antes devuelve el item.

      return itemInCart
        ? {
            ...state,
            cart: state.cart.map((item: any) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }
        : { ...state, cart: [...state.cart, { ...newItem, quantity: 1 }] };
    },

    deleteOneFromShoppingCart: (state: any, action: any) => {
      let itemToDelete = state.cart.find(
        (item: any) => item.id === action.payload
      );
      return itemToDelete.quantity > 1
        ? {
            ...state,
            cart: state.cart.map((item: any) =>
              item.id === action.payload
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: state.cart.filter((item: any) => item.id !== action.payload),
          };
    },

    deleteAllFromShoppingCart: (state: any, action: any) => {
      return {
        ...state,
        cart: state.cart.filter((item: any) => item.id !== action.payload),
      };
    },

    clearShoppingCart: (state: any) => {
      return {
        ...state,
        cart: [],
      };
    },

    default: (state: any) => {
      state.value = state;
    },
  },
});

export const {
  addToShoppingCart,
  deleteOneFromShoppingCart,
  deleteAllFromShoppingCart,
  clearShoppingCart,
} = shoppingCartSlice.actions;

export const selectShoppingCart = (state: any) => state.shoppingCart;
export default shoppingCartSlice.reducer;
