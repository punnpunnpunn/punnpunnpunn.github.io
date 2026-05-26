import Link from "next/link"

const Footer = () => {
  return (
    <footer>
        <section>
            <h2>Contact me:</h2>
            <ul>
                <li>Email: <Link href="mailto:punpunp@hotmail.com">punpunp@hotmail.com</Link></li>
                <li>LinkedIn: <Link href="https://www.linkedin.com/in/punnawit/">Punnawit Payapvattanavong</Link></li>
                <li>Github: <Link href="https://github.com/punnpunnpunn">punnpunnpunn</Link></li>
                <li>Instagram: <Link href="https://www.instagram.com/punpun_thetrainer/">@punpun_thetrainer </Link></li>
                <li>Discord: punnpunnpunn</li>
                <li>LineID: 15punpun</li>
            </ul>
            <p><Link className="underline" href="/api/outbound/special-link" target="_blank">Click this link (trust me bro)</Link></p>
        </section>
    </footer>
  )
}

export default Footer