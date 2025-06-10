export type StaffMember = {
    id: string;
    name: string;
    phone: string;
    role: "Manager" | "Cashier" | "Stock Keeper";
    enabled: boolean;
  };
  
  export const initialStaff: StaffMember[] = [
    {
      id: "1",
      name: "Ravi Kumar",
      phone: "9876543210",
      role: "Manager",
      enabled: true,
    },
    {
      id: "2",
      name: "Anita Das",
      phone: "9123456780",
      role: "Cashier",
      enabled: false,
    },
  ];
  