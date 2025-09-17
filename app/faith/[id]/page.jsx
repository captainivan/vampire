"use client"
import { imgData } from '@/app/images/data';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styles from "@/app/styles/Faith.module.css"
import { Button } from '@/components/ui/button';
import Typed from 'typed.js';
import BgAudio from '@/app/components/BgAudio';
import Link from 'next/link';

const Page = ({ params }) => {
    const searchparams = useSearchParams();
    const [char, setChar] = useState("");
    const [data, setData] = useState({ id: "", result: "" });

    useEffect(() => {
        if (localStorage.getItem("character")) {
            setChar(localStorage.getItem("character"));
        }
    }, []);

    useEffect(() => {
        const result = searchparams.get("result");
        setData({
            id: params.id,
            result: result
        });
    }, [params, searchparams]);

    useEffect(() => {
        if (!data.id || !data.result) return;

        const options = {
            strings: [
                data.result === "monsterwin"
                    ? "The darkness consumes you. As your strength fades, you collapse into the cold soil, your blood mixing with the rain. Your enemy stands tall, triumphant, as shadows swallow the land. But legends never truly die… they are reborn in whispers, in memory, and in destiny. Someday, another hunter will rise where you have fallen."
                    : "The battle is over. Your enemy lies defeated on the cold, wet ground as rain pours from the heavens. You breathe heavily, not just as a victor, but as someone who has lost much. You turn your back, walking away into the storm. The hunt is finished... for now."
            ],
            typeSpeed: 50,
            showCursor: true,
            cursorChar: '',
            loop: false,
        };

        const typed = new Typed('#first-block', options);
        return () => typed.destroy();
    }, [data]);

    const imageSet = imgData[data.id] || {};

    return (
        <div>
            {!data.id || !data.result ? (
                <>loading...</>
            ) : (
                <>
                    <BgAudio />
                    <div className={`h-screen w-full relative overflow-hidden flex items-end text-white ${styles.font}`}>
                        <Image
                            src={
                                char === "female"
                                    ? data.result === "monsterwin"
                                        ? imageSet.winFemale
                                        : imageSet.loseFemale
                                    : data.result === "monsterwin"
                                        ? imageSet.winMale
                                        : imageSet.loseMale
                            }
                            className="h-full w-full absolute object-cover top-0 left-0 -z-10"
                            alt="decision"
                            fill
                        />
                        <div className="w-full h-[100px]  flex justify-between items-center p-5">
                            <div className={`${styles.story} w-[90%] h-[80] flex items-center p-2 bg-black`}>
                                <p id='first-block' className='text-sm '></p>
                            </div>
                            <Link href={`/`} className='text-sm rounded-xl flex justify-center items-center p-5 ml-2 w-[8%] h-[80] bg-black text-white cursor-pointer'>
                                End Game
                            </Link>

                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Page;
