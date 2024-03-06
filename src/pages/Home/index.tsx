import { useState } from "react";
import LayoutPadrao from "../../components/LayoutPadrao";
import HomeView from "../../view/home";

const Home = () => {

  const [childData, setChildData] = useState(false);

  const handleChildData = (value:any) => {
    setChildData(value)
  };
  
  return (
    <LayoutPadrao onDataFromChild={handleChildData}>
      <HomeView createSucess={childData}/>
    </LayoutPadrao>
  );
};

export default Home;
