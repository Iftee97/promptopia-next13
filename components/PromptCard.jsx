"use client"

import Image from "next/image"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"

export default function PromptCard({ post, handleTagClick }) {
  const { data: session } = useSession()
  const pathName = usePathname()
  const router = useRouter()

  const [copied, setCopied] = useState("")

  function handleCopy() {
    navigator.clipboard.writeText(post.prompt)
    setCopied(post.prompt)
    setTimeout(() => setCopied(""), 3000)
  }

  function handleProfileClick() {
    console.log("post: >>>>>>>>>", post)
    if (post.creator._id === session?.user.id) {
      return router.push("/profile")
    }
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)
  }

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
