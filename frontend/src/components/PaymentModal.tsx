"use client"

import { useState, ChangeEvent, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Loader2, CreditCard, Landmark, Wallet } from "lucide-react"
import api from "../services/api"

interface ProjectCreator {
  _id: string;
  name: string;
}

interface Reward {
  _id: string;
  title: string;
  description: string;
  amount: number;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  goalAmount: number;
  currentAmount: number;
  createdBy: ProjectCreator;
  endDate: string;
}

interface CardDetails {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvc: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  selectedReward: Reward | null;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, project, selectedReward }) => {
  const { user } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

  const [amount, setAmount] = useState<number>(selectedReward ? selectedReward.amount : 10)
  const [paymentMethod, setPaymentMethod] = useState<string>("card")
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: "",
  })

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value > 0) {
      setAmount(value)
    }
  }

  const handleCardDetailsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to back this project",
        variant: "destructive",
      })
      navigate("/login")
      return
    }

    setIsProcessing(true)

    try {
      // In a real app, you would integrate with a payment processor like Stripe here
      const response = await api.post("/payments/process", {
        projectId: project._id,
        amount,
        rewardId: selectedReward?._id || null,
        paymentMethod,
        // Only include card details in a real app with proper encryption
      })

      toast({
        title: "Payment successful!",
        description: "Thank you for backing this project.",
        variant: "success",
      })

      // Close modal and refresh page to show updated funding
      onClose()
      window.location.reload()
    } catch (error: any) {
      toast({
        title: "Payment failed",
        description: error.response?.data?.message || "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Back this project</DialogTitle>
          <DialogDescription>Support "{project.title}" and help bring this project to life.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {selectedReward ? (
              <div className="bg-muted p-4 rounded-md mb-2">
                <h4 className="font-medium mb-1">Selected reward: {selectedReward.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{selectedReward.description}</p>
                <p className="font-medium">Pledge amount: ${selectedReward.amount}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="amount">Pledge amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="amount"
                    type="number"
                    min="1"
                    value={amount}
                    onChange={handleAmountChange}
                    className="pl-8"
                  />
                </div>
              </div>
            )}

            <Separator className="my-2" />

            <div className="space-y-2">
              <Label>Payment method</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2">
                <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                    <CreditCard className="h-4 w-4" />
                    Credit/Debit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer">
                    <Wallet className="h-4 w-4" />
                    PayPal
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted">
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer">
                    <Landmark className="h-4 w-4" />
                    Bank Transfer
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {paymentMethod === "card" && (
              <div className="space-y-4 mt-2">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card number</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.cardNumber}
                    onChange={handleCardDetailsChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on card</Label>
                  <Input
                    id="cardName"
                    name="cardName"
                    placeholder="John Doe"
                    value={cardDetails.cardName}
                    onChange={handleCardDetailsChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry date</Label>
                    <Input
                      id="expiry"
                      name="expiry"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={handleCardDetailsChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      name="cvc"
                      placeholder="123"
                      value={cardDetails.cvc}
                      onChange={handleCardDetailsChange}
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isProcessing}>
              Cancel
            </Button>
            <Button type="submit" disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                `Pay $${selectedReward ? selectedReward.amount : amount}`
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentModal 