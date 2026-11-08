"use client"
import { useRouter } from "next/navigation"

import { useState } from "react"
import { Button } from "@/components/tailgrids/core/button"
import {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/tailgrids/core/dialog"
import { Backdrop } from "@/components/tailgrids/core/overlay"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/tailgrids/core/input-group";
import { EyeDisabled, Keyboard } from "@tailgrids/icons"
import { login, type Credential } from "@/data/credentials"

export default function Page() {
  const router = useRouter()
  const [open, setOpen] = useState(true)

  const handleLogin = () => {
    //extract data
    const userDom = document.getElementById('user') as HTMLInputElement
    const passDom = document.getElementById('pass') as HTMLInputElement

    const user = userDom.value.trim()
    const pass = passDom.value.trim()

    //validate
    if (user === '') {
      alert('Error:user is required')
      userDom.focus()
      return
    }
    if (pass === '') {
      alert('Error:password is required')
      passDom.focus()
      return
    }

    //call login
    login(user, pass)
      .then((credential: Credential) => {
        localStorage.setItem('credential', JSON.stringify(credential))
        window.dispatchEvent(new Event("credential-changed"))
        router.replace('/')
        router.refresh()
      })
      .catch((error: unknown) => {
        userDom.value = ''
        passDom.value = ''
        userDom.focus()
        alert(`Error: ${error instanceof Error ? error.message : error}`)
      })
  }

  return (
    <Backdrop isOpen={open}>
      <Dialog showCloseButton={false} className="w-md">
        <DialogHeader>
          <DialogTitle className="text-center">เข้าสู่ระบบ</DialogTitle>
          <DialogDescription>กรอกอีเมลและรหัสผ่าน</DialogDescription>
        </DialogHeader>

        <DialogBody>
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <Keyboard />
            </InputGroupAddon>
            <InputGroupInput id="user" type="email" placeholder="fffff@gmail.com" />
          </InputGroup>

          <InputGroup>
            <InputGroupAddon align="inline-start">
              <EyeDisabled />
            </InputGroupAddon>
            <InputGroupInput id="pass" type="password" placeholder="pass" />
          </InputGroup>
        </DialogBody>

        <DialogFooter>
          <div className="flex justify-end">
            <Button onClick={handleLogin}>Login</Button>
          </div>
        </DialogFooter>
      </Dialog>
    </Backdrop>
  )
}