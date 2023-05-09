import LayoutPadrao from "../../components/LayoutPadrao";
import SearchView from "../../view/search";

export interface Lista {
  Codigo: number;
  CodUsuario: number;
  Usuario: string;
  NomeFantasia: string;
  NomeCliente: string;
  DataCriacao: string;
  Problema: string;
  Solucao: string;
  Imagens: [];
}
const Search = () => {
  
  return (
    <LayoutPadrao>
      <SearchView/>
    </LayoutPadrao>
  );
};

export default Search;
