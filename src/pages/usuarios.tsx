import { DataTable } from "@/components/data-table";
import { consultarUsuarios } from "@/service/api";
import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router";
import { toast } from "sonner";

export default function Usuarios() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

  const columns = [
    {
      accessorKey: "nome",
      header: "Nome",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "situacao",
      header: "Situação",
    },
    {
      accessorKey: "perfil",
      header: "Perfil",
    },
    // {
    //   id: "actions",
    //   cell: ({ row }) => {
    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button
    //             variant="ghost"
    //             className="h-8 w-8 p-0 flex justify-self-end"
    //           >
    //             <span className="sr-only">Abrir menu</span>
    //             <MoreHorizontal className="h-4 w-4" />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
    //           <DropdownMenuItem
    //             onClick={() => {
    //               setAcaoModal("editar");
    //               setItemID(row.original.id);
    //               setIsModal(true);
    //             }}
    //           >
    //             Editar
    //           </DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     );
    //   },
    // },
  ];

  async function listar() {
    try {
      setIsLoading(true);
      const response = await consultarUsuarios();
      setUsuarios(response);
    } catch (error) {
      if (error as AxiosError) {
        if (
          error?.response?.data?.message ===
          "Você não tem permissão para essa operação"
        ) {
          throw navigate("/vascular/dashboard");
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    listar();
  }, []);

  return (
    <>
      <main>
        <DataTable
          emptyMessage={"Nenhum usuário encontrado"}
          loading={isLoading}
          data={usuarios}
          columns={columns}
        />
      </main>
    </>
  );
}
