import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import UpdatePromptClientPage from "./client-page"

export default async function UpdatePrompt() {
  const session = await getServerSession(authOptions)
  console.log("server session: >>>>>>>>>>", session)
  if (!session) {
    return redirect("/")
  } // server side route guard

  return (
    <UpdatePromptClientPage />
  )
}
