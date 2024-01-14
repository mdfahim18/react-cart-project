import React, { useContext, useReducer, useEffect } from 'react';
import reducer from './reducer';
import cartItem from './data';

const url = 'https://course-api.com/react-useReducer-cart-project';
const AppContext = React.createContext({});

const intialState = {
  loading: false,
  cart: cartItem,
  amount: 0,
  total: 0,
};

const AppProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, intialState);

  const clearCart = () => {
    dispatch({ type: 'CLEAR' });
  };

  const remove = (id: any) => {
    dispatch({ type: 'REMOVE', payload: id });
  };
  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({ type: 'DISPLAY_ITEM', payload: cart });
  };

  const increase = (id: any) => {
    dispatch({ type: 'INCREASE', payload: id });
  };
  const decrease = (id: any) => {
    dispatch({ type: 'DECREASE', payload: id });
  };
  const toggleAmount = (id: any, type: any) => {
    dispatch({ type: 'TOGGLE_AMOUNT', payload: { id, type } });
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' });
  }, [state.cart]);
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext<any>(AppContext);
};
export { AppContext, AppProvider };
