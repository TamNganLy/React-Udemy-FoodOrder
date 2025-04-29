import logo from "../assets/logo.jpg";

export default function Header() {
  return (
    <div id="main-header">
      <div id="title">
        <img src={logo} alt="logo" />
        <h1>REACTFOOD</h1>
      </div>
      <button className="text-button">Cart</button>
    </div>
  );
}
