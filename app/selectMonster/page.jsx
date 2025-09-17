
import React from 'react'
import BgAudio from '../components/BgAudio'
import styles from "@/app/styles/selcetMonster.module.css"
import GameImg from "@/app/images/global/gameSelect.png"
import Image from 'next/image'
import vamCard from "@/app/images/global/vam_card.png"
import demCard from "@/app/images/global/dem_card.png"
import ghoCard from "@/app/images/global/gho_card.png"
import wolCard from "@/app/images/global/wol_card.png"
import witCard from "@/app/images/global/wit_card.png"
import mumCard from "@/app/images/global/mum_card.png"
import Link from 'next/link'

const Page = () => {
  return (
    <div className="relative">
      <BgAudio />

      {/* Title */}
      <div className="flex flex-col items-center min-h-screen w-full relative z-10">
        <h1 className={`${styles.title} text-white font-bold text-5xl mt-6 tracking-widest`}>
          Select Your <span>Enemy</span>
        </h1>

        {/* Background Image */}
        <Image
          src={GameImg}
          alt="gameImg"
          className={`${styles.backdrop} absolute object-cover left-0 top-0 h-full w-full -z-10`}
        />

        {/* Dark overlay for creepiness */}
        <div className="absolute inset-0 bg-black/70 -z-10"></div>

        {/* Cards */}
        <div className="flex items-center justify-center w-full p-8">
          <div className="grid grid-cols-3 gap-10">
            {[
              { name: "vampire", image: vamCard },
              { name: "demon", image: demCard },
              { name: "wolf", image: wolCard },
              { name: "mummy", image: mumCard },
              { name: "witch", image: witCard },
              { name: "ghost", image: ghoCard },
            ].map((e, i) => (
              <Link key={i} href={`/startStoryBoard/${e.name}`}>
                <div  className={`${styles.card} relative`}>
                  <Image src={e.image} alt={e.name} />
                  {/* blood splatter overlay on hover */}
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <span className="absolute w-full h-full bg-[url('/blood-splatter.png')] bg-contain bg-center opacity-30 mix-blend-screen"></span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
