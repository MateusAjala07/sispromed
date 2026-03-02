import { DataTable } from "@/components/DataTable";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { consultarTiposAcessos } from "@/service/api";
import type { Medico } from "@/types/medico";
import { columns } from "./columns";

export default function TiposAcesso() {
  const [data, setData] = useState<Medico[]>([]);

  async function listarTiposAcesso() {
    try {
      const response = await consultarTiposAcessos();
      setData(response);
    } catch (error) {
      toast.error(error?.message);
    }
  }

  useEffect(() => {
    listarTiposAcesso();
  }, []);

  return (
    <>
      <section className="flex">
        <div className="container mx-auto w-screen">
          <DataTable
            data={data}
            columns={columns}
            emptyMessage={"Nenhum tipo de acesso encontrado."}
          />
        </div>
      </section>
    </>
  );
}
