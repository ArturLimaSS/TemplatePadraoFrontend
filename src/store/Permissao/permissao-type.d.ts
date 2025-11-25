
export interface PermissaoState {
  isPermissaoLoading: boolean;
  lista_permissao: PermissaoType[];
  listarPermissao: () => Promise<any>;
}

export interface PermissaoType {
  id?: string;
  nome?: string;
  modulo_id?: string;
  ativo?: string;
}