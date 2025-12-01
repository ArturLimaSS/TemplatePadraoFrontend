import type { ModuloType } from 'src/store/Inquilino/inquilino-store';

export interface InquilinoType {
  id?: number | string;
  nome?: string;
  cnpj?: string | number;
  telefone?: string | number;
  email?: string;
  cep?: string | number;
  rua?: string | number;
  numero?: string | number;
  bairro?: string | number;
  cidade?: string | number;
  uf?: string | number;
  pais?: string | number;
  ativo: number | string | bool;
}

export interface ModulosType {
  id: number | string;
  nome: string;
  cor: string;
  prefixo: string;
  ativo: boolean | number | string;
}

export interface UsuarioModuloType {
  id?: number;
  usuario_id?: number;
  modulo_id?: number;
  inquilino_id?: number;
  ativo?: number;
  created_at?: string;
  updated_at?: string;
  modulo: ModulosType;
}
