import LayoutPadrao from "../../components/LayoutPadrao";
import AdminView from "../../view/admin";


const Admin = () => {

    return (
        <LayoutPadrao onDataFromChild={() => ''}>
            <AdminView />
        </LayoutPadrao>
    );
};

export default Admin;
