'use client'

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/tailgrids/core/badge"

type DisplayCredential = {
    role: string
    name: string
    email: string
}

export default function Header() {
    const pathname = usePathname()
    const [credential, setCredential] = useState<DisplayCredential | null>(null)

    useEffect(() => {
        const loadCredential = () => {
            const value = localStorage.getItem("credential")

            if (!value) {
                setCredential(null)
                return
            }

            try {
                const parsed = JSON.parse(value) as Partial<DisplayCredential>
                if (!parsed.role || !parsed.name || !parsed.email) {
                    setCredential(null)
                    return
                }
                setCredential({
                    role: parsed.role,
                    name: parsed.name,
                    email: parsed.email,
                })
            } catch {
                localStorage.removeItem("credential")
                setCredential(null)
            }
        }

        loadCredential()
        window.addEventListener("storage", loadCredential)
        window.addEventListener("credential-changed", loadCredential)

        return () => {
            window.removeEventListener("storage", loadCredential)
            window.removeEventListener("credential-changed", loadCredential)
        }
    }, [pathname])

    return (
        <header className="mt-4 text-center">
            <div className="flex justify-center gap-4">
                <Badge className="mt-4 rotate-[20deg] rounded-xl bg-purple-500 px-3 py-1 text-3xl text-gray-800">C</Badge>
                <Badge className="mt-4 rotate-[340deg] rounded-xl bg-primary-500 px-3 py-1 text-3xl text-gray-800">S</Badge>
                <Badge className="mt-4 w-11 justify-center rotate-[30deg] rounded-xl bg-success-500 px-3 py-1 text-3xl text-gray-800">I</Badge>
                <Badge className="mt-4 rotate-[330deg] rounded-xl bg-warning-500 px-3 py-1 text-3xl text-gray-800">2</Badge>
                <Badge className="mt-4 rotate-[30deg] rounded-xl bg-orange-500 px-3 py-1 text-3xl text-gray-800">0</Badge>
                <Badge className="mt-4 rotate-[340deg] rounded-xl bg-red-500 px-3 py-1 text-3xl text-gray-800">5</Badge>
            </div>

            <div className="mt-5 text-center">
                <Badge size="lg">FRONT END SOFTWARE DEVELOPMENT</Badge>
            </div>

            {credential && (
                <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-base font-bold text-gray-900 md:text-lg">
                    <div className="flex items-center gap-1.5">
                        <span>ROLE:</span>
                        <span className="text-red-600">{credential.role}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span>NAME:</span>
                        <span className="text-green-600">{credential.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span>EMAIL:</span>
                        <span className="font-normal text-gray-600">{credential.email}</span>
                    </div>
                </div>
            )}
        </header>
    )
}