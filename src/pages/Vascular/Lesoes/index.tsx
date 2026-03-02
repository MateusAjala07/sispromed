import { DataTable } from "@/components/DataTable";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { consultarLesoes } from "@/service/api";
import { columns } from "./columns";
import type { Lesao } from "@/types/lesao";

export default function Lesoes() {
  const [data, setData] = useState<Lesao[]>([]);

  async function listarLesoes() {
    try {
      const response = await consultarLesoes();
      setData(response);
    } catch (error) {
      toast.error(error?.message);
    }
  }

  useEffect(() => {
    listarLesoes();
  }, []);

  return (
    <>
      <section className="flex">
        <div className="container mx-auto w-screen">
          <DataTable
            data={data}
            columns={columns}
            emptyMessage={"Nenhuma lesão encontrada."}
          />
        </div>
      </section>
    </>
  );
}
