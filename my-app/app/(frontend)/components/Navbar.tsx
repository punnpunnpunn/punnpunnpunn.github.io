import Link from "next/link"
import icon from "@/app/icon.svg"

const Navbar = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <div className="flex items-center space-x-2">
        <img src={icon} />
        <div className="text-2xl font-bold">
          Punx2
        </div>
      </div>
      <nav className="space-x-6">
          <Link className="no-underline" href="/">HOME</Link>
          <Link className="no-underline" href="/blog">BLOG</Link>
          <Link className="no-underline" href="/project">PROJECTS</Link>
      </nav>
    </header>
  )
}

export default Navbar