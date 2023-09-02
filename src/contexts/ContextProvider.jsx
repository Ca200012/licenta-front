import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
  checkoutStarted: false,
  setCheckoutStarted: () => {},
  orderConfirmed: false,
  setOrderConfirmed: () => {},
  selectedAddress: null,
  setSelectedAddress: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [checkoutStarted, setCheckoutStarted] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
        checkoutStarted,
        setCheckoutStarted,
        orderConfirmed,
        setOrderConfirmed,
        selectedAddress,
        setSelectedAddress,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
