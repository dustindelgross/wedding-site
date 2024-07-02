"use client";
import { TextParallaxContent, Drawer, SwipeCarousel, Button } from "../components";
import { useEffect, useState } from "react";

const DressCode = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [drawer, setDrawer] = useState(0);

    const s3Url = "https://ddbh-wedding-site-bucket.s3.amazonaws.com/";
    const mascImgs = [
        `${s3Url}dress-code/01.jpg`,
        `${s3Url}dress-code/02.jpg`,
        `${s3Url}dress-code/04.jpg`,
        `${s3Url}dress-code/10.jpg`,
        `${s3Url}dress-code/11.webp`,
        `${s3Url}dress-code/12.jpg`,
        `${s3Url}dress-code/13.jpg`,
        `${s3Url}dress-code/14.jpg`,
        `${s3Url}dress-code/15.jpg`,
    ];
    const femmeImgs = [
        `${s3Url}dress-code/03.jpg`,
        `${s3Url}dress-code/05.jpg`,
        `${s3Url}dress-code/06.jpg`,
        `${s3Url}dress-code/07.jpg`,
        `${s3Url}dress-code/08.jpg`,
        `${s3Url}dress-code/09.jpg`,
    ];
    const dressCodeContent = [
        {
            imgUrl: `${s3Url}dress-code/01.jpg`,
            subheading: "Over the Top",
            heading: "Dress to Express",

            children: (
                <div className="relative w-full flex justify-evenly items-start pb-24 pt-12 z-2 px-12">
                    <div className="w-1/2 flex flex-col items-start justify-center">
                        <h2 className="text-4xl font-bold">For <span className="text-indigo-400">Masc</span> Folks</h2>
                    </div>
                    <div className="max-w-[75ch] space-y-6 text-lg">
                        <p>{`If you're feeling bold, we encourage you to wear your most extravagant outfit. Sequins, patterns, flowy garments, vibrant colors, and bold accessories are all encouraged.`}</p>
                        <Button text="Open Look Book" handleClick={() => {
                            setDrawer(0);
                            setMenuOpen(true);
                        }} />
                    </div>

                </div>
            )
        },
        {
            imgUrl: `${s3Url}dress-code/03.jpg`,
            subheading: "Chic Whimsy",
            heading: "Upstage the Bride",

            children: (
                <div className="relative w-full flex justify-evenly items-start pb-24 pt-12 z-2 px-12">
                    <div className="w-1/2 flex flex-col items-start justify-center">
                        <h2 className="text-4xl font-bold">For <span className="text-indigo-400">Femme</span> Folks</h2>
                    </div>
                    <div className="max-w-[75ch] space-y-6 text-lg">
                        <p>{`This is your moment to sparkle! Don your most vibrant garments, bold patterns, and statement accessories. We encourage you to wear something that makes you feel like the star of the show. This is your chance to truly feel as confident and fabulous as we know you are.`}</p>
                        <Button text="Open Look Book" handleClick={() => {
                            setDrawer(1);
                            setMenuOpen(true);
                        }} />
                    </div>

                </div>
            )
        },
    ];

    const drawerContent = [
        (<div key={0} className="mx-auto max-w-2xl space-y-12 text-neutral-400 flex flex-wrap justify-center items-center py-6">
            <div className="space-y-4">
                <h2 className="text-4xl font-bold ">For Our Masc Folks</h2>
                <p className="max-w-[75ch]">{`Use this lookbook to inspire your outfit for the wedding. Wear your fanciest shirt that you never thought you'd ever get the chance to wear. If you have a pair of boots, some jewelry, or a blazer that you haven't worn because it's too "over-the-top" - this is your chance to wear it!`}</p>
                <p className="max-w-[75ch]">{`The only limitation is that we ask you to keep it formal. No jeans, shorts, or sneakers, please.`}</p>
            </div>
            <div className=" w-full">
                <SwipeCarousel imgs={mascImgs} />
            </div>
        </div>),
        (<div key={1} className="mx-auto max-w-2xl space-y-12 text-neutral-400 flex flex-wrap justify-center items-center py-6">
            <div className="space-y-4">
                <h2 className="text-4xl font-bold ">For Our Femme Folks</h2>
                <p className="max-w-[75ch]">{`Use this lookbook to inspire your outfit for the wedding. Wear your fanciest dress that you never thought you'd ever get the chance to wear. If you have a pair of heels, some jewelry, or a gown that you haven't worn because it's so unbelievably extravagant - this is your chance to wear it!`}</p>
                <p className="max-w-[75ch]">{`The only limitation is that we ask you to keep it formal. No jeans, shorts, or sneakers, please.`}</p>
            </div>
            <div className="w-full">
                <SwipeCarousel imgs={femmeImgs} />
            </div>
        </div>)
    ];

    return (
        <main className="flex min-h-screen flex-col items-start py-48">
            <div className="flex flex-col items-center justify-center w-full h-full">
                {dressCodeContent.map((content, index) => {
                    return (
                        <TextParallaxContent
                            key={index}
                            imgUrl={content.imgUrl}
                            imgPadding={100}
                            heading={content.heading}
                            subheading={content.subheading}
                        >
                            {content.children}
                        </TextParallaxContent>
                    );
                })}
                <Drawer open={menuOpen} setOpen={setMenuOpen}>
                    {drawerContent[drawer]}
                </Drawer>
            </div>
        </main>
    );
}

export default DressCode;