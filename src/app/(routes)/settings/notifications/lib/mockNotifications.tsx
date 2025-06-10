// app/notifications/lib/mockNotifications.ts

export type NotificationType = "restock" | "supplied" | "low-stock" | "payment-due";

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  date: string;
  read: boolean;
}

export const mockNotifications: Notification[] = [
  {
    id: "n1",
    type: "restock",
    message: "Restock needed: Sugar stock below threshold.",
    date: "2025-05-06T10:30:00Z",
    read: false,
  },
  {
    id: "n2",
    type: "supplied",
    message: "Ravi Traders has supplied 20 kg Rice.",
    date: "2025-05-05T16:00:00Z",
    read: true,
  },
  {
    id: "n3",
    type: "low-stock",
    message: "Low inventory: Wheat Flour is running out.",
    date: "2025-05-04T08:00:00Z",
    read: false,
  },
  {
    id: "n4",
    type: "payment-due",
    message: "Payment due to GreenGrow by May 10.",
    date: "2025-05-03T11:00:00Z",
    read: true,
  },
];
