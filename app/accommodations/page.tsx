"use client";
import { Button } from "../components";
import { Dispatch, SetStateAction, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const housingContent: TabProps[] = [
    {
        heading: "The Virginian",
        link: "https://www.thevirginianhotel.com/",
        children: (<>
            <p><i>This is a Hilton hotel.</i></p>
            <p>Right next to downtown Lynchburg, about 25 minutes from the wedding venue.</p>
            <p>Price: <b>~$200/night</b></p>
            <address>{`712 Church St, Lynchburg, VA 24504`}</address>
        </>)
    },
    {
        heading: "The Farmhouse",
        link: "https://www.irvingtonspringfarm.com/stays",
        children: (<>
            <p><i>This is an airbnb.</i></p>
            <p>Sleeps 14. About 30 minutes from the wedding venue.</p>
            <p>Price: <b>~$500/night</b></p>
            <a href={`https://www.airbnb.com/rooms/39418746`} target="_blank" rel="noreferrer">View on Airbnb</a>
            <address>{`Irvington Springs Rd, Lynchburg, VA 24503`}</address>
        </>)
    },
    {
        heading: "Carriage House Inn",
        link: "https://www.carriagehouseinnandevents.com/",
        children: (<>
        <p><i>This is a small business.</i></p>
            <p>Has a hotel space on premises that can sleep up to 18 guests. Also has select rooms from $87/night. Right next to downtown Lynchburg, about 30 minutes from the wedding venue.</p>
            <p>Price: <b>~$90/night for select rooms, ~$650/night for the Hotel Cabell</b></p>
            <address>{`404 Cabell St, Lynchburg, VA 24504`}</address>
        </>)
    },
    {
        heading: "Bella Vista Hotel & Suites",
        link: "https://www.reservations.com/Hotel/the-kirkley-hotel-and-conference-center-lynchburg",
        children: (<>
            <p>Standard hotel, about 20 minutes from the wedding venue.</p>
            <p>Price: <b>~$200/night for select rooms</b></p>
            <address>{`2900 Candlers Mountain Rd, Lynchburg, VA 24502`}</address>
        </>)
    },
    {
        heading: "Farm Cottage",
        link: "https://www.airbnb.com/rooms/51820072",
        children: (<>
            <p><i>This is an airbnb.</i></p>
            <p>About 15 minutes from the wedding venue.</p>
            <p>Price: <b>~$300/night</b></p>
            <a href={`https://www.airbnb.com/rooms/51820072`} target="_blank" rel="noreferrer">View on Airbnb</a>
            <address>{`Goode, VA 24556 | Exact Address provided after booking.`}</address>
        </>)
    },
    {
        heading: "The Craddock Terry Hotel",
        link: "https://www.craddockterryhotel.com/",
        children: (<>
            <p><i>This is a Marriott hotel.</i></p>
            <p>About 15 minutes from the wedding venue.</p>
            <p>Price: <b>~$400/night</b></p>
            <address>{`1312 Commerce St, Lynchburg, VA 24504`}</address>
        </>)
    },
];
const airportContent: TabProps[] = [
    {
        heading: "Roanoke-Blacksburg Regional Airport (ROA)",
        link: "https://flyroa.com/",
        children: (<>
            <p><i>This is a regional airport with service to most major eastern metropolitan areas.</i></p>
            <p>Airlines: <b>Allegiant, American, Delta, United</b></p>
            <p>Car rentals: <b>Avis/Budget, Enterprise, National, Hertz</b></p>
            <p>Proximity to Lynchburg: <b>~1.5 hours</b></p>
            <address>{`5202 Aviation Dr NW, Roanoke, VA 24012`}</address>
        </>)
    },
    {
        heading: "Richmond International Airport (RIC)",
        link: "https://flyrichmond.com/",
        children: (<>
            <p>Airlines: <b>Allegiant, American, Breeze, Delta, jetBlue, Southwest, spirit, Sun Country, United</b></p>
            <p>Car rentals: <b>Alamo, Avis, Budget, Dollar, Enterprise, Hertz, National, Payless</b></p>
            <p>Proximity to Lynchburg: <b>~2.5 hours</b></p>
            <address>{`1 Richard E Byrd Terminal Dr, Richmond, VA 23250`}</address>
        </>)
    },
    {
        heading: "Charlotte Douglas International Airport (CLT)",
        link: "https://cltairport.com/",
        children: (<>
        <p><i>This is a major airport with service to most major US cities.</i></p>
            <p>Airlines: <b>Served by most major airlines</b></p>
            <p>Car rentals: <b>Alamo, Avis, Budget, Dollar, Enterprise, Hertz, National, Sixt</b></p>
            <p>Proximity to Lynchburg: <b>~3 hours by car, ~1.25 hours if flying to LYH</b></p>
            <address>{`5501 Josh Birmingham Pkwy, Charlotte, NC 28208`}</address>
        </>)
    },
    {
        heading: "Lynchburg Regional Airport (LYH)",
        link: "https://flylyh.com/",
        children: (<>
            <p><i>This is a regional airport with service to Charlotte, NC.</i></p>
            <p>Airlines: <b>American</b></p>
            <p>Car rentals: <b>Avis, Budget, Dollar, Hertz, National</b></p>
            <p>Public Transportation: <b>Greater Lynchburg Transit Company</b></p>
            <p>Proximity to venue: <b>~20 minutes</b></p>
            <address>{`350 Terminal Drive, Lynchburg, VA, 24502`}</address>
        </>)
    },
];

const Tabs = ({ tabs }: { tabs: TabProps[] }) => {

    const [tab, setTab] = useState(0);

    return (

        <div className="flex flex-col gap-6">
            <div className="flex items-stretch justify-start flex-row overflow-x-auto max-w-[80vw] snap-x snap-start snap-mandatory snap-always py-4">
                {tabs.map((item, index) => {
                    return (
                        <Tab
                            key={index}
                            text={item.heading}
                            setTab={setTab}
                            tab={index}
                            selected={tab === index}
                        />
                    );
                })}
            </div>
            <div className="w-full">
                {tabs.map((item, index) => {
                    return (
                        <AnimatePresence key={index}>
                            {tab === index &&
                                <TabFeature
                                    key={index}
                                    heading={item.heading}
                                    link={item.link}
                                >
                                    {item.children}
                                </TabFeature>
                            }
                        </AnimatePresence>
                    );
                })}
            </div>
        </div>
    );
}

interface TabProps {
    children: React.ReactNode;
    heading: string;
    link: string;
}

const Tab = ({ text, setTab, tab, selected }: { text: string, setTab: Dispatch<SetStateAction<number>>, tab: number, selected: boolean }) => {

    return (
        <button
            className={`px-4 py-2 ${selected ? 'bg-blue-700 text-white' : 'bg-white text-blue-700'} border-e last:border-none first:rounded-s last:rounded-e hover:bg-blue-700 hover:text-white transition-colors duration-300 text-nowrap`}
            onClick={() => setTab(tab)}>{text}</button>
    );
}

const TabFeature = ({ children, heading, link }: TabProps) => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-start gap-4 transition-all duration-300 w-full max-w-[75ch]"
            >
                <h2 className={`text-xl border-b-2 pb-1 w-full`}>{heading}</h2>
                {children}
                <Button text="More Info" href={link} external={true} />
            </motion.div>
        </AnimatePresence>
    );
}

export default function Accommodations() {
    return (
        <main className="flex min-h-screen flex-col items-start gap-12 md:py-48 py-80 px-24">
            <div className="flex flex-col justify-center gap-6">
                <h1 className="text-4xl font-bold max-w-[75ch]">{`Accommodations`}</h1>
                <h2 className="text-3xl font-bold ">{`Housing`}</h2>
                <Tabs tabs={housingContent} />
                <h2 className="text-3xl font-bold ">{`Airports & Car Rentals`}</h2>
                <Tabs tabs={airportContent} />
            </div>
        </main>
    );
}