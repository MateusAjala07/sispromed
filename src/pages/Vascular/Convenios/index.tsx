import { DataTable } from "@/components/DataTable";
import type { Convenio } from "@/types/convenio";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { toast } from "sonner";
import { consultarConvenios } from "@/service/api";

export default function Convenios() {
  const [data, setData] = useState<Convenio[]>([]);

  async function listarConvenios() {
    try {
      const response = await consultarConvenios();
      setData(response);
    } catch (error) {
      toast.error(error?.message);
    }
  }

  useEffect(() => {
    listarConvenios();
  }, []);

  return (
    <>
      <section className="flex flex-1">
        <div className="container mx-auto w-screen">
          <DataTable
            data={data}
            columns={columns}
            emptyMessage={"Nenhum convênio encontrado."}
          />
        </div>
      </section>
    </>
  );
}
