import { api } from "src/constants/endpoints";
import type { UsuarioType } from "src/types/usuario/usuario";
import { ReturnError } from "src/utils/functions";
import { create } from "zustand";
import type { ModuloType } from "../Inquilino/inquilino-store";

interface AtualizarModulosUsuarioPayload {
  usuario_id?: number | string | null;
  modulo_id: string;
  value: boolean | string;
}
interface UsuarioState {
  isUsuarioLoading: boolean;
  lista_usuario: UsuarioType[];
  lista_modulos_usuario: ModuloType[];
  lista_usuario_tipo: any[] | null | [];
  listarUsuario: () => Promise<void | any>;
  listarUsuarioTipo: () => Promise<void | any>;
  cadastrarUsuario: (payload: UsuarioType) => Promise<void | any>;
  atualizarUsuario: (payload: UsuarioType) => Promise<void | any>;
  excluirUsuario: (payload: UsuarioType) => Promise<void | any>;
  listarModulosUsuario: (payload: UsuarioType) => Promise<void | any>;
  atualizarModulosUsuario: (payload: AtualizarModulosUsuarioPayload) => Promise<void | any>;
}

export const useUsuarioStore = create<UsuarioState>((set, _) => ({
  isUsuarioLoading: false,
  lista_usuario: [],
  lista_usuario_tipo: [],
  lista_modulos_usuario: [],
  listarUsuario: async () => {
    try {
      const response = await api.get("/v1/usuario/listar");
      set({ isUsuarioLoading: false, lista_usuario: response.data.data.lista_usuario })
      return response
    } catch (error) {
      set({ isUsuarioLoading: false })
      return ReturnError(error)
    }
  },
  listarUsuarioTipo: async () => {
    try {
      const response = await api.get("/v1/usuario/listar-usuario-tipo");
      set({ isUsuarioLoading: false, lista_usuario_tipo: response.data.data.lista_usuario_tipo })
      return response
    } catch (error) {
      set({ isUsuarioLoading: false })
      return ReturnError(error)
    }
  },
  cadastrarUsuario: async (payload: UsuarioType) => {
    try {
      const response = await api.post("/v1/usuario/cadastrar", payload);
      set({ isUsuarioLoading: false })
      return response
    } catch (error) {
      set({ isUsuarioLoading: false })
      return ReturnError(error)
    }
  },
  atualizarUsuario: async (payload: UsuarioType) => {
    try {
      const response = await api.put("/v1/usuario/atualizar", payload);
      set({ isUsuarioLoading: false })
      return response
    } catch (error) {
      set({ isUsuarioLoading: false })
      return ReturnError(error)
    }
  },
  excluirUsuario: async (payload: UsuarioType) => {
    set({ isUsuarioLoading: true })
    try {
      const response = await api.put("/v1/usuario/excluir", payload);
      set({ isUsuarioLoading: false })
      return response
    } catch (error) {
      set({ isUsuarioLoading: false })
      return ReturnError(error)
    }
  },
  listarModulosUsuario: async (payload: UsuarioType) => {
    try {
      const response = await api.get("/v1/usuario/modulos/listar", {
        params: {
          id: payload.id
        }
      });

      set({ isUsuarioLoading: false, lista_modulos_usuario: response.data.data.lista_modulos_usuario })
      return response
    } catch (error) {
      return ReturnError(error)
    }
  },
  atualizarModulosUsuario: async (payload: AtualizarModulosUsuarioPayload) => {
    try {
      const response = await api.put("/v1/usuario/modulos/atualizar", payload);

      set({ isUsuarioLoading: false })
      return response
    } catch (error) {
      return ReturnError(error)
    }
  }
}))