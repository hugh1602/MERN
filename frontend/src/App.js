import "./App.css";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Chats from "./pages/Chats";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// toast.configure();

function App() {
  return (
    <div className="App">
      <Route path="/" component={Home} exact />
      {/* <ToastContainer /> */}
      <Route path="/chats" component={Chats} />
    </div>
  );
}

export default App;
