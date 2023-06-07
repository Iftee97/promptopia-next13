import { NextResponse } from "next/server"
import { connectToDb } from "@/utils/database"
import Prompt from "@/models/prompt"

// GET a prompt by id
export async function GET(request, { params }) {
  try {
    await connectToDb()
    const prompt = await Prompt.findById(params.id).populate("creator")
    if (!prompt) {
      return new Response("Prompt Not Found", { status: 404 })
    }
    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 })
  }
}

// PATCH (update) a prompt by id
// export async function PATCH(request, { params }) {
//   const { prompt, tag } = await request.json()
//   try {
//     await connectToDb()
//     const existingPrompt = await Prompt.findById(params.id) // Find the existing prompt by ID
//     if (!existingPrompt) {
//       return new NextResponse("Prompt not found", { status: 404 })
//     }

//     // Update the prompt with new data
//     existingPrompt.prompt = prompt
//     existingPrompt.tag = tag

//     await existingPrompt.save()
//     return new NextResponse("Prompt updated successfully!", { status: 200 })
//   } catch (error) {
//     return new NextResponse("Error Updating Prompt", { status: 500 })
//   }
// }

// PATCH (update) a prompt by id -- more elegant solution
export async function PATCH(request, { params }) {
  try {
    const { prompt, tag } = await request.json()
    await connectToDb()
    const updatedPrompt = await Prompt.findByIdAndUpdate(
      params.id,
      { prompt, tag },
      { new: true }
    )
    if (!updatedPrompt) {
      return new Response("Prompt not found", { status: 404 })
    }
    return new Response("Prompt updated successfully!", { status: 200 })
  } catch (error) {
    return new Response("Error updating prompt", { status: 500 })
  }
}

// DELETE a prompt by id
export async function DELETE(request, { params }) {
  try {
    await connectToDb()
    await Prompt.findByIdAndRemove(params.id) // Find the prompt by ID and remove it
    return new Response("Prompt deleted successfully", { status: 200 })
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 })
  }
}
