import { NextResponse } from "next/server"
import { connectToDb } from "@/utils/database"
import Prompt from "@/models/prompt"

// GET all prompts
export async function GET(request) {
  try {
    await connectToDb()
    const prompts = await Prompt.find({}).populate("creator")
    return new NextResponse(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    return new NextResponse("Failed to fetch all prompts", { status: 500 })
  }
}
