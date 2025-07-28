import Image, { StaticImageData } from 'next/image';
import BarbarianKing from '@/public/Barbarian_King.webp';
import ArcherQueen from '@/public/Archer_Queen.webp';
import MinionPrince from '@/public/Minion_Prince.webp';
import GrandWarden from '@/public/Grand_Warden.webp';
import RoyalChampion from '@/public/Royal_Champion.webp';
export default async function Hero() {
  const data = await fetch('https://api.clashofclans.com/v1/players/%23L2RLLQGVO', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.CLASH_API_KEY}`
    }
  });
  const json = await data.json();
  interface Hero {
    name: string;
    level?: number;
    image?: StaticImageData;
  }
  const heroes: { [key: string]: Hero} = {
    BarbarianKing: {
      name: 'Barbarian King',
      image: BarbarianKing,
    },
    ArcherQueen: {
      name: 'Archer Queen',
      image: ArcherQueen,
    },
    MinionPrince: {
      name: 'Minion Prince',
      image: MinionPrince,
    },
    GrandWarden: {
      name: 'Grand Warden',
      image: GrandWarden,
    },
    RoyalChampion: {
      name: 'Royal Champion',
      image: RoyalChampion,
    }
  };
  for (const hero of Object.values(heroes)) {
      hero.level = json.heroes.find((h: Hero) => h.name === hero.name)?.level || 0;
  }
  return (
    <>
    <h1>Hero Section</h1>
    <div className='flex items-center justify-around flex-wrap'>
      {Object.values(heroes).map((hero: Hero) =>(
        <div key={hero.name}>
          {hero.image && <Image className='h-35 w-auto' src={hero.image} alt={hero.name} width={100} height={100} />}
          <p className='text-center'>Level: {hero.level}</p>
        </div>
      ))}
    </div>
    <p className='text-center'>Check out my clash of clans base in game! Player tag: #L2RLLQGVO</p>
    </>
  );
}