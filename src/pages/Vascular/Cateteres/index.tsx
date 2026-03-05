import { DataTable } from "@/components/DataTable";
import { useState } from "react";
import { toast } from "sonner";
import { consultarCateteres } from "@/service/api";
import type { Cateter } from "@/types/cateter";
import { Button } from "@/components/ui/button";
import FiltroTable from "@/components/filtro-table";
import type { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

type StatusFiltro = "TODOS" | "TIPO" | "MARCA";

export default function Cateteres() {
  const [data, setData] = useState<Cateter[]>([]);
  const [busca, setBusca] = useState("");
  const [acaoModal, setAcaoModal] = useState<"criar" | "editar">("criar");
  const [isModal, setIsModal] = useState(false);
  const [statusFiltro, setStatusFiltro] = useState<StatusFiltro>("TODOS");

  const columns: ColumnDef<Cateter>[] = [
    {
      accessorKey: "tipo",
      header: "Tipo",
    },
    {
      accessorKey: "marca",
      header: "Marca",
    },
  ];

  async function listar(busca: string = "", statusFiltro: string = "") {
    try {
      const response = await consultarCateteres(
        busca?.toUpperCase(),
        statusFiltro
      );
      setData(response);
    } catch (error) {
      toast.error(error?.message);
    }
  }

  return (
    <>
      <main>
        <section className="pb-1">
          <FiltroTable
            filtros={["TODOS", "TIPO", "MARCA"]}
            busca={busca}
            setBusca={setBusca}
            statusFiltro={statusFiltro}
            setStatusFiltro={setStatusFiltro}
            listar={listar}
          />
        </section>

        <DataTable
          columns={columns}
          data={data}
          emptyMessage={"Nenhum cateter encontrado."}
        />
      </main>
    </>
  );
}
