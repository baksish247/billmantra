import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-4 border-t border-gray-100 bg-white">
      <div className="flex flex-col items-center justify-between space-y-2 tracking-wide font-medium">
      <div className="text-sm text-gray-400 flex justify-center items-center">
          © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_NAME}. All rights reserved.
        </div>
        <div className="flex flex-row text-sm text-gray-600">
          <p>powered by &nbsp;</p> <p className='tracking-widest font-bold text-md text-gray-400'>Xoup.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 