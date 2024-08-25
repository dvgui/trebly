'use client'

import { useState } from "react"
import { Trophy } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import UsdcIcon from "../ui/usdc"
import { CardHeader } from "../ui/card"
import { Badge } from "../ui/badge"

interface TreblyEmergencyWindowProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (donationPercentage: number) => void
}

export default function WinnerWindow({ isOpen, onClose, onConfirm }: TreblyEmergencyWindowProps) {
  const [donationPercentage, setDonationPercentage] = useState(0)

  const handleConfirm = () => {
    onConfirm(donationPercentage)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white">
      <div className="py-4">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center justify-center">
            <Trophy className="mr-2 h-6 w-6 text-yellow-500" />
            Congratulations!
          </DialogTitle>
          <DialogDescription className="text-center text-gray-300">
            You've won the Trebly giveaway!
          </DialogDescription>
        </DialogHeader>

          <CardHeader className="flex flex-col items-center space-y-4 pt-6">
            <Badge variant="secondary" className="text-2xl py-2 px-6">
              <div className="flex items-center">
                <UsdcIcon />
                <span className="ml-2">5000 USD</span>
              </div>
            </Badge>
          </CardHeader>

          <div className="space-y-4">
            <div className="relative pt-1 space-y-2">
              <p className="flex space-x-2">
                <Trophy className="h-5 w-5 text-green-500" />
                <Label htmlFor="slider" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Donate {donationPercentage}%
                </Label>
              </p>
              <div className="bg-white p-2 rounded-lg shadow-md">
                <Slider
                  id="donation-slider"
                  min={0}
                  max={20}
                  step={1}
                  value={[donationPercentage]}
                  onValueChange={(value: any) => setDonationPercentage(value[0])}
                  className="[&_[role=slider]]:bg-green-500"
                />
              </div>
            </div>
          </div>
          <Button 
            onClick={handleConfirm}
            className="w-full mt-4 py-2 text-xl bg-green-500 text-gray-900 rounded-full hover:bg-green-600"
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}