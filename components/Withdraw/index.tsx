import { useState } from "react"
import { ArrowLeft, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import TreblyWithdrawSuccess from "../WithdrawSuccess"
import TrebolIcon from "../ui/logo"

interface TreblyWithdrawProps {
  totalDeposited: number
  onWithdraw: () => Promise<void>
  onBack: () => void
}

export default function TreblyWithdraw({ totalDeposited, onWithdraw, onBack }: TreblyWithdrawProps) {
  const [showSuccess, setShowSuccess] = useState(false)

  const handleWithdraw = async () => {
    await onWithdraw()
    setShowSuccess(true)
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

          <div className="bg-gray-800 rounded-full py-3 px-6 flex items-center justify-center space-x-4">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold">{totalDeposited} WLD</span>
          </div>

          <Button 
            className="w-full py-6 text-xl bg-green-500 text-gray-900 rounded-full hover:bg-green-600"
            onClick={handleWithdraw}
          >
            Withdraw
          </Button>
        </div>
      </main>
    </div>
  )
}