import { useState } from "react";
import { ContractGrid } from "../../components/contracts/ContractGrid";
import { FilterButton } from "../../components/filters/FilterButton";

export default function ContractsPage() {

  const [filters, setFilters] = useState<string[]>([]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-purple-950 px-8 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-white text-2xl font-semibold">
          Contratos Disponíveis
        </h1>

        <FilterButton onFilterChange={setFilters}/>
      </div>
      
      <ContractGrid filters={filters} />
    </main>
  );
}