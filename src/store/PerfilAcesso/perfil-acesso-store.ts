import { api } from "src/constants/endpoints";
import { ReturnError } from "src/utils/functions";
import { create } from "zustand";
import type { PerfilAcessoState, PerfilAcessoType } from "./perfil-acesso-types";


export const usePerfilAcessoStore = create<PerfilAcessoState>((set, _) => ({
  isPerfilAcessoLoading: false,
  lista_perfil_acesso: [],
  listarPerfilAcesso: async () => {
    try {
      const response = await api.get("/v1/perfil-acesso/listar");
      set({ isPerfilAcessoLoading: false, lista_perfil_acesso: response.data.data.lista_perfil_acesso })
      return response
    } catch (error) {
      set({ isPerfilAcessoLoading: false })
      return ReturnError(error)
    }
  },

  cadastrarPerfilAcesso: async (payload: PerfilAcessoType) => {
    try {
      const response = await api.post("/v1/perfil-acesso/cadastrar", payload);
      set({ isPerfilAcessoLoading: false })
      return response
    } catch (error) {
      set({ isPerfilAcessoLoading: false })
      return ReturnError(error)
    }
  },
  atualizarPerfilAcesso: async (payload: PerfilAcessoType) => {
    try {
      const response = await api.put("/v1/perfil-acesso/atualizar", payload);
      set({ isPerfilAcessoLoading: false })
      return response
    } catch (error) {
      set({ isPerfilAcessoLoading: false })
      return ReturnError(error)
    }
  },
  excluirPerfilAcesso: async (payload: PerfilAcessoType) => {
    set({ isPerfilAcessoLoading: true })
    try {
      const response = await api.put("/v1/perfil-acesso/excluir", payload);
      set({ isPerfilAcessoLoading: false })
      return response
    } catch (error) {
      set({ isPerfilAcessoLoading: false })
      return ReturnError(error)
    }
  },

}))