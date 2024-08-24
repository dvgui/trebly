"use client"

import { useEffect, useState } from "react"
import { ArrowDown, ArrowUp, Trophy } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Toaster } from "@/components/ui/toaster"
import TreblyDeposit from "@/components/Deposit"
import TreblyWithdraw from "@/components/Withdraw"
import { useToast } from "@/components/ui/use-toast"
import TreblyAwards from "@/components/Awards"
import TrebolIcon from "@/components/ui/logo"
import WorldcoinIcon from "@/components/ui/wordlcoin"

const MockUpAwardData = {
  impactFunding: 18,
  contributors: 80,
  treblyPlatform: 2,
  winners: [
    { address: "0x56...5a5d", date: "23/04/24", prize: "25k USDC" },
    { address: "0x56...5a3c", date: "23/03/24", prize: "22k USDC" },
    { address: "0x56...5a1g", date: "23/02/24", prize: "21k USDC" },
    { address: "0x56...5a6s", date: "23/01/24", prize: "15k USDC" },
    { address: "0x56...5a2g", date: "23/11/23", prize: "23k USDC" },
  ]
}

const TimerDisplay = ({ days, hours, minutes, seconds, label }: { days: string, hours: string, minutes: string, seconds: string, label: string }) => (
  <div className="flex flex-col items-center">
    <div className="flex space-x-2 mb-2">
      <div className="bg-[#293852] text-[#00FF94] rounded p-2 w-12 h-12 flex items-center justify-center text-2xl font-bold">{days}</div>
      <div className=" text-2xl font-bold">:</div>
      <div className="bg-[#293852] text-[#00FF94] rounded p-2 w-12 h-12 flex items-center justify-center text-2xl font-bold">{hours}</div>
      <div className="text-2xl font-bold">:</div>
      <div className="bg-[#293852] text-[#00FF94] rounded p-2 w-12 h-12 flex items-center justify-center text-2xl font-bold">{minutes}</div>
      <div className="text-2xl font-bold">:</div>
      <div className="bg-[#293852] text-[#00FF94] rounded p-2 w-12 h-12 flex items-center justify-center text-2xl font-bold">{seconds}</div>
    </div>
    <div className="text-muted-foreground text-sm text-white">{label}</div>
  </div>
)


export default function Home() {
  const [balance, setBalance] = useState(433)
  const [showDeposit, setShowDeposit] = useState(false)
  const [showWithdraw, setShowWithdraw] = useState(false)
  const [showAwards, setShowAwards] = useState(false)
  const { toast } = useToast()

  // Countdoewn to join draw
  const dateLeftToJoinDraw = new Date("2024-08-27").getTime() 
  const datePrizeDelivery = new Date("2024-08-30").getTime()

  const calculateTimeLeft = (targetDate: number) => {
    const difference = targetDate - new Date().getTime();
  
    let timeLeft = { days: "00", hours: "00", minutes: "00", seconds: "00" };
  
    if (difference > 0) {
      timeLeft = {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
        hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0"),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
      };
    }
  
    return timeLeft;
  };
  

  const [timeLeftToJoinDraw, setTimeLeftToJoinDraw] = useState(calculateTimeLeft(dateLeftToJoinDraw));
  const [timeLeftToPrizeDelivery, setTimeLeftToPrizeDelivery] = useState(calculateTimeLeft(datePrizeDelivery));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeftToJoinDraw(calculateTimeLeft(dateLeftToJoinDraw));
      setTimeLeftToPrizeDelivery(calculateTimeLeft(datePrizeDelivery));
    }, 1000);

    return () => clearInterval(timer);
  }, [dateLeftToJoinDraw, datePrizeDelivery]);
  
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

  const handleWithdraw = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setBalance(0) // Reset balance to 0 after withdrawal
        toast({
          title: "Withdrawal Successful",
          description: "Your funds have been withdrawn.",
        })
        resolve()
      }, 1000)
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

  if (showWithdraw) {
    return (
      <>
        <TreblyWithdraw
          totalDeposited={balance}
          onWithdraw={handleWithdraw}
          onBack={() => setShowWithdraw(false)}
        />
        <Toaster />
      </>
    )
  }

  if (showAwards) {
    return (
      <>
        <TreblyAwards
          impactFunding={MockUpAwardData.impactFunding}
          contributors={MockUpAwardData.contributors}
          treblyPlatform={MockUpAwardData.treblyPlatform}
          winners={MockUpAwardData.winners}
          onBack={() => setShowAwards(false)}
        />
        <Toaster />
      </>
    )
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-900 text-white p-6">
        <CardHeader className="flex flex-col items-center space-y-4 pt-6">
        <TrebolIcon />
          <h1 className="text-3xl font-bold">Trebly</h1>
          <Badge variant="secondary" className="text-2xl py-2 px-6">
          <div className="flex items-center">
            <WorldcoinIcon className="mr-2" />
            <span className="ml-2">{balance} WLD</span>
          </div>
          </Badge>
          <div className="text-muted-foreground text-white">Your balance</div>            
        </CardHeader>

        <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-muted-foreground mb-2 text-white">Time left to join draw:</div>
          <TimerDisplay
            days={timeLeftToJoinDraw.days}
            hours={timeLeftToJoinDraw.hours}
            minutes={timeLeftToJoinDraw.minutes}
            seconds={timeLeftToJoinDraw.seconds}
            label="DAYS HR MIN"
          />
        </div>

        <div className="text-center">
          <div className="text-muted-foreground mb-2 text-white">The prize will be delivered in:</div>
          <TimerDisplay
            days={timeLeftToPrizeDelivery.days}
            hours={timeLeftToPrizeDelivery.hours}
            minutes={timeLeftToPrizeDelivery.minutes}
            seconds={timeLeftToPrizeDelivery.seconds}
            label="DAYS HR MIN"
          />
        </div>

          <div className="space-y-2 text-center">
            <div className="text-muted-foreground text-white">Total Deposits:</div>
            <div className="text-green-500 text-4xl font-bold">10.000.000 <span className="text-xl">USDC</span></div>
            <div className="text-muted-foreground text-white">Estimated next prize: 33.300 USDC</div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between space-x-4">
          <Button 
            variant="secondary"
            className="flex-1 flex flex-col items-center h-auto py-3 bg-green-500 text-gray-900 rounded-2xl hover:bg-green-600"
            onClick={() => setShowDeposit(true)}
          >
            <ArrowDown className="h-8 w-8 mb-1" />
            <span>Deposit</span>
          </Button>
          <Button 
            variant="secondary"
            className="flex-1 flex flex-col items-center h-auto py-3 bg-green-500 text-gray-900 rounded-2xl hover:bg-green-600"
            onClick={() => setShowWithdraw(true)}
          >
            <ArrowUp className="h-8 w-8 mb-1" />
            <span>Withdraw</span>
          </Button>
          <Button 
  variant="secondary"
  className="flex-1 flex flex-col items-center h-auto py-3 bg-green-500 text-gray-900 rounded-2xl hover:bg-green-600"
  onClick={() => setShowAwards(true)}
>
  <Trophy className="h-8 w-8 mb-1" />
  <span>Awards</span>
</Button> 
        </CardFooter>
      <Toaster />
    </div>
  )
}