import { ArrowLeft, DollarSign, Trophy, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import TrebolIcon from "../ui/logo"
import { Label } from "@radix-ui/react-label"
import { Slider } from "../ui/slider"
import { useState } from "react"
import { CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import UsdcIcon from "../ui/usdc"

interface Winner {
  address: string
  date: string
  prize: string
}

interface TreblyAwardsProps {
  impactFunding: number
  contributors: number
  treblyPlatform: number
  winners: Winner[]
  onBack: () => void
}

export default function TreblyAwards({
  impactFunding,
  contributors,
  treblyPlatform,
  winners,
  onBack
}: TreblyAwardsProps) {
  const [donatePercentage, setDonatePercentaje] = useState(0)

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white p-4">
      <header className="flex items-center mb-8">
        <Button variant="ghost" size="icon" className="text-green-500" aria-label="Go back" onClick={onBack}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </header>

      <main className="flex-grow flex flex-col items-center space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <TrebolIcon />
          <h1 className="text-2xl font-bold">Trebly</h1>
        </div>

        <div className="w-full max-w-md space-y-6">
          <CardHeader className="flex flex-col items-center space-y-4 pt-6">
            <CardTitle className="text-2xl font-bold">Prize</CardTitle>
            <Badge variant="secondary" className="text-2xl py-2 px-6">
              <div className="flex items-center">
                <UsdcIcon />
                <span className="ml-2">5000 USD</span>
              </div>
            </Badge>
          </CardHeader>
          
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              Last winners <Trophy className="ml-2 h-5 w-5 text-yellow-500" />
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-green-500">Winner</TableHead>
                  <TableHead className="text-green-500">Date</TableHead>
                  <TableHead className="text-green-500">Prize</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {winners.map((winner, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{winner.address}</TableCell>
                    <TableCell>{winner.date}</TableCell>
                    <TableCell>{winner.prize}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  )
}