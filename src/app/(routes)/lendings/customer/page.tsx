// /app/customer/page.js
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  ArrowLeft, Phone, Mail, MapPin, Calendar, Clock, Plus, ChevronRight,
  Minus,
  ChevronLeft
} from 'lucide-react';
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from '@/components/ui/textarea';
import { useFetchLendingByCustomerId, useUpdateLending } from '@/api-config/services/lendingService';
import { useAuth } from '@/app/redux/providers/AuthProvider';

// Define types
type Payment = {
  _id: string;
  amount: number;
  date: string;
};

type Customer = {
  _id: string;
  lent_amount: number;
  paid_amount: number;
  remaining_amount: number;
  shop_id: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  customer_id: string;
  is_paid: boolean;
  payment_timeline: Payment[];
  createdAt: string;
};

type NewTransaction = {
  type: 'added' | 'paid';
  amount: string;
  note: string;
};

const CustomerDetailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lendingId = searchParams.get('id');
  const customerId = searchParams.get('customerId');
  const { user, token } = useAuth();
  const { data, isLoading, error } = useFetchLendingByCustomerId(
    user?.shop?.id ?? "",
    customerId ?? "",
    token ?? ""
  );
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [transactionDialogOpen, setTransactionDialogOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState<NewTransaction>({ 
    type: 'paid', 
    amount: '', 
    note: '' 
  });

  useEffect(() => {
    if (data) {
      setCustomer(data);
    }
  }, [data]);

  const handleGoBack = () => router.push('/lendings');

  const {mutateAsync:updateLending,isError,isLoading:isUpdatingLending} = useUpdateLending();

  const handleAddTransaction = async() => {
    if (!customer || !newTransaction.amount) return;
    //console.log('Adding transaction:', newTransaction);

    const payload={
      "lent_amount": newTransaction.type === 'added' ? parseFloat(newTransaction.amount) : undefined,
      "paid_amount": newTransaction.type === 'paid' ? parseFloat(newTransaction.amount) : undefined,
    }

    await updateLending({lendingId:lendingId ?? "",data:payload,token:token ?? ""});

    setTransactionDialogOpen(false);
    // setNewTransaction({ type: 'paid', amount: '', note: '' });
  };

  // Component for transaction card on mobile
  const TransactionCard = ({ payment }: { payment: Payment }) => {
    const date = new Date(payment.date);
    return (
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-medium">{date.toISOString().split('T')[0]}</p>
              <p className="text-xs text-gray-500 flex items-center">
                <Clock size={12} className="mr-1" /> 
                {date.toTimeString().split(' ')[0].substr(0, 5)}
              </p>
            </div>
            <Badge variant="secondary" className="bg-red-50 text-red-700">
              Payment
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-700">{newTransaction.note || 'Payment'}</p>
            <p className="font-medium text-red-700">
              -{payment.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) return <div className="container mx-auto py-12 px-4 text-center"><p>Loading customer details...</p></div>;
  if (error || !customer) return <div className="container mx-auto py-12 px-4 text-center"><p>Error loading customer details</p></div>;

  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="ghost" className="mb-6" onClick={handleGoBack}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Lendings
      </Button>

      {/* Profile & Transaction Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-1">
          <CardHeader><CardTitle>Customer Profile</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={`/api/placeholder/64/64`} />
              <AvatarFallback className="text-xl">{customer.shop_id.name[0]}</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold mb-1">{customer.shop_id.name}</h2>
            <Badge 
              variant={customer.remaining_amount >= 0 ? "outline" : "secondary"} 
              className={`mb-4 ${customer.remaining_amount >= 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
            >
              Remaining: {customer.remaining_amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </Badge>
            <div className="w-full space-y-3">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                <span>{customer.shop_id.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                <span>{customer.shop_id.email}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span>Created {new Date(customer.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>View and manage customer transactions</CardDescription>
            </div>
            <Dialog open={transactionDialogOpen} onOpenChange={setTransactionDialogOpen}>
              <DialogTrigger asChild>
                <Button><Plus className="mr-2 h-4 w-4" /> Add Transaction</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Transaction</DialogTitle>
                  <DialogDescription>Record a new transaction</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Transaction Type</Label>
                    <RadioGroup 
                      value={newTransaction.type} 
                      onValueChange={(value: 'added' | 'paid') => 
                        setNewTransaction({...newTransaction, type: value})
                      } 
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="added" id="added" />
                        <Label htmlFor="added" className="flex items-center">
                          <Plus className="h-4 w-4 mr-1 text-green-600" /> Added to credit
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="paid" id="paid" />
                        <Label htmlFor="paid" className="flex items-center">
                          <Minus className="h-4 w-4 mr-1 text-red-600" /> Payment received
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-[6px]">₹</span>
                      <Input 
                        id="amount" 
                        type="number" 
                        className="pl-7" 
                        placeholder="0.00" 
                        value={newTransaction.amount} 
                        onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                      />
                    </div>
                  </div>
                  {/* <div className="space-y-2">
                    <Label htmlFor="note">Note (Optional)</Label>
                    <Textarea 
                      id="note" 
                      placeholder="Add additional details about this transaction" 
                      value={newTransaction.note} 
                      onChange={(e) => setNewTransaction({...newTransaction, note: e.target.value})}
                    />
                  </div> */}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setTransactionDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleAddTransaction} 
                    disabled={!newTransaction.amount}
                  >
                    Save Transaction
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Transactions</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {/* Desktop Table View - Hidden on mobile */}
                <div className="rounded-md border hidden md:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead>Note</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customer.payment_timeline.map(payment => {
                        const date = new Date(payment.date);
                        return (
                          <TableRow key={payment._id}>
                            <TableCell>
                              <div className="font-medium">{date.toISOString().split('T')[0]}</div>
                              <div className="text-xs text-gray-500 flex items-center">
                                <Clock size={12} className="mr-1" /> 
                                {date.toTimeString().split(' ')[0].substr(0, 5)}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary" className="bg-red-50 text-red-700">
                                Payment
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right font-medium text-red-700">
                              -{payment.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                            </TableCell>
                            <TableCell>
                              <span className="text-gray-700">{newTransaction.note || 'Payment'}</span>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Card View - Hidden on desktop */}
                <div className="md:hidden space-y-2">
                  {customer.payment_timeline.map(payment => (
                    <TransactionCard key={payment._id} payment={payment} />
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Showing {customer.payment_timeline.length} transactions
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDetailPage;