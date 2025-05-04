import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearCart: () => {},
});

function shoppingCartReducer(state, action) {
  if(action.type === 'ADD_ITEM') {
    const updateItems = [...state.items];

    const existingCartItemIndex = updateItems.findIndex(
      (cartItem) => cartItem.id === action.item.id
    )

    const existingCartItem = updateItems[existingCartItemIndex];

    if (existingCartItem) {
      const updateItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updateItems[existingCartItemIndex] = updateItem;
    } else {
      updateItems.push({...action.item, quantity: 1})
    }

    return {
      ...state,
      items: updateItems,
    };
  }

  if(action.type === 'REMOVE_ITEM') {
    const updateItems = [...state.items];

    const existingCartItemIndex = updateItems.findIndex(
      (cartItem) => cartItem.id === action.item.id
    )

    const existingCartItem = updateItems[existingCartItemIndex];

    if (existingCartItem.quantity === 1) {
      updateItems.splice(existingCartItemIndex, 1);
    } else {
      const updateItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updateItems[existingCartItemIndex] = updateItem;
    }

    return {
      ...state,
      items: updateItems,
    };
  }

  if(action.type === 'CLEAR') {
    return {
      ...state,
      items: [],
    }
  }

  return state;
}

export default function CartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    }
  );

  function handleAddItemToCart(item) {
    shoppingCartDispatch({
      type: 'ADD_ITEM',
      item: item
    })
  }

  function handleRemoveItemFromCart(item) {
    shoppingCartDispatch({
      type: 'REMOVE_ITEM',
      item: item
    })
  }

  function handleClearCart() {
    shoppingCartDispatch({
      type: 'CLEAR'
    })
  }

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    removeItemFromCart: handleRemoveItemFromCart,
    clearCart: handleClearCart,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
