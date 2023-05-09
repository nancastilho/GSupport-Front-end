export interface FormValues {
  Codigo?: number | undefined;
  Usuario?: string;
  CodUsuario?: number;
  CodEmpresa?: number;
  NomeFantasia?: string;
  NomeCliente?: string;
  Problema?: string;
  Solucao?: string;
  CodSistema?: number;
  CodMeioComunicacao?: number;
  DataCriacao?: string;
  DataInicio?: string;
  DataFim?: string;
  HoraInicio?: string;
  HoraFim?: string;
  Assunto?: string;
  Imagens?: [];
  Plantao?: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  limit?: number;
}
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export interface Credentials {
  Usuario: string;
  Senha: string;
}

export interface Empresa {
  Codigo: string;
  NomeFantasia: string;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface LogoutProps {
  handleLogout: () => void;
}

export interface OnCadastroProps {
  onCadastro: boolean;
}
