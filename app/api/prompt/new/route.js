import { NextResponse } from "next/server"
import { connectToDb } from "@/utils/database"
import Prompt from "@/models/prompt"

// POST (add) a new prompt
export async function POST(request) {
  const {
    userId,
    prompt,
    tag
  } = await request.json()
  try {
    await connectToDb()
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag
    })
    await newPrompt.save()
    return new Response(JSON.stringify(newPrompt), { status: 200 })
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 })
  }
}
