import { ContractGrid } from "../../components/contracts/ContractGrid";

export default function ContractsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-purple-950 px-8 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-white text-2xl font-semibold">
          Contratos Disponíveis
        </h1>

        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white">
          Filtrar
        </button>
      </div>

      <ContractGrid />
    </main>
  );
}