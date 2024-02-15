import Home from "./components/Home";
import ContextProvider from "./context/Context";
import './assets/style.scss';
import SendImg from "./components/SendImg";

export default function App() {
  return (
    <ContextProvider>
      <Home />
      <SendImg />
    </ContextProvider>
  )
}

