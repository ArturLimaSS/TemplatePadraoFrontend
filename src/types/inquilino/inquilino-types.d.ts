export interface InquilinoType {
  "id"?: number | string;
  "nome"?: string;
  "cnpj"?: string | number;
  "telefone"?: string | number;
  "email"?: string;
  "cep"?: string | number;
  "rua"?: string | number;
  "numero"?: string | number;
  "bairro"?: string | number;
  "cidade"?: string | number;
  "uf"?: string | number;
  "pais"?: string | number;
  "ativo": number | string | bool;

}

export interface ModulosType {
  id?: number;
  nome?: string;
  prefixo?: string;
  ativo?: number;
  created_at?: string | null;
  updated_at?: string | null;
}


export interface UsuarioModuloType {
  id?: number;
  usuario_id?: number;
  modulo_id?: number;
  inquilino_id?: number;
  ativo?: number;
  created_at?: string;
  updated_at?: string;
  modulo?: ModulosType;
}
