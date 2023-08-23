import { createContext, useContext, useState } from "react";

const StateContext = createContext({
	user: null,
	token: null,
	setUser: () => {},
	setToken: () => {},
	checkoutStarted: false,
	setCheckoutStarted: () => {},
});

export const ContextProvider = ({ children }) => {
	const [user, setUser] = useState({});
	const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
	const [checkoutStarted, setCheckoutStarted] = useState(false);

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
			}}
		>
			{children}
		</StateContext.Provider>
	);
};

export const useStateContext = () => useContext(StateContext);
