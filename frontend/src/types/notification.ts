import type { Developer } from "./developer";

export type NotificationStatus = "PENDENTE" | "ACEITA" | "RECUSADA";

export interface NotificationDTO {
  id: string;
  contractTitle: string;
  technologies: string[];
  contractorName: string;
  contractorPhoto: string | null;
  contractorEmail: string;
  contractorPhone: string;
  status: NotificationStatus;
  appliedDate: string;
  developer?: Developer;
}
