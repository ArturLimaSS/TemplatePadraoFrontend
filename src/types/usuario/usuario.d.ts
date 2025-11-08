export interface UsuarioType {
  id?: number | string | null;
  name: string;
  email: string;
  password?: string;
  usuario_tipo_id?: number | string | null;

}