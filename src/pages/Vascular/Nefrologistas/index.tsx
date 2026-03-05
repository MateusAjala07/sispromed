import { DataTable } from "@/components/DataTable";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { consultarMedicos } from "@/service/api";
import type { Medico } from "@/types/medico";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { useDebounce } from "@/utils/utils";
import type { ColumnDef } from "@tanstack/react-table";
import FiltroTable from "@/components/filtro-table";

type StatusFiltro = "TODOS" | "NOME";

export default function Nefrologistas() {
  const [data, setData] = useState<Medico[]>([]);
  const [isModal, setIsModal] = useState(false);
  const [acaoModal, setAcaoModal] = useState<"criar" | "editar">("criar");
  const [statusFiltro, setStatusFiltro] = useState<StatusFiltro>("TODOS");
  const [busca, setBusca] = useState("");

  const columns: ColumnDef<Medico>[] = [
    {
      accessorKey: "nome",
      header: "Nome",
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
              <DropdownMenuItem>Editar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  async function listar(busca: string = "", statusFiltro: string = "") {
    try {
      const response = await consultarMedicos(1, busca?.toUpperCase(), statusFiltro);
      setData(response);
    } catch (error) {
      toast.error(error?.message);
    }
  }

  return (
    <>
      <main>
        <section className="flex justify-between pb-1">
          <FiltroTable
            filtros={["TODOS", "NOME"]}
            busca={busca}
            setBusca={setBusca}
            statusFiltro={statusFiltro}
            setStatusFiltro={setStatusFiltro}
            listar={listar}
          />
          <div>
            <Button
              onClick={() => {
                setAcaoModal("criar");
                setIsModal(true);
              }}
            >
              Adicionar
            </Button>
          </div>
        </section>

        <DataTable
          columns={columns}
          data={data}
          emptyMessage={"Nenhum nefrologista encontrado."}
        />
      </main>
    </>
  );
}
