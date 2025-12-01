export interface PermissaoState {
  isPermissaoLoading: boolean;
  lista_permissao: PermissaoType[];
  listarPermissao: () => Promise<any>;
}

export interface PermissaoType {
  id?: string;
  nome?: string;
  modulo_id?: string;
  permissao_critica?: boolean | string | number;
  ativo?: string;
}
