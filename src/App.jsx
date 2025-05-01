import Header from "./component/Header";
import Menu from "./component/Menu";
import CartContextProvider from "./store/cart-context";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Menu />
    </CartContextProvider>
  );
}

export default App;
