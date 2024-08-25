import { useState } from "react"
import { ArrowLeft, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import TreblyWithdrawSuccess from "../WithdrawSuccess"
import TrebolIcon from "../ui/logo"
import UsdcIcon from "../ui/usdc"
import { Input } from "../ui/input"
import { toast } from "../ui/use-toast"

interface TreblyWithdrawProps {
  balance: number
  onWithdraw: (amount: number) => Promise<void>
  onBack: () => void
}

export default function TreblyWithdraw({ balance, onWithdraw, onBack }: TreblyWithdrawProps) {
  const [showSuccess, setShowSuccess] = useState(false)
  const [isWithdraw, setIsWithdraw] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState("")

  const handleMaxClick = () => {
    setWithdrawAmount(balance.toString())
  }

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount)
    if (isNaN(amount) || amount <= 0 || amount > balance) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to deposit.",
        variant: "destructive",
      })
      return
    }

    setIsWithdraw(true)
    try {
      await onWithdraw(amount)
      setShowSuccess(true)
    } catch (error) {
      toast({
        title: "Deposit failed",
        description: "There was an error processing your deposit. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsWithdraw(false)
    }
  }

  if (showSuccess) {
    return <TreblyWithdrawSuccess onContinue={onBack} />
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white p-4">
      <header className="flex items-center mb-8">
        <Button variant="ghost" size="icon" className="text-green-500" aria-label="Go back" onClick={onBack}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <TrebolIcon />
          <h1 className="text-2xl font-bold">Trebly</h1>
        </div>

        <div className="w-full max-w-md space-y-6">
          <h2 className="text-xl font-semibold text-center">
            Total deposited in Trebly
          </h2>

          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <UsdcIcon className="h-6 w-6" />
            </div>
            <Input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="w-full pl-12 pr-24 py-6 bg-gray-800 border-green-500 rounded-full text-xl"
              placeholder="0 WLD"
              min="0"
              max={balance}
              step="0.1"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <Button 
                className="h-full px-6 rounded-r-full bg-green-500 text-gray-900 hover:bg-green-600"
                onClick={handleMaxClick}
              >
                MAX
              </Button>
            </div>
          </div>

          <div className="text-center text-gray-400">
            Balance: {balance} WLD
          </div>

          <Button 
            className="w-full py-6 text-xl bg-green-500 text-gray-900 rounded-full hover:bg-green-600"
            onClick={handleWithdraw}
            disabled={isWithdraw}
          >
            {isWithdraw? "Withdrawing..." : "Withdraw"}
          </Button>
        </div>
      </main>
    </div>
  )
}