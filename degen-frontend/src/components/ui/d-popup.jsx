import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useRef, useState } from "react"

const TransferPopup = ({ onClick }) => {
  const [disabled, setDisabled] = useState(false)
  const amountRef = useRef(null);
  const addressRef = useRef(null);

  const click = async () => {
    setDisabled(true)
    await onClick(addressRef.current.value, amountRef.current.value)
    setDisabled(false)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Transfer</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-muted-foreground text-xs pb-2">Confirm Transfer Amount</p>
        <Input className="mb-2" placeholder="To (address)" ref={addressRef} />
        <div className="flex gap-2">
          <Input placeholder="Amount" ref={amountRef} required />
          <Button disabled={disabled} onClick={click}>Transfer</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

const BurnPopup = ({ onClick }) => {
  const [disabled, setDisabled] = useState(false)
  const amountRef = useRef(null);

  const click = async () => {
    setDisabled(true)
    await onClick(amountRef.current.value)
    setDisabled(false)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Burn</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-muted-foreground text-xs">Confirm Burn Amount</p>
        <div className="flex gap-2">
          <Input placeholder="Amount" ref={amountRef} />
          <Button disabled={disabled} onClick={click}>Burn</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { TransferPopup, BurnPopup };