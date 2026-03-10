import { Skeleton } from "@/components/ui/skeleton";

function SkeletonCell() {
  return (
    <div className="relative overflow-hidden rounded-md bg-gray-200 dark:bg-gray-700 h-6 w-full">
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/10" />
    </div>
  );
}

export default function SkeletonTable({ numeroColunas = 4, numeroLinhas = 5 }) {
  const totalCelulas = numeroColunas * numeroLinhas;

  return (
    <div className="w-full mt-4">
      <Skeleton className="h-8 bg-gray-300 rounded-md mb-2" />

      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${numeroColunas}, 1fr)`,
        }}
      >
        {Array.from({ length: totalCelulas }).map((_, index) => (
          <SkeletonCell key={index} />
        ))}
      </div>
    </div>
  );
}
