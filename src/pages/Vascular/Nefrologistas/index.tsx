import { DataTable } from "@/components/DataTable";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { consultarMedicos } from "@/service/api";
import type { Medico } from "@/types/medico";
import { columns } from "./columns";

export default function Nefrologistas() {
  const [data, setData] = useState<Medico[]>([]);

  async function listarNefrologistas() {
    try {
      const response = await consultarMedicos(1);
      setData(response);
    } catch (error) {
      toast.error(error?.message);
    }
  }

  useEffect(() => {
    listarNefrologistas();
  }, []);

  return (
    <>
      <section className="flex">
        <div className="container mx-auto w-screen">
          <DataTable
            data={data}
            columns={columns}
            emptyMessage={"Nenhum nefrologista encontrado."}
          />
        </div>
      </section>
    </>
  );
}
