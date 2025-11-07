import { create } from "zustand";
import { api } from "src/constants/endpoints";
import type { loginFormType } from "src/types/auth/auth";
import { ReturnError } from "src/utils/functions";
import type { InquilinoType, UsuarioModuloType } from "src/types/inquilino/inquilino-types";


interface AuthState {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  usuario_modulos: UsuarioModuloType[];
  inquilino: InquilinoType;
  usuario_tipo_id: number;
  login: (payload: loginFormType) => Promise<any | undefined>;
  initializeAuth: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem('token'),
  isAuthLoading: false,
  usuario_modulos: [],
  usuario_tipo_id: 0,
  inquilino: {
    "id": "",
    "nome": "",
    "cnpj": "",
    "telefone": "",
    "email": "",
    "cep": "",
    "rua": "",
    "numero": "",
    "bairro": "",
    "cidade": "",
    "uf": "",
    "pais": "",
    "ativo": "",
  },
  login: async (payload) => {
    set({ isAuthLoading: true });
    try {
      const response = await api.post('/v1/auth/login', payload);
      const token = response.data.token;
      const user = response.data.user;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setTimeout(() => {
        set({
          isAuthenticated: true, isAuthLoading: false,

        });
      }, 1000)
      return response;
    } catch (error) {
      set({ isAuthenticated: false, isAuthLoading: false });
      return ReturnError(error);
    }
  },

  // Checa se o token armazenado é válido chamando sua API de verificação
  initializeAuth: async () => {
    set({ isAuthLoading: true });
    try {
      const response = await api.post('/v1/auth/check');
      // const user = JSON.parse(localStorage.getItem('user') || 'null');
      set({
        isAuthenticated: true, isAuthLoading: false, usuario_modulos: response.data.usuario_modulos,
        inquilino: response.data.inquilino,
        usuario_tipo_id: response.data.inquilinoUsuario.usuario_tipo_id,
      });
    } catch (error) {
      // Token inválido ou expirado
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      set({ isAuthenticated: false, isAuthLoading: false, });
      // setTimeout(() => {
      //   window.location.href = "/auth/login"
      // }, 1000)
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ isAuthenticated: false });
  }
}));