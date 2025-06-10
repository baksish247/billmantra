"use client"
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface AddLendingProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLending: (lendingData: {
    customer_id: { name: string; phone: string };
    lent_amount: number;
    shop_id: string;
  }) => void;
  shopId: string;
}

const AddLending = ({ isOpen, onClose, onAddLending, shopId }: AddLendingProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    lent_amount: '',
  });
  const [errors, setErrors] = useState({ name: '', phone: '', lent_amount: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', phone: '', lent_amount: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
      isValid = false;
    }

    if (!formData.lent_amount) {
      newErrors.lent_amount = 'Lent amount is required';
      isValid = false;
    } else if (isNaN(Number(formData.lent_amount)) || Number(formData.lent_amount) <= 0) {
      newErrors.lent_amount = 'Lent amount must be a positive number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onAddLending({
        customer_id: {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
        },
        lent_amount: Number(formData.lent_amount),
        shop_id: shopId,
      });
      toast('New lending added successfully');
      setFormData({ name: '', phone: '', lent_amount: '' });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Lending</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Customer Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter customer name"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter 10-digit phone number"
                type="tel"
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lent_amount">Lent Amount (INR)</Label>
              <Input
                id="lent_amount"
                name="lent_amount"
                value={formData.lent_amount}
                onChange={handleChange}
                placeholder="Enter amount"
                type="number"
                step="0.01"
                className={errors.lent_amount ? 'border-red-500' : ''}
              />
              {errors.lent_amount && <p className="text-sm text-red-500">{errors.lent_amount}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              <Plus className="mr-2 h-4 w-4" /> Add Lending
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLending;