"use client";

import { useState } from "react";
import { initialStaff, StaffMember } from "./data";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Trash, Pencil } from "lucide-react";

export default function StaffTable({ onEdit }: { onEdit: (staff: StaffMember) => void }) {
  const [staffList, setStaffList] = useState(initialStaff);

  const toggleAccess = (id: string) => {
    setStaffList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const removeStaff = (id: string) => {
    setStaffList((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-2">
      {staffList.map((staff) => (
        <div
          key={staff.id}
          className="flex items-center justify-between border rounded-lg p-3"
        >
          <div>
            <div className="font-semibold">{staff.name}</div>
            <div className="text-sm text-muted-foreground">{staff.role} — {staff.phone}</div>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={staff.enabled} onCheckedChange={() => toggleAccess(staff.id)} />
            <Button variant="ghost" size="icon" onClick={() => onEdit(staff)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => removeStaff(staff.id)}>
              <Trash className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
