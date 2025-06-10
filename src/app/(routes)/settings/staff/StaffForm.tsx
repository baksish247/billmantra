    "use client";

import { StaffMember } from "./data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";

type Props = {
  staff?: StaffMember | null;
  onClose: () => void;
};

export default function StaffForm({ staff, onClose }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<StaffMember["role"]>("Cashier");

  useEffect(() => {
    if (staff) {
      setName(staff.name);
      setPhone(staff.phone);
      setRole(staff.role);
    }
  }, [staff]);

  const handleSubmit = () => {
    // You would save the staff data here (to backend or state)
    //console.log("Saving Staff:", { name, phone, role });
    onClose();
  };

  return (
    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <div className="space-y-2">
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label>Phone</Label>
        <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label>Role</Label>
        <Select value={role} onValueChange={(v) => setRole(v as StaffMember["role"])}>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Manager">Manager</SelectItem>
            <SelectItem value="Cashier">Cashier</SelectItem>
            <SelectItem value="Stock Keeper">Stock Keeper</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">Save</Button>
    </form>
  );
}
