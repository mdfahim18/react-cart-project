const reducer = (state: any, action: any) => {
  if (action.type === 'LOADING') {
    return { ...state, loading: true };
  }
  if (action.type === 'CLEAR') {
    return { ...state, cart: [] };
  }
  if (action.type === 'REMOVE') {
    return {
      ...state,
      cart: state.cart.filter(
        (cartItem: any) => cartItem.id !== action.payload
      ),
    };
  }
  if (action.type === 'DISPLAY_ITEM') {
    return { ...state, cart: action.payload, loading: false };
  }
  if (action.type === 'INCREASE') {
    let tempCart = state.cart.map((cartItem: any) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === 'DECREASE') {
    let tempCart = state.cart
      .map((cartItem: any) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      })
      .filter((cartItem: any) => cartItem.amount !== 0);
    return { ...state, cart: tempCart };
  }
  if (action.type === 'GET_TOTALS') {
    let { total, amount } = state.cart.reduce(
      (cartTotal: any, cartItem: any) => {
        const { price, amount } = cartItem;
        const totalItem = price * amount;

        (cartTotal.total += totalItem), (cartTotal.amount += amount);
        return cartTotal;
      },
      { total: 0, amount: 0 }
    );

    total = parseFloat(total).toFixed(2);
    return { ...state, total, amount };
  }

  throw new Error('no matching action type');
};

export default reducer;
