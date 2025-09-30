"use client"
import { imgData } from '@/app/images/data';
import { questionData } from '@/app/question/data';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import styles from "@/app/styles/BattleField.module.css"
import questionTag from "@/app/images/global/questionTag.png"
import wrongQuestionTag from "@/app/images/global/wrongQuestionTag.png"
import rightQuestionTag from "@/app/images/global/rightQuestionTag.png"
import BgAudio from '@/app/components/BgAudio';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useRouter } from 'next/navigation';

const Page = ({ params }) => {
    const [data, setData] = useState("");
    const [startGame, setStartGame] = useState(10);
    const [mess, setMess] = useState("");
    const messRef = useRef(null);
    const [count, setCount] = useState(0);
    const [monsterScore, setMonsterScore] = useState(0);
    const [question, setQuestion] = useState(null);
    const [showNext, setNext] = useState(false);
    const [click, setClick] = useState(false);
    const [clickedOption, setClickedOption] = useState("");
    const [sliderCount, setSliderCount] = useState(0);
    const [endGame, setEndGame] = useState(false);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const scareRef = useRef(null);
    const scareRefTwo = useRef(null);
    const router = useRouter();

    // Shuffle util (Fisher–Yates)
    const shuffleArray = (array) => {
        const newArr = [...array];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    };

    // Shuffle options inside a question
    const shuffleOptions = (options) => {
        const newOptions = [...options];
        for (let i = newOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newOptions[i], newOptions[j]] = [newOptions[j], newOptions[i]];
        }
        return newOptions;
    };

    // Save params.id
    useEffect(() => {
        const pdata = async () => {
            const par = await params;
            setData(par.id)
        }
        pdata()
    }, [params]);

    // Random horror message on mount
    useEffect(() => {
        const horrorLines = [
            "Try as much as you want… your screams will fade before my power does.",
            "You can run, you can hide, but you will never escape me.",
            "Every breath you take is only because I allow it.",
            "Your courage is amusing… but completely useless.",
            "I am the nightmare that even the dark fears."
        ];
        setMess(horrorLines[Math.floor(Math.random() * horrorLines.length)]);
    }, []);

    // Setup shuffled questions when data changes
    useEffect(() => {
        if (data && questionData[data]) {
            const shuffled = shuffleArray(questionData[data]);
            setShuffledQuestions(shuffled);
            setQuestion({
                ...shuffled[0],
                options: shuffleOptions(shuffled[0].options), // ✅ shuffle options
            });
            setCount(1);
        }
    }, [data]);

    // Function to move to next question
    const questionFunction = () => {
        if (!shuffledQuestions.length) return;

        if (count < 10) {
            setCount(prev => prev + 1);
            setClick(false);
            setNext(false);
            setClickedOption("");
            if (messRef.current) messRef.current.style.display = "none";

            const nextQ = shuffledQuestions[count];
            if (nextQ) {
                setQuestion({
                    ...nextQ,
                    options: shuffleOptions(nextQ.options), // ✅ shuffle options every time
                });
            } else {
                // reshuffle for extra randomness if needed
                const reshuffled = shuffleArray(questionData[data]);
                setShuffledQuestions(reshuffled);
                setQuestion({
                    ...reshuffled[0],
                    options: shuffleOptions(reshuffled[0].options), // ✅ shuffle options
                });
                setCount(1);
            }
        } else {
            setEndGame(true);
        }
    };

    // End game handler
    useEffect(() => {
        if (endGame) {
            if (monsterScore > -8) {
                router.push(`/faith/${data}?result=monsterwin`)
            } else {
                router.push(`/faith/${data}?result=monsterlose`)
            }
        }
    }, [endGame, monsterScore, data, router]);

    // Countdown
    useEffect(() => {
        if (startGame > 0) {
            const timer = setTimeout(() => {
                setStartGame(prev => (prev > 0 ? prev - 1 : 0));
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [startGame]);

    // Answer checking
    const checkAnswer = (option) => {
        setClickedOption(option);

        if (option === question.correctAnswer) {
            messRef.current.style.display = "block";
            setMess(question.info);
            setMonsterScore(prev => prev - 1);
            scareRefTwo.current?.play().catch(() => { });
            setSliderCount(prev => Math.min(prev + 1, 10));
        } else {
            messRef.current.style.display = "block";
            setMess(question.roasts?.[option] || "Wrong answer!");
            setMonsterScore(prev => prev + 1);
            scareRef.current?.play().catch(() => { });
            setSliderCount(prev => Math.max(prev - 1, 0));
        }
    };

    return (
        <>
            {data && imgData[data] ? (
                <>
                    <BgAudio />
                    <audio ref={scareRef} src='/audio/jumpscare.mp3' preload="auto" />
                    <audio ref={scareRefTwo} src='/audio/bell.mp3' preload="auto" />

                    <div className='h-screen w-full overflow-hidden text-white relative'>
                        <Image src={imgData[data]?.Theme} alt='backdrop'
                            className='absolute h-full w-full object-cover -z-1 top-0 left-0' />

                        <div className='h-screen flex justify-center items-center'>
                            <div className={`h-full w-1/2 flex relative ${styles.mainDiv}`}>
                                {/* Slider */}
                                <div className={`rotate-0 ${styles.bgSlider}`}>
                                    <Slider
                                        value={[sliderCount]}
                                        onValueChange={(val) => setSliderCount(val[0])}
                                        min={0}
                                        max={10}
                                        step={1}
                                        bgImage={imgData[data]?.og.src}
                                        orientation="vertical"
                                        className={`${styles.slider} bg-cover bg-center`}
                                    />

                                </div>

                                {/* Monster + Message */}
                                <div className="relative flex justify-center items-center w-full h-full">
                                    <Image
                                        src={
                                            monsterScore === 0 ? imgData[data]?.greenBg :
                                                monsterScore >= 1 && monsterScore <= 4 ? imgData[data]?.laughOne :
                                                    monsterScore >= 5 && monsterScore <= 8 ? imgData[data]?.laughTwo :
                                                        monsterScore >= 9 ? imgData[data]?.laughThree :
                                                            monsterScore <= -1 && monsterScore >= -4 ? imgData[data]?.painOne :
                                                                monsterScore <= -5 && monsterScore >= -8 ? imgData[data]?.painTwo :
                                                                    monsterScore <= -9 ? imgData[data]?.painThree :
                                                                        imgData[data]?.greenBg
                                        }
                                        alt='monster'
                                        height={700}
                                        draggable={false}
                                        className={styles.imageAppear}
                                    />

                                    {/* Message bubble → always near monster */}
                                    <div
                                        ref={messRef}
                                        className={`${startGame <= 5 && startGame > 1 ? "block" : "hidden"} bg-black border-2 border-white text-white px-4 py-2 rounded-2xl rounded-bl-none shadow-md absolute top-[10%] left-[58%] max-w-[250px] min-h-[50px] ${styles.animatepopup}`}
                                    >
                                        {mess}
                                    </div>
                                </div>
                            </div>

                            {/* Right side (questions / countdown) */}
                            {startGame > 0 ? (
                                <div className="h-screen w-1/2 flex flex-col justify-center items-center font-mono text-white">
                                    <h1 className="text-3xl mb-6 tracking-widest">Game Starts In</h1>
                                    <div className="h-40 flex items-center justify-center">
                                        <p
                                            key={startGame}
                                            className="text-[8rem] font-bold animate-fadeInOut"
                                        >
                                            {startGame > 0 ? startGame : "START!"}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-screen w-1/2 flex flex-col justify-center items-center font-mono">
                                    {question && (
                                        <>
                                            {/* Question */}
                                            <h1 className={`text-3xl md:text-4xl tracking-widest ${styles.questionTitle}`}>
                                                {question.question}
                                            </h1>

                                            {/* Options */}
                                            <div className="grid grid-cols-2 gap-8 w-[80%] max-w-2xl">
                                                {question.options.map((option, i) => (
                                                    <button
                                                        disabled={click}
                                                        onClick={() => { checkAnswer(option); setNext(true); setClick(true) }}
                                                        key={i}
                                                        className={`w-full h-14 p-5 text-white relative ${styles.questionButton} ${click ? "cursor-not-allowed" : "cursor-pointer"}`}
                                                    >
                                                        {option}
                                                        <Image
                                                            alt="questiontag"
                                                            src={
                                                                clickedOption === option && option !== question.correctAnswer
                                                                    ? wrongQuestionTag
                                                                    : clickedOption === option && option === question.correctAnswer
                                                                        ? rightQuestionTag
                                                                        : questionTag
                                                            }
                                                            className='h-full w-full absolute top-0 left-0 -z-1'
                                                        />
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Progress */}
                                            <p className='mt-5 text-left'>{count}/10</p>
                                            <div className='w-[80%] flex justify-end mt-5'>
                                                {showNext && (
                                                    <Button
                                                        onClick={questionFunction}
                                                        className="border-white cursor-pointer border-2 bg-black hover:bg-white hover:text-black hover:border-black"
                                                    >
                                                        Next
                                                    </Button>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default Page;
