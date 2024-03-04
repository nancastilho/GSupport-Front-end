import { useState } from "react";
import LayoutPadrao from "../../components/LayoutPadrao";
import HomeView from "../../view/home";

const Home = () => {

  const [childData, setChildData] = useState(false);

  // Callback que será passado para o componente filho
  const handleChildData = (teste:any) => {
    setChildData(teste)
  };
  
  return (
    <LayoutPadrao onDataFromChild={handleChildData}>
      <HomeView createSucess={childData}/>
    </LayoutPadrao>
  );
};

export default Home;
