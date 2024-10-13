"use client";
import { User, formatFetcher } from "./components/users/utils";
import ShiftingCountdown from "./components/ShiftingCountdown";
import { Button } from "./components/Button";
import { FiCheck } from "react-icons/fi";
import { useEffect, useState, MouseEventHandler } from "react";
import { laBelleAurore } from "./components/fonts";
import { Drawer } from "./components/Drawer";
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0/client';

interface SectionProps {
  title: string;
  desc: string;
  cta: string;
  clickHandler?: MouseEventHandler<HTMLButtonElement>;
  href?: string;
  external?: boolean;
}


const Section = ({ title, desc, cta, clickHandler, href, external }: SectionProps) => {
  return (
    <div className="flex flex-col justify-center items-center py-24 px-6 odd:bg-stone-200 w-[100vw]">
      <div className="flex flex-col justify-center items-center gap-6">
        <h2 className="text-4xl font-bold text-center ">{title}</h2>
        <p className="max-w-[75ch] text-center">{desc}</p>
        <div className="max-w-full w-auto">
          <Button text={cta} href={href} external={external} handleClick={clickHandler} />
        </div>
      </div>
    </div>
  );
}


export default withPageAuthRequired(function Home() {

  const { user, isLoading } = useUser();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [rehearsalOpen, setRehearsalOpen] = useState(false);


  const tailwind = `
  relative z-0 flex items-center gap-2 overflow-hidden rounded border-[1px] 
  border-blue-700 px-4 py-2 font-bold
  text-blue-700 transition-all duration-500
  
  before:absolute before:inset-0
  before:-z-10 
  before:scale-[2.5]
  before:rounded-[100%] before:bg-blue-700
  before:transition-transform before:duration-1000
  before:content-[""]
  ${ currentUser?.rsvp === true ? 'text-neutral-300 before:translate-x-[0%] before:translate-y-[0%]' : 'before:translate-x-[150%] before:translate-y-[150%] text-blue-700' }

  hover:scale-105 hover:text-neutral-300
  hover:before:translate-x-[0%]
  hover:before:translate-y-[0%]
  active:scale-95`;

  useEffect(() => {
    if (user && !isLoading) {
      const fetchUser = async () => {
        try {
          const data = await formatFetcher(`/api/users/?email=${user.email}`, 'GET');
          if (data) {
            const userData = data.rows[0];
            if (userData) {
              setCurrentUser(userData);
            } else {
              const newUser = {
                email: user.email,
                name: user.name
              };
              const createResponse = await formatFetcher(`/api/users`, 'POST', newUser);
              if (createResponse.ok) {
                setCurrentUser(newUser);
              }
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUser();
    }
  }, [user, isLoading]);

  useEffect(() => {
    formatFetcher(`/api/users`, 'PUT', { ...currentUser });
  }, [currentUser]);


  if (user && !isLoading && currentUser) {

    return (
      <main className="flex min-h-screen flex-col items-center gap-12 py-80 md:py-48">
        <ShiftingCountdown />
        <div className="flex flex-col justify-center items-center gap-6 max-w-[75ch]">
          <h1 className={`px-6 text-3xl font-bold text-center max-w-[75ch] ${laBelleAurore.className}`}>{`Welcome to the Wedding${currentUser?.name ? `, ${currentUser.name}` : ""}`}</h1>
          {currentUser?.rsvp === false || !currentUser?.rsvp && (
            <p className="text-center">{`Please RSVP by September 20th, 2024`}</p>
          )}
          {currentUser && (
            <div className="flex flex-col gap-4 items-center">
              <h2 className="text-2xl font-bold">{`RSVP`}</h2>
              {currentUser.rsvp === false || !currentUser.rsvp ?
                <button className={tailwind} onClick={function (this: HTMLButtonElement) {
                  formatFetcher(`/api/users`, 'GET', { email: user?.email }).then((data) => {
                    let rsvpUser = data.rows[0] as User;
                    setCurrentUser({ ...rsvpUser, rsvp: true });
                  });
                }}>{`I Will Not Be Attending`}</button> :
                <button className={tailwind} onClick={function (this: HTMLButtonElement) {
                  formatFetcher(`/api/users`, 'GET', { email: user?.email }).then((data) => {
                    let rsvpUser = data.rows[0] as User;
                    setCurrentUser({ ...rsvpUser, rsvp: false });
                  });
                }}>{`I'm Attending`}<FiCheck /></button>
              }
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center items-center gap-12 ">
          <Section
            title={"The Venue"}
            desc={"The wedding will be held at the beautiful Vaughan House in Forest, VA, on October 19th, 2024. Ceremony beginning at 5:00PM EST."}
            cta={"View Venue Website"}
            href={"https://vaughan-house.com/"}
            external={true}
          />

          <Section
            title={"Accommodations"}
            desc={"There is a selection of hotel, Airbnb, and car rental options in the area, mostly around Lynchburg, VA."}
            cta={"View Options"}
            href={"/accommodations"}
          />
          <Section
            title={"Dress Code"}
            desc={"Back of the Closet affair. Wear your most dazzling attire, or come as you are."}
            cta={"Learn More"}
            href={"/dress-code"}
          />
          {/* <Section
            title={"The Food"}
            desc={"We will be serving a variety of dishes, including vegetarian and vegan options."}
            cta={"View Menu"}
            clickHandler={() => {
              setMenuOpen(true);
            }}
          /> */}
          {currentUser?.rehearsal_invite && (
            <Section
              title={"The Rehearsal Brunch"}
              desc={"The rehearsal brunch will be held at the Vaughan House on October 18th, 2024 at 12:00pm EST. Afternoon brunch to follow from 3-6pm."}
              cta={"More Info"}
              clickHandler={() => setRehearsalOpen(true)}
            />
          )}
        </div>


        {/* <Drawer open={menuOpen} setOpen={setMenuOpen}>
          <div className="mx-auto max-w-2xl space-y-4 text-neutral-400">
            <h2 className="text-4xl font-bold ">The Menu</h2>
            <p className="max-w-[75ch]">The menu is still coming together; check back here again soon for updates!</p>
            <div className="max-w-full w-auto">

            </div>
          </div>
        </Drawer> */}
        {currentUser?.rehearsal_invite && (
          <Drawer open={rehearsalOpen} setOpen={setRehearsalOpen}>
            <div className="mx-auto max-w-2xl space-y-4 text-neutral-400">
              <h2 className="text-4xl font-bold ">The Rehearsal Brunch</h2>
              <p className="max-w-[75ch]">The wedding rehearsal will be held at the Vaughan House on October 18th, 2024, at 2:00PM EST, with brunch to follow from 3-6PM.</p>
              <div className="max-w-full w-auto">

              </div>
            </div>
          </Drawer>
        )}


      </main>
    );
  }
});