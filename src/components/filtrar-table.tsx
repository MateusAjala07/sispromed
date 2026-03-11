import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useEffect } from "react";

type FiltrarTableProps = {
  filtros: string[];
  statusFiltro: string;
  setStatusFiltro: (v: string) => void;
  listar: (
    tipo?: "busca" | "filtro" | "",
    categoria?: string,
    busca?: string
  ) => Promise<void>;
};

export default function FiltrarTable({
  filtros,
  statusFiltro,
  setStatusFiltro,
  listar,
}: FiltrarTableProps) {
  useEffect(() => {
    if (statusFiltro) {
      listar("filtro", statusFiltro);
    }
  }, [statusFiltro]);

  return (
    <div className="flex gap-2 w-full sm:w-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {statusFiltro || "Filtrar por"}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          {filtros.map((status) => (
            <DropdownMenuItem
              key={status}
              onClick={() => {
                setStatusFiltro(status);
              }}
            >
              {status}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
