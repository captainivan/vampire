import React from 'react'
import BgAudio from '../components/BgAudio'
import styles from "@/app/styles/selcetMonster.module.css"
import GameImg from "@/app/images/global/gameSelect.png"
import Image from 'next/image'
import { imgData } from '../images/data'

const Page = () => {
  return (
    <div>
      <BgAudio />
      <div className='flex flex-col items-center h-screen w-[100%] relative'>
        <h1 className={`${styles.title} text-white font-bold text-4xl mt-2`}>Select Your Enemy</h1>
        <Image src={GameImg} alt="gameImg" className={`${styles.backdrop} absolute object-cover left-0 top-0 h-[100%] w-[100%] -z-1`} />
        <div>
          {[
            { name: "vampire", image: imgData.vampire.ogVampire },
            { name: "demon", image: imgData.demon.ogDemon },
            { name: "wolf", image: imgData.wolf.ogWolf },
            { name: "mummy", image: imgData.mummy.ogMummy },
            { name: "witch", image: imgData.witch.ogWitch },
            { name: "ghost", image: imgData.ghost.ogGhost },
          ].map((e, i) => (
            <div key={i}>
              <Image src={e.image} alt={e.name}  />
              <p>{e.name}</p>
            </div>
          ))
          }
        </div>
      </div>
    </div>
  )
}

export default Page