import { NextResponse } from "next/server"
import { connectToDb } from "@/utils/database"
import Prompt from "@/models/prompt"

// GET prompts for a particular user (self or other)
export async function GET(request, { params }) {
  try {
    await connectToDb()
    const prompts = await Prompt.find({ creator: params.id }).populate("creator")
    return NextResponse(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    return NextResponse("Failed to fetch prompts created by user", { status: 500 })
  }
}
