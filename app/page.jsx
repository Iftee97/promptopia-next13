import Feed from "@/components/Feed"

async function getAllPrompts() {
  const response = await fetch(`${process.env.BASE_URL}/api/prompt`, {
    cache: "no-store",
  })
  return response.json()
}

export default async function Home() {
  const allPosts = await getAllPrompts()
  const posts = allPosts.reverse()
  // console.log("SSR posts: >>>>>>>>", posts)

  return (
    <section className="w-full flex flex-col justify-center items-center">
      <h1 className="mt-5 text-5xl sm:text-6xl font-extrabold leading-[1.15] text-black text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent text-center">
          AI-Powered Prompts
        </span>
      </h1>
      <p className="mt-5 text-lg sm:text-xl text-gray-600 max-w-2xl text-center">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      <Feed allPosts={posts} />
    </section>
  )
}
