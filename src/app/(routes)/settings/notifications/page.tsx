// app/notifications/page.tsx
import NotificationCard from "./components/NotificationCard";
import { mockNotifications } from "./lib/mockNotifications";

export default function NotificationsPage() {
  return (
    <div className="container py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      <div className="space-y-4">
        {mockNotifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
}
