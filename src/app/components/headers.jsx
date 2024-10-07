import { GithubFilled } from "@ant-design/icons"
import { Button } from "antd"
import Link from "next/link"
import { useEffect } from "react"

export function Headers(){
    return <div
        className="flex items-center justify-between px-1 h-[70px] relative"
    >
        <p className="text-3xl font-extrabold">
            What's news?
        </p>
        <Link href="https://github.com/Niaina177H/News-api" className="flex items-center justify-center">
            <GithubFilled className="text-6xl text-white"/>
        </Link>
        <div className="absolute bg-blue-600 inset-0 -z-10">
            <div className="relative w-full h-full">
                <div className="absolute bg-white inset-0" style={{clipPath: "polygon(65% 0, 70% 0, 65% 100%, 60% 100%)"}}></div>
                <div className="absolute bg-white inset-0" style={{clipPath: "polygon(75% 0, 80% 0, 75% 100%, 70% 100%)"}}></div>
            </div>
        </div>
    </div>
}