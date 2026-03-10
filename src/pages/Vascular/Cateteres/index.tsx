import { DataTable } from "@/components/data-table";
import { useState } from "react";
import { toast } from "sonner";
import { consultarCateteres } from "@/service/api";
import type { Cateter } from "@/types/cateter";
import FiltroTable from "@/components/filtro-table";
import type { ColumnDef } from "@tanstack/react-table";

type StatusFiltro = "Todos" | "Tipo" | "Marca";

export default function Cateteres() {
  const [data, setData] = useState<Cateter[]>([]);
  const [busca, setBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState<StatusFiltro>("Todos");
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      const response = await consultarCateteres(
        busca?.toUpperCase(),
        statusFiltro?.toUpperCase()
      );
      setData(response);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <main>
        <section className="pb-1">
          <FiltroTable
            filtros={["Todos", "Tipo", "Marca"]}
            busca={busca}
            setBusca={setBusca}
            statusFiltro={statusFiltro}
            setStatusFiltro={setStatusFiltro}
            listar={listar}
          />
        </section>

        <DataTable
          loading={isLoading}
          columns={columns}
          data={data}
          emptyMessage={"Nenhum cateter encontrado."}
        />
      </main>
    </>
  );
}
