"use client";
import React from 'react';
import { User, ShoppingBag, Truck, Printer, Globe, CreditCard, Bell, Shield, Users, Settings, ChevronRight } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Footer from '@/app/components/footer';
import { useAuth } from '@/app/redux/providers/AuthProvider';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';

const SettingsPage = () => {
  // const user?.user = {
  //   name: "Alex Johnson",
  //   email: "alex@example.com",
  //   role: "Shop Owner",
  //   avatar: "/api/placeholder/80/80"
  // };

  const {user,logoutUser} = useAuth();
 
  

  
  
  
  const settingCategories = [
    {
      title: "Store Management",
      items: [
        { icon: <ShoppingBag size={20} />, label: "Purchases History", path: "/settings/purchaseHistory" },
        { icon: <Truck size={20} />, label: "Suppliers & Vendors", path: "/settings/sellers" },
        { icon: <CreditCard size={20} />, label: "Payment Methods", path: "/settings/payment" },
      ]
    },
    {
      title: "System Settings",
      items: [
        { icon: <Printer size={20} />, label: "Printer Setup", path: "/settings/printer" },
        { icon: <Globe size={20} />, label: "Language & Region", path: "/settings/language" },
        { icon: <Bell size={20} />, label: "Notifications", path: "/settings/notifications" },
      ]
    },
    {
      title: "Account Settings",
      items: [
        { icon: <Shield size={20} />, label: "Security & Privacy", path: "/settings/security" },
        { icon: <Users size={20} />, label: "Staff Access", path: "/settings/staff" },
        { icon: <Settings size={20} />, label: "Advanced Settings", path: "/settings/advanced" },
      ]
    }
  ];

  interface SettingItemProps {
    icon: React.ReactNode;
    label: string;
    path: string;
  }

  const SettingItem = ({ icon, label, path }: SettingItemProps) => (
     <a href={path} className="flex items-center justify-between py-3 px-1 hover:bg-gray-50 rounded-md transition-colors">
    <div className="flex items-center gap-3">
        <div className="text-gray-500">{icon}</div>
        <span className="text-gray-700 font-medium">{label}</span>
      </div>
      <ChevronRight size={18} className="text-gray-400" />
    </a>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-semibold text-gray-800">Settings</h1>
      
      {/* User Profile Section */}
      <Card className="shadow-white border-transparent">
        <CardContent className="">
          <div className="flex items-center">
            <div className="relative">
              <Avatar className="h-20 w-20 border-2 border-blue-500">
                <AvatarImage src="" alt={user?.user?.name} />
                <AvatarFallback className="bg-blue-100 text-blue-800 text-xl">
                  {user?.user.name.split(' ').map(name => name[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                <User size={14} color="white" />
              </div>
            </div>
            
            <div className="ml-6">
              <h2 className="text-xl font-semibold text-gray-800">{user?.user?.name}</h2>
              <p className="text-gray-600">{user?.user?.email}</p>
              <div className="flex items-center mt-2">
                <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                  {user?.user.role}
                </Badge>
                {/* <Button variant="link" className="h-8 ml-2 text-blue-600 p-0">
                  Edit Profile
                </Button> */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Settings Categories */}
      <div className="space-y-6">
        {settingCategories.map((category, index) => (
          <Card key={index} className="border-transparent">
            <CardHeader className="">
              <CardTitle className='text-2xl'>{category.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1">
                {category.items.map((item, itemIndex) => (
                  <React.Fragment key={itemIndex}>
                    <SettingItem 
                      icon={item?.icon} 
                      label={item?.label} 
                      path={item?.path} 
                    />
                    {itemIndex < category.items.length - 1 && (
                      <Separator/>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        variant="default"
        className="w-full mt-6"
        onClick={() => {
          logoutUser();
          window.location.href = '/login';
        }}
      >
        Log Out
      </Button>
      
      {/* App Version */}
      <div className="mt-8 mb-10 text-center text-gray-300 text-sm">
        {/* ShopKeeper Billing App v2.1.0 */}
        <Footer />
      </div>
    </div>
  );
};

export default SettingsPage;

