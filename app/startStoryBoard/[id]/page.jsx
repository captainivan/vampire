"use client"
import React, { useEffect, useState } from 'react'
import styles from "@/app/styles/startStoryBoard.module.css"
import Image from "next/image"
import GameImg from "@/app/images/global/gameSelect.png"
import maleChar from "@/app/images/global/maleChar.png"
import femaleChar from "@/app/images/global/femaleChar.png"
import { imgData } from '@/app/images/data'
import BgAudio from '@/app/components/BgAudio'
import { Button } from '@/components/ui/button'
import Typed from 'typed.js'
import Link from 'next/link'

const Page = ({ params }) => {
  const [data, setData] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (localStorage.getItem("character")) {
      setSelectedCharacter(localStorage.getItem("character"));
    }
  }, []);

  useEffect(() => {
    if (!selectedCharacter || count !== 1) return;
    const options = {
      strings: ['When you were just a 10-year-old child, your village lived in peace. '],
      typeSpeed: 50,
      showCursor: true,
      cursorChar: '',
      loop: false,
    };

    const typed = new Typed('#first-block', options);

    return () => {
      typed.destroy();
    };
  }, [selectedCharacter]);

  useEffect(() => {
    const paData = async () => {
      const data = await params;
      if (data.id) {
        setData(data.id);
      }
    };
    paData();
  }, []);

  const handleChar = (name) => {
    localStorage.setItem("character", name);
    setSelectedCharacter(name);
  };

  useEffect(() => {
    if (count == 2) {
      const options = {
        strings: [`But one night, while you were away, a terrible darkness fell upon your home. A ${data} descended upon your town burning, haunting, and destroying everything you loved.`],
        typeSpeed: 50,
        showCursor: true,
        cursorChar: '',
        loop: false,
      };

      const typed = new Typed('#second-block', options);
      return () => {
        typed.destroy();
      };
    }
    if (count == 3) {
      const options = {
        strings: ["From that day forward, you swore vengeance. You trained day and night, mastering every weapon and every secret of your enemy."],
        typeSpeed: 50,
        showCursor: true,
        cursorChar: '',
        loop: false,
      };

      const typed = new Typed('#third-block', options);
      return () => {
        typed.destroy();
      };
    }
    if (count == 4) {
      const options = {
        strings: ["Years later, you stand as the greatest hunter the world has ever seen. Tonight, your destiny arrives. The battle begins..."],
        typeSpeed: 50,
        showCursor: true,
        cursorChar: '',
        loop: false,
      };

      const typed = new Typed('#fourth-block', options);
      return () => {
        typed.destroy();
      };
    }
  }, [count])

  return (
    <div className={styles.container}>
      <BgAudio />
      {selectedCharacter ? (
        <div className="flex items-end justify-center h-screen w-full relative text-white text-4xl overflow-hidden">
          {count === 1 ? (
            <>
              <Image
                src={imgData.intro.firstScene}
                alt="first scene"
                className="absolute w-full h-full object-cover -z-10"
              />
              <div className="w-full h-[100px]  flex justify-between items-center p-5">
                <div className={`${styles.story} w-[90%] h-[80] flex items-center p-2 bg-black`}>
                  <p id='first-block' className='text-sm '></p>
                </div>
                <Button className={`p-5 ml-2 w-[8%] h-[80] bg-black text-white cursor-pointer`} onClick={() => setCount(count + 1)}>Next</Button>
              </div>
            </>
          ) : count === 2 ? (
            <>
              <Image
                src={imgData.intro.secondScene}
                alt="second scene"
                className="absolute w-full h-full object-cover -z-10"
              />
              <div className="w-full h-[100px]  flex justify-between items-center p-5">
                <div className={`${styles.story} w-[90%] h-[80] flex items-center p-2 bg-black`}>
                  <p id='second-block' className='text-sm '></p>
                </div>
                <Button className={`p-5 ml-2 w-[8%] h-[80] bg-black text-white cursor-pointer`} onClick={() => setCount(count + 1)}>Next</Button>
              </div>
            </>
          ) : count === 3 ? (
            <>
              <Image
                src={
                  selectedCharacter === "male"
                    ? imgData.intro.thirdSceneMale
                    : imgData.intro.thirdSceneFemale
                }
                alt="third scene"
                className="absolute w-full h-full object-cover -z-10"
              />
              <div className="w-full h-[100px]  flex justify-between items-center p-5">
                <div className={`${styles.story} w-[90%] h-[80] flex items-center p-2 bg-black`}>
                  <p id='third-block' className='text-sm '></p>
                </div>
                <Button className={`p-5 ml-2 w-[8%] h-[80] bg-black text-white cursor-pointer`} onClick={() => setCount(count + 1)}>Next</Button>
              </div>
            </>
          ) : count === 4 ? (
            <>
              <Image
                src={
                  selectedCharacter === "male"
                    ? imgData.intro.fourthSceneMale
                    : imgData.intro.fourthSceneFemale
                }
                alt="fourth scene"
                className="absolute w-full h-full object-cover -z-10"
              />
              <div className="w-full h-[100px]  flex justify-between items-center p-5">
                <div className={`${styles.story} w-[90%] h-[80] flex items-center p-2 bg-black`}>
                  <p id='fourth-block' className='text-sm '></p>
                </div>
                <Link href={`/battlefield/${data}`} className='text-sm rounded-xl flex justify-center items-center p-5 ml-2 w-[8%] h-[80] bg-black text-white cursor-pointer'>
                  Start
                </Link>

              </div>
            </>
          ) : null}
        </div>
      ) : (
        <div className={styles.charSet}>
          <h1
            className={`${styles.title} text-white font-bold text-5xl mt-6 tracking-widest animate-pulse`}
          >
            Select Your Character
          </h1>

          {/* Background */}
          <Image
            src={GameImg}
            alt="gameImg"
            className={`${styles.backdrop} absolute object-cover left-0 top-0 h-full w-full -z-10`}
          />
          <div className="absolute inset-0 bg-black/80 -z-10"></div>

          {/* Character Selection */}
          <div className={styles.character}>
            <div
              className={`${styles.char} group relative`}
              onClick={() => handleChar("male")}
            >
              <Image
                src={maleChar}
                alt="male"
                className="rounded-2xl transition-transform duration-500"
              />
            </div>

            <div
              className={`${styles.char} group relative`}
              onClick={() => handleChar("female")}
            >
              <Image
                src={femaleChar}
                alt="female"
                className="rounded-2xl transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
