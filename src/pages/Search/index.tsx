import LayoutPadrao from "../../components/LayoutPadrao";
import SearchView from "../../view/search";

const Search = () => {
  return (
    <LayoutPadrao onDataFromChild={() => ''}>
      <SearchView />
    </LayoutPadrao>
  );
};

export default Search;
