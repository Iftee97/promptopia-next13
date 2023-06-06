import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import CreatePromptClientPage from "./client-page"

export default async function CreatePrompt() {
  const session = await getServerSession(authOptions)
  console.log("server session: >>>>>>>>>>", session)
  if (!session) {
    return redirect("/")
  } // server side route guard

  return (
    <CreatePromptClientPage />
  )
}
