"use client"
import { useModal } from "@/hooks/use-modal-store"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { useState } from "react"
import { Separator } from "../ui/separator"
import axios from "axios"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

const PLANS = [
  {
    "name": "Free",
    "price": "USD $0/month",
    "action": "Your current Plan",
    "description": "For people just getting started with GoogleGPT",
    "features": [
      "Unlimited messages, interactions, and history",
      "Access to our GPT-3.5 model",
      "Access on Web, iOS, and Android"
    ]
  },
  {
    "name": "Plus",
    "price": "USD $20/month",
    "action": "Upgrade to Plus",
    "description": "Everything in Free, and:",
    "features": [
      "Access to GPT-4, our most capable model",
      "Browse, create, and use GPTs",
      "Access to additional tools like DALL·E, Browsing, Advanced Data Analysis and more"
    ]
  },
  {
    "name": "Team",
    "price": "USD $25 per person/month*",
    "action": "Upgrade to Team",
    "description": "Everything in Plus, and:",
    "features": [
      "Higher message caps on GPT-4 and tools like DALL·E, Browsing, Advanced Data Analysis, and more",
      "Create and share GPTs with your workspace",
      "Admin console for workspace management",
      "Team data excluded from training by default"
    ]
  }
]

export const PricingModal = () => {
  const { isOpen, onClose, type } = useModal()
  const isModalOpen = isOpen && type === "pricing"
  const router = useRouter()

  const handleUpgrade = async (plan: string) => {
    try {
      const response = await axios.post('/api/checkout', { plan })
      router.push(response.data.url)
    } catch (error) {
      console.error('Error upgrading plan:', error)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1E1E1E] text-white border-none">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Upgrade to GoogleGPT Plus</DialogTitle>
          <DialogDescription className="text-center text-zinc-400">
            Choose the plan that's right for you
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {PLANS.map((plan) => (
            <div key={plan.name} className="border border-zinc-700 rounded-lg p-4">
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="text-2xl font-bold mt-2">{plan.price}</p>
              <p className="text-sm text-zinc-400 mt-1">{plan.description}</p>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full mt-4"
                variant={plan.name === "Free" ? "outline" : "default"}
                onClick={() => handleUpgrade(plan.name)}
              >
                {plan.action}
              </Button>
            </div>
          ))}
        </div>
        <Separator className="h-[1px] bg-gray-700" />
        <p className="text-center text-sm">Need more capabilities? See <span className={cn(buttonVariants({variant: "link"}), 'cursor-pointer')}>GoogleGPT Enterprise</span></p>
      </DialogContent>
    </Dialog>
  )
}