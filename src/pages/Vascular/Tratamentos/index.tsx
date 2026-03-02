import { DataTable } from "@/components/DataTable";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  consultarTratamentosRealizados,
} from "@/service/api";
import { columns } from "./columns";
import type { TratamentoRealizado } from "@/types/tratamentoRealizado";

export default function TratamentosRealizados() {
  const [data, setData] = useState<TratamentoRealizado[]>([]);

  async function listarTratamentosRealizados() {
    try {
      const response = await consultarTratamentosRealizados();
      setData(response);
    } catch (error) {
      toast.error(error?.message);
    }
  }

  useEffect(() => {
    listarTratamentosRealizados();
  }, []);

  return (
    <>
      <section className="flex">
        <div className="container mx-auto w-screen">
          <DataTable
            data={data}
            columns={columns}
            emptyMessage={"Nenhum tratamento realizado encontrado."}
          />
        </div>
      </section>
    </>
  );
}
