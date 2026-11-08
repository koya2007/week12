"use client"
import { Badge } from "@/components/tailgrids/core/badge";
import { Facebook, Twitter, } from "@tailgrids/icons";
import Link from 'next/link'
import "bootstrap-icons/font/bootstrap-icons.css";
export default function Footer() {
    return (
        //footer container
        <div className="text-center">

            {/* student */}
            <div>
                <Badge className="text-2xl text-black rounded-lg">68075207 PARI</Badge>

            </div>
            {/* contacts */}
            <div>
                <div className="flex justify-center gap-4 mt-4">
                    <Link href="https://www.facebook.com/profile.php?id=100091168155187" target="_blank">
                        <Facebook className="text-blue-700" />
                    </Link>
                    <div className='border-l-1'></div>
                    <Link href="https://twitter.com/yourprofile" target="_blank">
                        <Twitter className="text-blue-400" />
                    </Link>
                    <div className='border-l-1'></div>
                    <Link href="https://www.youtube.com/yourprofile" target="_blank">
                        <span className ='bi bi-youtube text-2xl text-red-500' />
                    </Link>
                </div>

            </div>

        </div>

    )
}