"use client"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import Sidebar from "./components/sidebar"
import { useState } from "react"
import CartDetailsBar from "./components/cart-details-bar"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {

  
  

  return (
    <div className="flex  bg-background">
      {/* Fixed Sidebar - 1/4 width */}
      <div className="w-1/5  overflow-hidden text-wrap bg-white flex flex-col">
      <Sidebar />
      </div>

      {/* Main Content - 3/4 width with independent scrolling */}
      <ScrollArea className="w-4/5 h-screen">
        <div className="p-2">

          {children}
        </div>
      </ScrollArea>
      {/* Footer - Fixed at the bottom of the screen */}
      <CartDetailsBar/>
    </div>
  )
}