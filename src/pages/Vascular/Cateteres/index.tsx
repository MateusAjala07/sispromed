import { DataTable } from "@/components/DataTable";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { consultarCateteres } from "@/service/api";
import { columns } from "./columns";
import type { Cateter } from "@/types/cateter";

export default function Cateteres() {
  const [data, setData] = useState<Cateter[]>([]);

  async function listarCateteres() {
    try {
      const response = await consultarCateteres();
      setData(response);
    } catch (error) {
      toast.error(error?.message);
    }
  }

  useEffect(() => {
    listarCateteres();
  }, []);

  return (
    <>
      <section className="flex">
        <div className="container mx-auto w-screen">
          <DataTable
            data={data}
            columns={columns}
            emptyMessage={"Nenhum cateter encontrado."}
          />
        </div>
      </section>
    </>
  );
}
