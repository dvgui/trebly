import { use, useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import TreblySuccess from "../DepositSuccess"
import TrebolIcon from "../ui/logo"
import WorldcoinIcon from "../ui/wordlcoin"
import { usePayment } from "@/hooks/usePayment"
import { addressConfig } from "../../app/config"

interface TreblyDepositProps {
  balance: number
  onDeposit: (amount: number) => Promise<void>
  onBack: () => void
}

export default function TreblyDeposit({ balance, onDeposit, onBack }: TreblyDepositProps) {
  const [depositAmount, setDepositAmount] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  
  const poolAddress = addressConfig.poolAddress;
  const { sendPayment, isProcessing, isPaid} = usePayment();

  const handleMaxClick = () => {
    setDepositAmount(balance.toString())
  }

  const handleDepositClick = async () => {
    const amount = parseFloat(depositAmount)
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to deposit.",
        variant: "destructive",
      })
      return
    }

    await sendPayment({amount: parseFloat(depositAmount), currency: "WLD", destination: poolAddress!})
  }

  useEffect(() => {
    if (isPaid) {
      onDeposit(parseFloat(depositAmount))
      setShowSuccess(true)
    }
  }, [isPaid, onDeposit, depositAmount])
  
  if (showSuccess) {
    return <TreblySuccess onContinue={onBack} />
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white p-4">
      <header className="flex items-center mb-8">
        <Button variant="ghost" size="icon" className="text-[#00FF94]" aria-label="Go back" onClick={onBack}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <TrebolIcon />
          <h1 className="text-2xl font-bold">Trebly</h1>
        </div>

        <div className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-semibold text-center">
            How much WLD<br />do you want to deposit?
          </h2>

          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <WorldcoinIcon className="h-6 w-6 bg-white  rounded-full"/>
            </div>
            <Input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="w-full pl-12 pr-24 py-6 bg-gray-800 border-[#00FF94] rounded-full text-xl"
              placeholder="0 WLD"
              min="0"
              max={balance}
              step="0.1"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <Button 
                className="h-full px-6 rounded-r-full bg-[#00FF94] text-gray-900 hover:bg-[#00FF94]"
                onClick={handleMaxClick}
              >
                MAX
              </Button>
            </div>
          </div>

          <div className="text-center text-gray-400">
            Your participation: {balance} WLD
          </div>

          <Button 
            className="w-full py-6 text-xl bg-[#00FF94] text-gray-900 rounded-full hover:bg-[#00FF94]"
            onClick={handleDepositClick}
            disabled={isProcessing}
          >
            {isProcessing ? "Depositing..." : "Deposit"}
          </Button>
        </div>
      </main>
    </div>
  )
}
