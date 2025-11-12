import { api } from "src/constants/endpoints";
import { ReturnError } from "src/utils/functions";
import { create } from "zustand"

export interface ModuloType {
  id: string;
  nome: string;
  prefixo: string;
  ativo: string;
}

interface InquilinoState {
  isInquilinoLoading: boolean;
  lista_modulos: ModuloType[] | null | [];
  listarModulos: () => Promise<any | undefined>;

}

export const useInquilino = create<InquilinoState>((set, _) => ({
  isInquilinoLoading: false,
  lista_modulos: [],
  listarModulos: async () => {

    try {
      const response = await api.get("/v1/inquilino/listar-modulos");
      set({ isInquilinoLoading: false, lista_modulos: response.data.data.lista_modulos })
      return response;
    } catch (error) {
      return ReturnError(error)
    }
  }
}))