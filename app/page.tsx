"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Trophy } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Toaster } from "@/components/ui/toaster"
import TreblyDeposit from "@/components/Deposit"

const TimerDisplay = ({ days, hours, minutes, label }: { days: string, hours: string, minutes: string, label: string }) => (
  <div className="flex flex-col items-center">
    <div className="flex space-x-2 mb-2">
      <div className="bg-secondary rounded p-2 w-12 h-12 flex items-center justify-center text-2xl font-bold">{days}</div>
      <div className="bg-secondary rounded p-2 w-12 h-12 flex items-center justify-center text-2xl font-bold">{hours}</div>
      <div className="text-2xl font-bold">:</div>
      <div className="bg-secondary rounded p-2 w-12 h-12 flex items-center justify-center text-2xl font-bold">{minutes}</div>
    </div>
    <div className="text-muted-foreground text-sm">{label}</div>
  </div>
)

export default function Home() {
  const [balance, setBalance] = useState(433)
  const [showDeposit, setShowDeposit] = useState(false)

  const handleDeposit = async (amount: number) => {
    // Here you would typically call an API to process the deposit
    // For this example, we'll just update the balance locally
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setBalance((prevBalance) => prevBalance + amount)
        resolve()
      }, 1000) // Simulating API call delay
    })
  }

  if (showDeposit) {
    return (
      <>
        <TreblyDeposit
          balance={balance}
          onDeposit={handleDeposit}
          onBack={() => setShowDeposit(false)}
        />
        <Toaster />
      </>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground p-4">
      <Card className="w-full max-w-md space-y-6">
        <CardHeader className="flex flex-col items-center space-y-4 pt-6">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-background rounded-full"></div>
          </div>
          <h1 className="text-3xl font-bold">Trebly</h1>
          <Badge variant="secondary" className="text-2xl py-2 px-6">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-2">
              <div className="w-4 h-4 bg-secondary rounded-full"></div>
            </div>
            50 WLD
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-muted-foreground mb-2">Time left to join draw:</div>
            <TimerDisplay days="02" hours="14" minutes="45" label="DAYS HR MIN" />
          </div>

          <div className="text-center">
            <div className="text-muted-foreground mb-2">The prize will be delivered in:</div>
            <TimerDisplay days="33" hours="14" minutes="45" label="DAYS HR MIN" />
          </div>

          <div className="space-y-2 text-center">
            <div className="text-muted-foreground">Total Deposits:</div>
            <div className="text-green-500 text-4xl font-bold">10.000.000 <span className="text-xl">USDC</span></div>
            <div className="text-muted-foreground">Estimated next prize: <span className="text-foreground">33.300 USDC</span></div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between space-x-4">
          <Button variant="outline" className="flex-1 flex flex-col items-center h-auto py-3" onClick={() => setShowDeposit(true)}>
            <ArrowDown className="h-6 w-6 mb-1" />
            <span>Deposit</span>
          </Button>
          <Button variant="outline" className="flex-1 flex flex-col items-center h-auto py-3">
            <ArrowUp className="h-6 w-6 mb-1" />
            <span>Withdraw</span>
          </Button>
          <Button variant="outline" className="flex-1 flex flex-col items-center h-auto py-3">
            <Trophy className="h-6 w-6 mb-1" />
            <span>Awards</span>
          </Button>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  )
}