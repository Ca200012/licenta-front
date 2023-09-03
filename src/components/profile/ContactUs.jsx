import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ContactUs() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/contactus");
  }, []);

  return <div>ContactUs</div>;
}

export default ContactUs;
