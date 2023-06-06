import { NextResponse } from "next/server"
import { connectToDb } from "@/utils/database"
import Prompt from "@/models/prompt"

// GET a prompt by id
export async function GET(request, { params }) {
  try {
    await connectToDb()
    const prompt = await Prompt.findById(params.id).populate("creator")
    if (!prompt) {
      return new NextResponse("Prompt Not Found", { status: 404 })
    }
    return new NextResponse(JSON.stringify(prompt), { status: 200 })
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

// PATCH (update) a prompt by id
export async function PATCH(request, { params }) {
  const { prompt, tag } = await request.json()
  try {
    await connectToDb()
    const existingPrompt = await Prompt.findById(params.id) // Find the existing prompt by ID
    if (!existingPrompt) {
      return new NextResponse("Prompt not found", { status: 404 })
    }

    // Update the prompt with new data
    existingPrompt.prompt = prompt
    existingPrompt.tag = tag

    await existingPrompt.save()
    return new NextResponse("Prompt updated successfully!", { status: 200 })
  } catch (error) {
    return new NextResponse("Error Updating Prompt", { status: 500 })
  }
}

// DELETE a prompt by id
export async function DELETE(request, { params }) {
  try {
    await connectToDb()
    await Prompt.findByIdAndRemove(params.id) // Find the prompt by ID and remove it
    return new NextResponse("Prompt deleted successfully", { status: 200 })
  } catch (error) {
    return new NextResponse("Error deleting prompt", { status: 500 })
  }
}
