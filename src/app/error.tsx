// app/error.js
'use client'; // Error components must be Client Components

import React from 'react';
import Link from 'next/link';
import { XCircle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ErrorProps {
  error: Error; // Replace 'Error' with a more specific type if needed
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full shadow-lg">
        <CardContent className="pt-6 px-6 pb-8">
          <div className="flex flex-col items-center text-center">
            <div className="rounded-full bg-amber-100 p-4 mb-4">
              <XCircle size={40} className="text-amber-600" />
            </div>

            <h1 className="text-5xl font-bold text-gray-800 mb-2">Error</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Something went wrong</h2>

            <p className="text-gray-600 mb-8">
              We encountered an error while processing your request. Please try again.
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
                onClick={() => reset()}
              >
                <RefreshCw size={18} className="mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}