import './index.css';
import 'tailwindcss/tailwind.css';
import Card from './componentes/card';
import Navbar from './componentes/navbar';


function App() {

  return (
      
      <div className="flex">
        <Navbar />
        <div className="flex-grow p-4">
        <Card />
        </div>
      </div>

  )
}

export default App;
