// import { ChevronDown } from "lucide-react";
// import { Button } from "./ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "./ui/dropdown-menu";
// import { useEffect, useRef } from "react";
// import { Input } from "./ui/input";
// import { useDebounce } from "@/utils/utils";

// type FiltroTableProps = {
//   filtros: string[];
//   busca: string;
//   setBusca: (v: string) => void;
//   statusFiltro: string;
//   setStatusFiltro: (v: string) => void;
//   listar: (busca: string, statusFiltro: string) => Promise<void>;
// };

// export default function FiltroTable({
//   filtros,
//   busca,
//   setBusca,
//   statusFiltro,
//   setStatusFiltro,
//   listar,
// }: FiltroTableProps) {
//   const inputRefBusca = useRef(null);
//   const debouncedBusca = useDebounce(busca, 500);

//   useEffect(() => {
//     if (
//       (busca && statusFiltro !== "TODOS") ||
//       (!busca && statusFiltro === "TODOS")
//     ) {
//       listar(busca, statusFiltro);
//     }
//   }, [debouncedBusca, statusFiltro]);

//   return (
//     <>
//       <div className="flex gap-2">
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline">
//               {statusFiltro === "TODOS" ? "Filtrar por" : statusFiltro}
//               <ChevronDown className="ml-2 h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent>
//             {filtros.map((status) => (
//               <DropdownMenuItem
//                 key={status}
//                 onClick={() => {
//                   setStatusFiltro(status);
//                   if (status !== "TODOS") {
//                     setTimeout(() => {
//                       inputRefBusca?.current?.focus();
//                     }, 400);
//                   } else {
//                     setBusca("");
//                   }
//                 }}
//               >
//                 {status === "TODOS" ? "Todos" : status}
//               </DropdownMenuItem>
//             ))}
//           </DropdownMenuContent>
//         </DropdownMenu>
//         {statusFiltro !== "TODOS" && (
//           <Input
//             placeholder="Buscar..."
//             className="w-100"
//             value={busca?.toUpperCase()}
//             onChange={(e) => setBusca(e.target.value)}
//             ref={inputRefBusca}
//           />
//         )}
//       </div>
//     </>
//   );
// }

import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { useDebounce } from "@/utils/utils";

type FiltroTableProps = {
  filtros: string[];
  busca: string;
  setBusca: (v: string) => void;
  statusFiltro: string;
  setStatusFiltro: (v: string) => void;
  listar: (busca: string, statusFiltro: string) => Promise<void>;
};

export default function FiltroTable({
  filtros,
  busca,
  setBusca,
  statusFiltro,
  setStatusFiltro,
  listar,
}: FiltroTableProps) {
  const inputRefBusca = useRef<HTMLInputElement>(null);

  const debouncedBusca = useDebounce(busca, 500);

  useEffect(() => {
    if (statusFiltro !== "TODOS" && !busca) return;

    listar(debouncedBusca, statusFiltro);
  }, [debouncedBusca, statusFiltro]);

  useEffect(() => {
    if (statusFiltro !== "TODOS") {
      setTimeout(() => {
        inputRefBusca.current?.focus();
      }, 200);
    }
  }, [statusFiltro]);

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {statusFiltro === "TODOS" ? "Filtrar por" : statusFiltro}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          {filtros.map((status) => (
            <DropdownMenuItem
              key={status}
              onClick={() => {
                setStatusFiltro(status);

                if (status === "TODOS") {
                  setBusca("");
                }
              }}
            >
              {status === "TODOS" ? "Todos" : status}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {statusFiltro !== "TODOS" && (
        <Input
          placeholder="Buscar..."
          className="w-100"
          value={busca}
          onChange={(e) => setBusca(e.target.value.toUpperCase())}
          ref={inputRefBusca}
        />
      )}
    </div>
  );
}
