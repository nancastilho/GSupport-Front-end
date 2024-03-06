import LayoutPadrao from "../../components/LayoutPadrao";
import AlertView from "../../view/alerts";

const Alerts = () => {

  return (
    <LayoutPadrao onDataFromChild={() => ''}>
      <AlertView />
    </LayoutPadrao>
  );
};

export default Alerts;
