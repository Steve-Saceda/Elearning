import "../../css/navbar.css"


export default function Navbar() {

  return (
    <div className="navigation-bar">
      <div className="nav">
        <ul>
          <li id="logo">
            <a href="/#">
              <span>Math</span>
              <span id="red-span">Flix</span>
            </a>
          </li>
          <li className="nav-link">
          </li>
          <li className="nav-link nav-link-right">
            <a href="/#">Home</a>
          </li>
          <li className="nav-link nav-link-right">
            <a href="/#">Features</a>
          </li>
          <li className="nav-link nav-link-right">
            <a href="/#">Contact Us</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
