import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import TrebolIcon from "../ui/logo"

interface TreblySuccessProps {
  onContinue: () => void
}

export default function TreblyDepositSuccess({ onContinue }: TreblySuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <TrebolIcon />
          <h1 className="text-2xl font-bold">Trebly</h1>
        </div>

        <div className="flex justify-center">
          <div className="w-32 h-32 bg-[#00FF94] rounded-lg flex items-center justify-center">
            <Check className="w-20 h-20 text-gray-900" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Congratulations!</h2>
          <p className="text-xl">
            You are now participating in<br />the next Trebly draw!
          </p>
        </div>

        <Button 
          onClick={onContinue}
          className="w-full py-6 text-xl bg-[#00FF94] text-gray-900 rounded-full hover:bg-[#00FF94]"
        >
          Back to Menu
        </Button>
      </div>
    </div>
  )
}