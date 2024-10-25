'use client'
import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { TransferPopup, BurnPopup } from "@/components/ui/d-popup"

import { useState, useEffect } from "react";

import { ethers } from "ethers";
import degenAbi from "../../../artifacts/contracts/DegenToken.sol/DegenToken.json"
import { Loader } from "@/components/loading-overlay";

const contractAddress = "0xCcC8c6C464b6Ad1D022959aeA091aCfa62dFC25f";

const shop = [
  {
    name: "Sea Salt",
    image: "https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_1300/f_auto/v1/api-images/products/ktt-sea-salt-lemon/ktt-sea-salt-lemon-switches_xa2d8d",
    price: 500
  },
  {
    name: "Rosewood",
    image: "https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_1300/f_auto/v1/api-images/products/ktt-rose/DSC03019_zfkczp",
    price: 350
  },
  {
    name: "Kang White",
    image: "https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_1300/f_auto/v1/api-images/products/ktt-kang-white-linear/ktt-kang-white-v3-linear-switches_zkwhcr",
    price: 100
  },
]

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
    const signer = await provider.getSigner();
    const _contract = new ethers.Contract(contractAddress, degenAbi.abi, signer);

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
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const cleanup = () => {
    setLoading(false)
    setMessage("")
  }

  const getBalance = async () => {
    try {
      setLoading(true)
      setMessage("Loading")
      const _balance = (await contract.getBalance());
      console.log(_balance)
      setBalance(_balance)
    } catch (error) {
      console.log(error);
    }
    cleanup();
  }

  const redeem = async (itemId, amount) => {
    try {
      setLoading(true)
      setMessage("pending transaction")
      const tx = await contract.redeem(itemId, amount)
      await tx.wait()
      getBalance();
      alert('Redeem Successful')
    } catch (error) {
      console.error(error)
    }
    cleanup();
  }

  const transfer = async (address, amount) => {
    try {
      setLoading(true)
      setMessage("pending transaction")
      const tx = await contract.transfer(address, amount)
      await tx.wait()
      getBalance()
      alert('Transfer Successful')
    } catch (error) {
      console.error(error)
    }
    cleanup();
  }

  const burn = async (amount) => {
    try {
      setLoading(true)
      setMessage("pending transaction")
      const tx = await contract.burn(amount);
      await tx.wait();
      alert('Burn successful')
      getBalance();
    } catch (error) {
      console.error(error)
    }
    cleanup();
  }

  useEffect(() => {
    getBalance();
  }, [])

  return (
    <>
    { loading && <Loader message={message} />}
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
        <TransferPopup onClick={transfer} />
        <BurnPopup onClick={burn} />
      </div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Shop
      </h2>
      <div className="flex gap-3">
        {shop.map((item) => (
          <Card key={item.name}>
            <CardContent>
            <img
              src={item.image}
              width={150}
              height={150}
              alt={item.name}
              className="rounded-md p-2"
            />
            </CardContent>
            <CardFooter className="flex flex-col p-2">
              <div className="flex w-full text-sm justify-between items-center gap-2 p-2">
                <p>{item.name}</p>
                <p>{item.price} DGN</p>
              </div>
              <div className="w-full">
                <Button className="w-full" onClick={async () => {
                  await redeem(item.name, item.price)
                }}>Redeem</Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
    </>
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
