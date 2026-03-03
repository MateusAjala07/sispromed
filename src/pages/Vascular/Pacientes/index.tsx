import { DataTable } from "@/components/DataTable";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { consultarPacientes } from "@/service/api";
import type { Paciente } from "@/types/paciente";
import { Button } from "@/components/ui/button";
import ModalPaciente from "@/components/Modals/paciente";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { formatarCPF, formatarTelefone } from "@/utils/format";
import { AxiosError } from "axios";

export default function Pacientes() {
  const [data, setData] = useState<Paciente[]>([]);
  const [isModal, setIsModal] = useState(false);
  const [acaoModal, setAcaoModal] = useState<"criar" | "editar">("criar");
  const [itemID, setItemID] = useState(0);

  const columns: ColumnDef<Paciente>[] = [
    {
      accessorKey: "cpf",
      header: "CPF",
      cell: ({ row }) => {
        return <span>{formatarCPF(row.original.cpf)}</span>;
      },
    },
    {
      accessorKey: "nome",
      header: "Nome",
    },
    {
      accessorKey: "telefone",
      header: "Telefone",
      cell: ({ row }) => {
        return <span>{formatarTelefone(row.original.telefone)}</span>;
      },
    },
    {
      accessorKey: "uf",
      header: "UF",
    },
    {
      accessorKey: "municipio",
      header: "Município",
    },
    {
      accessorKey: "bairro",
      header: "Bairro",
    },
    {
      accessorKey: "rua",
      header: "Rua",
    },
    {
      accessorKey: "numero",
      header: "Número",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 flex justify-self-end"
              >
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  setAcaoModal("editar");
                  setItemID(row.original.id);
                  setIsModal(true);
                }}
              >
                Editar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  async function listar() {
    try {
      const response = await consultarPacientes();
      setData(response);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ?? "Erro ao consultar paciente"
        );
      }
    }
  }

  useEffect(() => {
    listar();
  }, []);

  return (
    <>
      <ModalPaciente
        isOpen={isModal}
        setIsOpen={setIsModal}
        acao={acaoModal}
        reload={listar}
        id={itemID}
      />

      <section className="flex">
        <div className="container mx-auto w-screen">
          <div className="flex justify-end pb-3">
            <Button
              onClick={() => {
                setAcaoModal("criar");
                setIsModal(true);
              }}
            >
              Adicionar
            </Button>
          </div>

          <DataTable
            data={data}
            columns={columns}
            emptyMessage={"Nenhum paciente encontrado."}
          />
        </div>
      </section>
    </>
  );
}
