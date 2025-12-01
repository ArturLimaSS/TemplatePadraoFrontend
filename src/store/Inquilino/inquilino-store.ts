import { api } from 'src/constants/endpoints';
import { ReturnError } from 'src/utils/functions';
import { create } from 'zustand';
import type { PermissaoType } from '../Permissao/permissao-type';

export interface ModuloType {
  id: string;
  nome: string;
  cor: string;
  prefixo: string;
  ativo: string;
  icone: string;
  permissao?: PermissaoType[];
}

interface InquilinoState {
  isInquilinoLoading: boolean;
  lista_modulos: ModuloType[] | null | [];
  lista_permissoes: PermissaoType[] | null | [];
  listarModulos: () => Promise<any | undefined>;
  listarPermissoes: (modulo_id: string) => Promise<any | undefined>;
}

export const useInquilino = create<InquilinoState>((set, _) => ({
  isInquilinoLoading: false,
  lista_modulos: [],
  lista_permissoes: [],
  listarModulos: async () => {
    try {
      const response = await api.get('/v1/inquilino/listar-modulos');
      set({ isInquilinoLoading: false, lista_modulos: response.data.data.lista_modulos });
      return response;
    } catch (error) {
      return ReturnError(error);
    }
  },
  listarPermissoes: async (modulo_id: string) => {
    try {
      const response = await api.get('/v1/permissoes/listar', {
        params: {
          modulo_id,
        },
      });
      set({ isInquilinoLoading: false, lista_permissoes: response.data.lista_permissoes });
      return response;
    } catch (error) {
      return ReturnError(error);
    }
  },
}));
