import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

/* const imgs = [
    "/imgs/nature/1.jpg",
    "/imgs/nature/2.jpg",
    "/imgs/nature/3.jpg",
    "/imgs/nature/4.jpg",
    "/imgs/nature/5.jpg",
    "/imgs/nature/6.jpg",
    "/imgs/nature/7.jpg",
]; */
/* 
const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10; */
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
    type: "spring",
    mass: 3,
    stiffness: 400,
    damping: 50,
};

export const SwipeCarousel = ({ imgs }: { imgs: string[] }) => {
    const [imgIndex, setImgIndex] = useState(0);

    const dragX = useMotionValue(0);
/* 
    useEffect(() => {
        const intervalRef = setInterval(() => {
            const x = dragX.get();

            if (x === 0) {
                setImgIndex((pv) => {
                    if (pv === imgs.length - 1) {
                        return 0;
                    }
                    return pv + 1;
                });
            }
        }, AUTO_DELAY);

        return () => clearInterval(intervalRef);
    }, []); */

    const onDragEnd = () => {
        const x = dragX.get();

        if (x <= -DRAG_BUFFER && imgIndex < imgs.length - 1) {
            setImgIndex((pv) => pv + 1);
        } else if (x >= DRAG_BUFFER && imgIndex > 0) {
            setImgIndex((pv) => pv - 1);
        }
    };

    return (
        <div className="relative overflow-hidden bg-neutral-950 p-8 rounded-2xl">
            <motion.div
                drag="x"
                dragConstraints={{
                    left: 0,
                    right: 0,
                }}
                style={{
                    x: dragX,
                }}
                animate={{
                    translateX: `-${imgIndex * 100}%`,
                }}
                transition={SPRING_OPTIONS}
                onDragEnd={onDragEnd}
                className="flex cursor-grab flex-row justify-start items-start active:cursor-grabbing"
            >
                <Images imgIndex={imgIndex} imgs={imgs} />
            </motion.div>

            <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} imgs={imgs} />
            <GradientEdges />
        </div>
    );
};

const Images = ({ imgIndex, imgs }: { imgIndex: number, imgs: string[] }) => {
    return (
        <>
            {imgs.map((imgSrc, idx) => {
                return (
                    <motion.div
                        key={idx}
                        style={{
                            backgroundImage: `url(${imgSrc})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            width: "100%",
                        }}
                        animate={{
                            scale: imgIndex === idx ? 0.95 : 0.85,
                        }}
                        transition={SPRING_OPTIONS}
                        className="aspect-[1/1] min-w-1/2 shrink-0 rounded-xl bg-neutral-800 object-cover"
                    />
                );
            })}
        </>
    );
};

const Dots = ({
    imgIndex,
    setImgIndex,
    imgs
}: {
    imgIndex: number;
    setImgIndex: Dispatch<SetStateAction<number>>;
    imgs: string[];
}) => {
    return (
        <div className="mt-4 flex w-full justify-center gap-2">
            {imgs.map((_, idx) => {
                return (
                    <button
                        key={idx}
                        onClick={() => setImgIndex(idx)}
                        className={`h-3 w-3 rounded-full transition-colors ${idx === imgIndex ? "bg-neutral-50" : "bg-neutral-500"
                            }`}
                    />
                );
            })}
        </div>
    );
};

const GradientEdges = () => {
    return (
        <>
            <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-neutral-950/50 to-neutral-950/0" />
            <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-neutral-950/50 to-neutral-950/0" />
        </>
    );
};