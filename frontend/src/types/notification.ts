import type { Developer } from "./developer";

type NotificationStatus = "pending" | "accepted" | "rejected";

interface Notification {
  id: number;
  contractId: number;
  contractTitle: string;
  contractorName: string;
  contractorPhoto: string | null;
  contractorEmail: string;
  contractorPhone: string;
  status: NotificationStatus;
  appliedDate: string;
  technologies: string[];
  developer?: Developer;
}

export type {Notification, NotificationStatus}