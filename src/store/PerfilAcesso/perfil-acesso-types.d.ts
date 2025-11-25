import type { PermissaoType } from "../Permissao/permissao-type";

export interface PerfilAcessoState {
  isPerfilAcessoLoading: boolean;
  lista_perfil_acesso: PerfilAcessoType[];
  listarPerfilAcesso: () => Promise<void | any>;
  cadastrarPerfilAcesso: (payload: PerfilAcessoType) => Promise<void | any>;
  atualizarPerfilAcesso: (payload: PerfilAcessoType) => Promise<void | any>;
  excluirPerfilAcesso: (payload: PerfilAcessoType) => Promise<void | any>;
}

export interface PermissaoAcessoItemType {
  id: string;
  nome: string;
  habilitado: string | number | boolean;
}


export type PrefixoModulo =
  | "crm"
  | "comercial"
  | "financeiro"
  | "estoque"
  | "producao";


export interface PerfilAcessoType {
  id?: string | number;
  nome?: string;
  crm?: string[];
  comercial?: string[];
  financeiro?: string[];
  estoque?: string[];
  producao?: string[];
  inquilino_id?: string;
  ativo?: boolean | string;
}
