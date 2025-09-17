"use client"
import React from 'react'
import styles from "@/app/styles/Landing.module.css"
import Image from 'next/image'
import HomeImage from "@/app/images/global/homescreen.png"
import Male from "@/app/images/global/male.png"
import Female from "@/app/images/global/female.png"
import { Button } from '@/components/ui/button'
import BgAudio from './BgAudio'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Landing = () => {
  const router = useRouter();
  const navigateGame = () => {
    router.push('/selectMonster')
  }
  return (
    <>
      <div className={styles.container}>
        <BgAudio />
        <Image draggable={false} src={HomeImage} alt='homescreen' className={styles.setBg} />
        <div className={styles.right}>
          <Image draggable={false} src={Male} height={600} alt='male' className={styles.maleImage} />
          <Image draggable={false} src={Female} height={600} alt='female' className={styles.femaleImage} />
        </div>
        <div className={styles.left}>
          <h1 className={`text-white text-8xl font-bold text-center`}><span className='text-[#8A0303]'>Quiz</span> <br />of<br /> <span className='text-[#8A0303]'>Shadows</span></h1>
          <Button
            onClick={navigateGame}
            className="w-[50%] h-[10%] p-5 mt-5 text-lg font-bold cursor-pointer
              text-white rounded-lg
             transition-all duration-300
             hover:shadow-[0_0_25px_#ff0000,0_0_50px_#8A0303]
             hover:scale-105"
          >
            Play Now
          </Button>
        </div>
      </div>
      <div className={`h-screen w-[100%] flex items-center justify-center text-black bg-white ${styles.hide}`}>
        We’re sorry, this device is not supported at the moment. However, we’re working on expanding compatibility and hope to support it in the future.
      </div>
    </>
  )
}

export default Landing