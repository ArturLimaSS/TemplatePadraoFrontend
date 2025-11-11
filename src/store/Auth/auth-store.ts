import { create } from "zustand";
import { api } from "src/constants/endpoints";
import type { loginFormType } from "src/types/auth/auth";
import { ReturnError } from "src/utils/functions";
import type { InquilinoType, UsuarioModuloType } from "src/types/inquilino/inquilino-types";
import type { userType } from "src/types/apps/users";
import type { UsuarioType } from "src/types/usuario/usuario";


interface AuthState {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  usuario_modulos: UsuarioModuloType[];
  inquilino: InquilinoType;
  usuario_logado?: UsuarioType | null,
  usuario_tipo_id: number;
  usuario_tipo: null | {
    "id"?: null | number | string;
    "nome"?: null | string
    "created_at"?: null | string,
    "updated_at"?: null | string
  };
  login: (payload: loginFormType) => Promise<any | undefined>;
  atualizarAcesso: (payload: UsuarioType) => Promise<any | undefined>;
  initializeAuth: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem('token'),
  isAuthLoading: false,
  usuario_modulos: [],
  usuario_logado: null,
  usuario_tipo: {},
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
        usuario_logado: response.data.user,
        usuario_tipo: response.data.inquilinoUsuario.usuario_tipo
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

  logout: async () => {

    try {

      const response = await api.post("/v1/auth/logout")

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      set({ isAuthenticated: false });

      return response;
    } catch (error) {

    }
  },
  atualizarAcesso: async (payload: UsuarioType) => {
    set({ isAuthLoading: true })
    try {
      const response = await api.put("/v1/auth/atualizar-acesso", payload);
      set({ isAuthLoading: false })
      return response;
    } catch (error) {
      set({ isAuthLoading: false })
      return ReturnError(error)
    }
  }
}));