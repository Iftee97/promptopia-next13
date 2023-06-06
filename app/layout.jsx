import "@/styles/globals.css"
import Nav from "@/components/Nav"
import NextAuthSessionProvider from "@/components/NextAuthSessionProvider"

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextAuthSessionProvider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="relative z-10 flex justify-center items-center flex-col max-w-7xl mx-auto sm:px-16 px-6">
            <Nav />
            {children}
          </main>
        </NextAuthSessionProvider>
      </body>
    </html >
  )
}
