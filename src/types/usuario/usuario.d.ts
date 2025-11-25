import type { PerfilAcessoType } from "src/store/PerfilAcesso/perfil-acesso-types";

export interface UsuarioType {
  id?: number | string | null;
  name: string;
  email: string;
  password?: string;
  usuario_tipo_id?: number | string | null;
  inquilino_usuario?: InquilinoUsuarioType;

}

export interface InquilinoUsuarioType {
  id?: string | number;
  inquilino_id?: string | number;
  usuario_id?: string | number;
  telefone?: number | string;
  matricula?: number | string;
  perfil_acesso?: PerfilAcessoType
}


