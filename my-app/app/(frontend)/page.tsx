import Image from "next/image";
import my_pic from "../../public/my_pic.png"
import FunFact from "./components/FunFact";

export default function Home() {
  return (
    <section>
          <h1>Punpun's Personal Website</h1>
          <h2>Welcome to my personal website</h2>
          <p>
              This is where I will write and post random things like blog posts and personal projects
              The website might look a little weird on mobile. It works a lot better on a computer.
              Here are a few projects I want to do on my bucket list:
          </p>
          <ul>
              <li>Make ghost chess, a chess variant where you can hop over your own pieces</li>
              <li>Make Hexagonal minesweeper</li>
              <li>Make funny quizzes on my website</li>
              <li>Make a program that detects reoccurring opening traps based on your online chess games</li>
              <li>Make a playable trading card game</li>
              <li>Make some sort of code breaking puzzle game</li>
              <li>Make a gallery section on this website by pulling some images from my instagram account</li>
              <li>Sell meme shirts and other merchandise based on memes</li>
              <li>Write a song</li>
          </ul>
          <Image className="me" src={my_pic} alt="Punpun's Picture" width={230} height={230}/>
          <h2>About me</h2>
          <p>
              Hi there! My name is Punnawit Payapvattanavong, but you can call me Punpun :).
              I'm currently studying computer science at the University of Toronto and looking to
              specialize in Mathematical applications in Economics and Finance.
              I love playing chess, singing, acting, running, doing math and making memes.
              I'm starting this website as a way for me to learn how to make a website
              and to add my cool projects all into one place.
          </p>
          <FunFact/>
      </section>
  );
}
