import Link from "next/link"

const Navbar = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <div className="text-2xl font-bold">🗿 Punx2</div>
      <nav className="space-x-6">
          <Link href="/">HOME</Link>
          <Link href="/blog">BLOG</Link>
          <Link href="/project">PROJECTS</Link>
      </nav>
    </header>
  )
}

export default Navbar