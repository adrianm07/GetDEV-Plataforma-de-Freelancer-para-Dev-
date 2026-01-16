"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Clock, CheckCircle, XCircle, Mail, Phone } from "lucide-react";

import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { DeveloperProfile } from "./profile/DeveloperProfile";

import type { NotificationDTO , NotificationStatus} from "../types/notification";
import type { Developer} from "../types/developer";
import type { SummaryPost } from "../types/project";
import type { AccountType } from "../types/accountType";

interface NotificationsProps {
  notifications: NotificationDTO[];
  accountType: AccountType | undefined;
  onUpdateStatus: (id: string, status: NotificationStatus) => void;
  onProjectClick?: (project: SummaryPost) => void;
}

const STATUS_CONFIG: Record<
  NotificationStatus,
  {
    label: string;
    icon: ReactNode;
    className: string;
  }
> = {
  PENDENTE: {
    label: "Pendente",
    icon: <Clock className="w-5 h-5 text-yellow-400" />,
    className: "border-yellow-600/50 bg-yellow-900/10",
  },
  ACEITA: {
    label: "Aceito",
    icon: <CheckCircle className="w-5 h-5 text-green-400" />,
    className: "border-green-600/50 bg-green-900/10",
  },
  RECUSADA: {
    label: "Recusado",
    icon: <XCircle className="w-5 h-5 text-red-400" />,
    className: "border-red-600/50 bg-red-900/10",
  },
};

interface NotificationCardProps {
  notification: NotificationDTO;
  accountType: AccountType | undefined;
  onUpdateStatus: NotificationsProps["onUpdateStatus"];
  onSelectDeveloper: (developer: Developer) => void;
}

function NotificationCard({
  notification,
  accountType,
  onUpdateStatus,
  onSelectDeveloper,
}: NotificationCardProps) {
  const status = STATUS_CONFIG[notification.status];

  return (
    <div
      className={`rounded-xl border p-6 bg-gradient-to-br from-gray-900 to-black ${status.className}`}
    >
      <div className="flex gap-4">
        {/* Avatar */}
        <div
          onClick={() =>
            accountType === "CONTRATANTE" &&
            notification.developer &&
            onSelectDeveloper(notification.developer)
          }
          className={
            accountType === "CONTRATANTE" && notification.developer
              ? "cursor-pointer"
              : undefined
          }
        >
          <Avatar>
            <AvatarImage src={notification.contractorPhoto ?? undefined} />
            <AvatarFallback>
              {notification.contractorName.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1">
          {/* Header */}
          <div className="flex justify-between mb-3">
            <div>
              <h3 className="text-white">{notification.contractTitle}</h3>
              <p className="text-gray-400">
                Contratante: {notification.contractorName}
              </p>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-purple-900/30">
              {status.icon}
              <span className="text-gray-300">{status.label}</span>
            </div>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {notification.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-purple-900/20 border border-purple-900/30 text-purple-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-wrap gap-4 text-gray-400 mb-4">
            <a
              href={`mailto:${notification.contractorEmail}`}
              className="flex items-center gap-2 hover:text-purple-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
              {notification.contractorEmail}
            </a>

            <a
              href={`https://wa.me/${notification.contractorPhone.replace(
                /\D/g,
                "",
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-purple-400 transition-colors"
            >
              <Phone className="w-4 h-4" />
              {notification.contractorPhone}
            </a>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center">
            <p className="text-gray-500">
              Candidatura enviada em {notification.appliedDate}
            </p>

            {accountType === "CONTRATANTE" &&
              notification.status === "PENDENTE" && (
                <div className="flex gap-3">
                  <Button
                    variant="destructive"
                    onClick={() =>
                      onUpdateStatus(notification.id, "RECUSADA")
                    }
                  >
                    Recusar
                  </Button>
                  <Button
                    variant={"outline"}
                    onClick={() =>
                      onUpdateStatus(notification.id, "ACEITA")
                    }
                  >
                    Aceitar
                  </Button>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Notifications({
  notifications,
  accountType,
  onUpdateStatus,
}: NotificationsProps) {
  const [selectedDeveloper, setSelectedDeveloper] =
    useState<Developer | null>(null);

  const visibleNotifications =
    accountType === "DESENVOLVEDOR"
      ? notifications.filter((n) => n.status !== "RECUSADA")
      : notifications;

  const pending = visibleNotifications.filter(
    (n) => n.status === "PENDENTE",
  );
  const answered = visibleNotifications.filter(
    (n) => n.status !== "PENDENTE",
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-purple-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-white mb-8">Notificações</h1>

        {pending.length > 0 && (
          <section className="mb-8 space-y-4">
            <h2 className="text-white">
              Solicitações Pendentes ({pending.length})
            </h2>

            {pending.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                accountType={accountType}
                onUpdateStatus={onUpdateStatus}
                onSelectDeveloper={setSelectedDeveloper}
              />
            ))}
          </section>
        )}

        {answered.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-white">Histórico</h2>

            {answered.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                accountType={accountType}
                onUpdateStatus={onUpdateStatus}
                onSelectDeveloper={setSelectedDeveloper}
              />
            ))}
          </section>
        )}

        {notifications.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Clock className="w-16 h-16 mx-auto mb-4" />
            Você não possui notificações no momento
          </div>
        )}
      </div>

      {selectedDeveloper && (
        <DeveloperProfile
          isOpen
          developer={selectedDeveloper}
          onClose={() => setSelectedDeveloper(null)}
        />
      )}
    </div>
  );
}
