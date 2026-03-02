import { DataTable } from "@/components/DataTable";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { toast } from "sonner";
import { consultarClinicas } from "@/service/api";
import type { Clinica } from "@/types/clinica";

export default function Clinicas() {
  const [data, setData] = useState<Clinica[]>([]);

  async function listarClinicas() {
    try {
      const response = await consultarClinicas();
      setData(response);
    } catch (error) {
      toast.error(error?.message);
    }
  }

  useEffect(() => {
    listarClinicas();
  }, []);

  return (
    <>
      <section className="flex flex-1">
        <div className="container mx-auto w-screen">
          <DataTable
            data={data}
            columns={columns}
            emptyMessage={"Nenhuma clínica encontrada."}
          />
        </div>
      </section>
    </>
  );
}
