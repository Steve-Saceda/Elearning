import Navbar from "../global/Navbar";
import Nav from "../index/nav";
import "../../css/auth/auth.css";
import Auth from "./Auth";
export default function Authentication() {
  return (
    <div className="container-auth">
      <Nav display="none" margin="41%"/>
      <Auth isRegistered />
    </div>
  );
}
