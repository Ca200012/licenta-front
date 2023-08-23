import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

const Checkout = () => {
	const { checkoutStarted } = useStateContext();
	const navigate = useNavigate();
	console.log(checkoutStarted);
	if (!checkoutStarted) {
		navigate("/cart");
		return null;
	}

	return <div>caca</div>;
};

export default Checkout;
