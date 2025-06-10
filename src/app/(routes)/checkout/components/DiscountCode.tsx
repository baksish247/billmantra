"use client"
import React, { useState } from 'react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
type DiscountCodeProps = {
    setIsDiscountApplied: React.Dispatch<React.SetStateAction<boolean>>
    isDiscountApplied: boolean
    setDiscountType: React.Dispatch<React.SetStateAction<string>>
    discountType: string
    setDiscountValue: React.Dispatch<React.SetStateAction<string>>
    discountValue: string
}
const DiscountCode = ({isDiscountApplied,setIsDiscountApplied,discountType,discountValue,setDiscountType,setDiscountValue}:DiscountCodeProps) => {

  const handleDiscountToggle = (checked: boolean): void => {
    setIsDiscountApplied(checked)
    if (!checked) {
      setDiscountValue('')
    }
  }

  return (
    <Card className="w-full max-w-full mx-auto pt-0 ">
      <CardHeader className="bg-primary p-4 text-primary-foreground rounded-t-lg">
        <CardTitle className="text-sm font-semibold">Discount Code</CardTitle>
      </CardHeader>
      <CardContent className="p-5 space-y-5">
        <div className="flex items-center space-x-2">
          <Switch
            id="discount-toggle"
            checked={isDiscountApplied}
            onCheckedChange={handleDiscountToggle}
          />
          <Label htmlFor="discount-toggle" className="text-sm font-medium">
            Apply Discount
          </Label>
        </div>
        
        {isDiscountApplied && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="discount-type" className="text-xs font-medium">
                Discount Type
              </Label>
              <Select value={discountType} onValueChange={setDiscountType}>
                <SelectTrigger id="discount-type">
                  <SelectValue placeholder="Select discount type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage on Subtotal</SelectItem>
                  <SelectItem value="amount">Fixed Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="discount-value" className="text-xs font-medium">
                {discountType === 'percentage' ? 'Percentage (%)' : 'Amount (₹)'}
              </Label>
              <Input
                id="discount-value"
                type="number"
                placeholder={discountType === 'percentage' ? 'Enter percentage' : 'Enter amount'}
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                className="text-sm"
                min="0"
                max={discountType === 'percentage' ? '100' : undefined}
                step={discountType === 'percentage' ? '0.1' : '0.01'}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default DiscountCode