import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import TrebolIcon from "../ui/logo"

interface TreblySignInProps {
  onSignIn: () => void
}

export default function TreblySignIn({ onSignIn }: TreblySignInProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <TrebolIcon />
          <h1 className="text-4xl font-bold">Trebly</h1>
        </div>

        <h2 className="text-2xl font-semibold text-center">
          Welcome to Trebly
        </h2>

        <Button 
          onClick={onSignIn}
          className="w-full py-6 text-xl bg-green-500 text-gray-900 rounded-full hover:bg-green-600"
        >
          <LogIn className="mr-2 h-6 w-6" /> Sign In
        </Button>
      </div>
    </div>
  )
}