import { create } from "zustand";
import { persist } from "zustand/middleware";

type GlobalState = {
  nome_usuario: string;
  setNomeUsuario: (nome: string) => void;
  perfil_usuario: number;
  setPerfilUsuario: (perfil: number) => void;
  resetState: () => void;
};

const useGlobalState = create<GlobalState>()(
  persist(
    (set) => ({
      nome_usuario: "",
      perfil_usuario: 2,

      setNomeUsuario: (nome) => set({ nome_usuario: nome }),
      setPerfilUsuario: (perfil) => set({ perfil_usuario: perfil }),

      resetState: () => {
        set(useGlobalState.getInitialState());
        localStorage.removeItem("global-storage");
      },
    }),
    {
      name: "global-storage",
    }
  )
);

export default useGlobalState;
