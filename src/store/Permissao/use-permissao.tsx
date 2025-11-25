import { api } from 'src/constants/endpoints';
import { ReturnError } from 'src/utils/functions';
import { create } from 'zustand';
import type { PermissaoState } from './permissao-type';

export const usePermissao = create<PermissaoState>((set) => ({
  isPermissaoLoading: false,
  lista_permissao: [],
  listarPermissao: async () => {
    set({ isPermissaoLoading: true });
    try {
      const response = await api.get('/v1/permissao/listar');
      set({ lista_permissao: response.data.lista_permissao, isPermissaoLoading: false });
    } catch (error) {
      set({ isPermissaoLoading: false });
      return ReturnError(error);
    }
  },
}));
