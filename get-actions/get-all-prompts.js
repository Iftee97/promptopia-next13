import { connectToDb } from "@/utils/database"
import Prompt from "@/models/prompt"

export default async function getAllPrompts() {
  try {
    await connectToDb()
    const prompts = await Prompt.find() // find all prompts and populate the creator field
    return prompts
  } catch (error) {
    return error
  }
}
