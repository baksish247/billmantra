'use client'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import StaffTable from "./StaffTable";
import StaffForm from "./StaffForm";
import { StaffMember } from "./data";

export default function StaffAccessPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editStaff, setEditStaff] = useState<StaffMember | null>(null);

  return (
    <div className="container py-6 max-w-4xl space-y-4 bg-">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Staff Access</CardTitle>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add Staff</Button>
            </DialogTrigger>
            <DialogContent>
              <StaffForm
                staff={editStaff}
                onClose={() => {
                  setEditStaff(null);
                  setDialogOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <StaffTable onEdit={(staff) => {
            setEditStaff(staff);
            setDialogOpen(true);
          }} />
        </CardContent>
      </Card>
    </div>
  );
}
