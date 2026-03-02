import { DataTableAcompanhamentos } from "@/components/Acompanhamentos/data-table";
import { useEffect, useState } from "react";
import {
  type Acompanhamento,
} from "@/components/Acompanhamentos/columns";
import { consultarAcompanhamentos } from "@/service/api";

import { getColumns } from "@/components/Acompanhamentos/columns";

export default function Dashboard() {
  const [dataAcompanhamentos, setDataAcompanhamentos] = useState<
    Acompanhamento[]
  >([]);

  async function listarData() {
    const data: Acompanhamento[] = await consultarAcompanhamentos();
    setDataAcompanhamentos(data);
  }

  useEffect(() => {
    listarData();
  }, []);

  return (
    <section className="flex">
      <div className="container mx-auto w-screen">
        <DataTableAcompanhamentos
          columns={getColumns(listarData)}
          data={dataAcompanhamentos}
          reload={listarData}
        />
      </div>
    </section>
  );
}
