import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TreblyWithdrawSuccessProps {
  onContinue: () => void
}

export default function TreblyWithdrawSuccess({ onContinue }: TreblyWithdrawSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-gray-900 rounded-full"></div>
          </div>
          <h1 className="text-2xl font-bold">Trebly</h1>
        </div>

        <div className="flex justify-center">
          <div className="w-24 h-24 bg-green-500 rounded-lg flex items-center justify-center">
            <Check className="w-16 h-16 text-gray-900" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Congratulations!</h2>
          <p className="text-xl">
            You have successfully<br />withdrawn your funds!
          </p>
        </div>

        <Button 
          onClick={onContinue}
          className="w-full py-6 text-xl bg-green-500 text-gray-900 rounded-full hover:bg-green-600"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}