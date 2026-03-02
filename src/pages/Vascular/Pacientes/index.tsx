import { DataTable } from "@/components/DataTable";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { consultarPacientes } from "@/service/api";
import type { Paciente } from "@/types/paciente";

export default function Pacientes() {
  const [data, setData] = useState<Paciente[]>([]);

  async function listarPacientes() {
    try {
      const response = await consultarPacientes();
      setData(response);
    } catch (error) {
      toast.error(error?.message);
    }
  }

  useEffect(() => {
    listarPacientes();
  }, []);

  return (
    <>
      <section className="flex">
        <div className="container mx-auto w-screen">
          <DataTable
            data={data}
            columns={columns}
            emptyMessage={"Nenhum paciente encontrado."}
          />
        </div>
      </section>
    </>
  );
}
