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
          <h2 className="text-xl font-semibold flex items-center justify-center">
            Prize distribution <DollarSign className="ml-2 h-5 w-5" />
          </h2>

          <div className="space-y-2">
            <p className="flex justify-between">
              <span className="text-green-500">Impact Funding: {impactFunding}%</span>
              <Trophy className="h-5 w-5 text-green-500" />
            </p>
            <p className="flex justify-between">
              <span>Contributors: {contributors}%</span>
              <Users className="h-5 w-5" />
            </p>
            <p>Trebly platform: {treblyPlatform}%</p>
          </div>

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