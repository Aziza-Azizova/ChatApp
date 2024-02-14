import Home from "./components/Home";
import ContextProvider from "./context/Context";
import './assets/style.scss';
import Chat from "./components/Chat";

export default function App() {
  return (
    <ContextProvider>
      <Home />
    </ContextProvider>
  )
}

