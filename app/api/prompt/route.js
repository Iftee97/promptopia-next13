import { NextResponse } from "next/server"
import { connectToDb } from "@/utils/database"
import Prompt from "@/models/prompt"

// GET all prompts
export async function GET(request) {
  try {
    // // prev implementation:
    // await connectToDb()
    // const prompts = await Prompt.find({}).populate("creator")
    // return new NextResponse(JSON.stringify(prompts), { status: 200 })

    // // new implementation: fixes the problem of the cache not updating when a new prompt is created 
    await connectToDb()
    const prompts = await Prompt.find().populate({ path: "creator" })
    const response = new NextResponse(JSON.stringify(prompts), { status: 200 })

    // Add a unique identifier to the URL to force a cache-busting reload
    const url = new URL(request.url)
    url.searchParams.set("t", Date.now())
    response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate")
    response.headers.set("Pragma", "no-cache")
    response.headers.set("Expires", "0")
    response.headers.set("Location", url.toString())

    return response
  } catch (error) {
    return new NextResponse("Failed to fetch all prompts", { status: 500 })
  }
}
