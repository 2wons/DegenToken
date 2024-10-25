'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState, useEffect } from "react";

import { ethers } from "ethers";
import degenAbi from "../../../artifacts/contracts/DegenToken.sol/DegenToken.json"

const contractAddress = "0xCcC8c6C464b6Ad1D022959aeA091aCfa62dFC25f";

export default function Home() {
  const [contract, setContract] = useState(undefined);
  const [isConnected, setConnected] = useState(false);
  const [wallet, setWallet] = useState(undefined)

  const init = async () => {
    if (!window.ethereum) {
      console.log("wallet provider not found")
      return;
    }

    // request account on load
    const acc = await window.ethereum.request({ method: "eth_requestAccounts" });
    setWallet(acc)

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    const _contract = new ethers.Contract(contractAddress, degenAbi.abi, provider);

    if (_contract) {
      setContract(_contract);
      setConnected(true);
    }
  }

  useEffect(() => {
    //init();
  }, [])

  return (
    <div className="flex flex-col justify-center items-center gap-2 h-screen">
      
      {isConnected
        ? <TransactScreen contract={contract} wallet={wallet.toString()}/>
        : <ConnectScreen onClick={init}/>
      }
    </div>
  );
}

const TransactScreen = ({ contract, wallet }) => {
  const [balance, setBalance] = useState(undefined);

  const getBalance = async () => {
    try {
      const _balance = (await contract.getBalance()).toString();
      console.log(_balance)
      setBalance(_balance)
    } catch (error) {
      console.log(error);
    }
      
  }

  const redeem = async (itemId) => {

  }

  const transfer = async (amount) => {

  }

  const burn = async (amount) => {

  }

  return (
    <div className="flex flex-col gap-3 min-w-[60%]">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Degen Store
      </h1>
      <Card>
        <CardHeader className="p-4 text-sm font-extralight text-muted-foreground">
          <CardTitle className="flex justify-between">
            <p>Your Account</p>
            <p>{`${wallet.slice(0,6)}...${wallet.slice(-4)}`}</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-bold text-2xl">{balance} DGN</p>
        </CardContent>
      </Card>
      <div className="flex gap-3 justify-end">
        <Button onClick={getBalance}>Refresh Balance</Button>
        <Button>Transfer</Button>
        <Button>Burn</Button>
      </div>
    </div>
  )
}

const ConnectScreen = ({ onClick }) => {
  return (
    <div className="flex flex-col justify-center gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Degen Store
      </h1>
      <div className="flex flex-col w-full">
        <Button onClick={onClick}>Connect Wallet</Button>
        <p className="text-muted-foreground text-xs">connect a wallet to get started</p>
      </div>
    </div>
  )
}
