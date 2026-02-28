import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import ModalAcompanhamento from "../Modals/acompanhamento";
import Alerta from "../alerta";
import { toast } from "sonner";
import { excluirAcompanhamento } from "@/service/api";
import type { Acompanhamento } from "./columns";

interface Props {
  item: Acompanhamento;
  reload: () => Promise<void>;
}

export function ActionsCell({ item, reload }: Props) {
  const [isModalAcompanhamento, setIsModalAcompanhamento] = useState(false);
  const [isModalExcluir, setIsModalExcluir] = useState(false);

  async function removerAcompanhamento(id: number) {
    try {
      const responseData = await excluirAcompanhamento(id);
      toast.success(responseData.message);

      await reload();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <ModalAcompanhamento
        isOpen={isModalAcompanhamento}
        setIsOpen={setIsModalAcompanhamento}
        id={item.id}
        acao="editar"
        reload={reload}
      />

      <Alerta
        isOpen={isModalExcluir}
        setIsOpen={setIsModalExcluir}
        type="delete"
        titulo="ATENÇÃO!"
        descricao="Você tem certeza que deseja excluir um acompanhamento?"
        continuar="EXCLUIR"
        onConfirm={() => removerAcompanhamento(item.id)}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsModalAcompanhamento(true)}>
            Editar
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setIsModalExcluir(true)}
            className="text-red-500"
          >
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
