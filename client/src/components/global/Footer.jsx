//import "../../public/css/footer.css";
import "../../css/footer.css"
import { FaFacebookSquare, FaTwitter, FaInstagramSquare } from "react-icons/fa";
export default function Footer() {
  return (
    <div className="container-footer">
      <div className="footer">
        <div className="socmed">
          <li>
            <FaFacebookSquare size={35} />
          </li>
          <li>
            <FaTwitter size={35} />
          </li>
          <li>
            <FaInstagramSquare size={35} />
          </li>
        </div>
      </div>
      <center><p>© Copyright 2022 Team IDK</p></center>
    </div>
  );
}
