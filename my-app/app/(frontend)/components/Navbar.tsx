import Link from "next/link"

const Navbar = () => {
  return (
    <nav>
        <Link href="./">HOME</Link>
        <Link href="./blog">BLOG</Link>
        <Link href="./project">PROJECTS</Link>
    </nav>
  )
}

export default Navbar