import "./index.css";
import "tailwindcss/tailwind.css";
import RoutesApp from "./routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <RoutesApp />
    </div>
  );
}

export default App;
