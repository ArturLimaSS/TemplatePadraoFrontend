import { api } from "src/constants/endpoints";
import type { UsuarioType } from "src/types/usuario/usuario";
import { ReturnError } from "src/utils/functions";
import { create } from "zustand";

export const useUsuarioStore = create((set, _) => ({
  isUsuarioLoading: false,
  lista_usuario: [],
  lista_usuario_tipo: [],
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
}))