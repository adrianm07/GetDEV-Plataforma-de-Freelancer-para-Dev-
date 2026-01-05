export interface ContractSummary {
  id: number;
  title: string;
  contractorName: string;
  contractorPhoto: string | null;
  description: string;
  technologies: string[];
}

export interface Contract extends ContractSummary {
  fullDescription?: string;
  deadline?: string;
  priceRange?: string;
  email?: string;
  phone?: string;
}
