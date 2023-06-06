"use client"

import Image from "next/image"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"

export default function PromptCard({ post, handleTagClick }) {
  const { data: session } = useSession()
  const pathName = usePathname()
  const router = useRouter()

  return (
    <div className="flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[360px] w-full h-fit">
      <div className="flex justify-between items-start gap-5">
        {post.prompt}
        <br />
        {post.tag}
      </div>
    </div>
  )
}
