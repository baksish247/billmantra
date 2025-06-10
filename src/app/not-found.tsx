// app/not-found.js
"use client";
import React from 'react';
import Link from 'next/link';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full shadow-lg">
        <CardContent className="pt-6 px-6 pb-8">
          <div className="flex flex-col items-center text-center">
            <div className="rounded-full bg-red-100 p-4 mb-4">
              <AlertCircle size={40} className="text-red-600" />
            </div>
            
            <h1 className="text-5xl font-bold text-gray-800 mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
            
            <p className="text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Button asChild className="flex-1">
                <Link href="/">
                  <Home size={18} className="mr-2" />
                  Back to Home
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => window.history.back()}
              >
                <ArrowLeft size={18} className="mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}