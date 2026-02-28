import { type ColumnDef } from "@tanstack/react-table";
import { ActionsCell } from "./actionsCell";

export type Acompanhamento = {
  id: number;
  paciente: string;
  convenio: number;
  clinica: string;
  medico: string;
  situacao_clinica: string;
  ultimo_acesso: string;
  tipo_de_acesso: string;
  ultimo_usv: string;
  lesao_50: string;
  alteracao_clinica: string;
  lesoes: string;
  tratamentos: string;
  observacoes: string;
};

export function getColumns(
  reload: () => Promise<void>
): ColumnDef<Acompanhamento>[] {
  return [
    {
      accessorKey: "paciente",
      header: "Paciente",
    },
    {
      accessorKey: "convenio",
      header: "Convênio",
    },
    {
      accessorKey: "clinica",
      header: "Clínica",
    },
    {
      accessorKey: "medico",
      header: "Nefrologista",
    },
    {
      accessorKey: "situacao_clinica",
      header: "Situação Clínica",
    },
    {
      accessorKey: "ultimo_acesso",
      header: "Último Acesso",
      cell: ({ row }) =>
        row.original.ultimo_acesso.split("-").reverse().join("/"),
    },
    {
      accessorKey: "tipo_de_acesso",
      header: "Tipo de Acesso",
    },
    {
      accessorKey: "ultimo_usv",
      header: "Último USV",
      cell: ({ row }) => row.original.ultimo_usv.split("-").reverse().join("/"),
    },
    {
      accessorKey: "lesao_50",
      header: "Lesão 50%",
    },
    {
      accessorKey: "alteracao_clinica",
      header: "Alteração Clínica",
    },
    {
      accessorKey: "lesoes",
      header: "Lesões",
    },
    {
      accessorKey: "tratamentos",
      header: "Tratamentos",
    },
    {
      accessorKey: "observacoes",
      header: "Observações",
    },
    {
      id: "actions",
      cell: ({ row }) => <ActionsCell item={row.original} reload={reload} />,
    },
  ];
}
