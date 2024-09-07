"use client";
import Button from "./Button";
import { User, formatFetcher } from "./users/utils";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { SpringModal } from "./SpringModal";
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0/client';



export default withPageAuthRequired(function UserGreeting() {

    const { user, isLoading } = useUser();
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const adminRoles = ['admin', 'groom', 'bride', 'wedding_planner'];

    
  useEffect(() => {

    if (user && !isLoading) {
      formatFetcher(`/api/users`, 'GET', { email: user.email }).then((data) => {
        let fetchedUser = data.rows[0] as User;
        setCurrentUser(fetchedUser);
      });

    }
  }, [user, isLoading]);

    if (!user && !isLoading) {
        return (
            <Button href="/api/auth/login" text="Login" withAnchor={true} Icon={FiLogIn} />
        );
    }

    const UserFormModal = ({ user, open, setOpen }: { user: User | null, open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) => {

      const [userShallowCopy, setUserShallowCopy] = useState<User | null>(null);
    
      useEffect(() => {
        setUserShallowCopy(user);
      }, []);
    
      if (!user) return null;
      if (!user.id) return null;
    
      if ( !userShallowCopy )  return null;
    
      async function handleUpdate() {
        formatFetcher(`/api/users`, 'PUT', { ...userShallowCopy }).then((data) => {
          setUserShallowCopy(null);
          window.location.reload();
        });
      }
    
      function handleDismiss() {
        setOpen(false);
        setUserShallowCopy(null);
      }
    
      return (
        <SpringModal
          isOpen={open}
          setIsOpen={setOpen}
          handleConfirm={handleUpdate}
          handleDismiss={handleDismiss}
        >
          <form
            className={``}
          >
            <div className="flex flex-col items-start w-full">
              <label className="text-gray-200 p-4">Name</label>
              <input type="text" className="w-full rounded-md bg-blue-50 font-bold text-gray-900 p-4" value={userShallowCopy.name!} onChange={(e) => {
                setUserShallowCopy({ ...userShallowCopy, name: e.target.value });
              }} />
            </div>
            <div className="flex flex-col items-start w-full">
              <label className="text-gray-200 p-4">Email</label>
              <input type="text" className="w-full rounded-md bg-blue-50 font-bold text-gray-900 p-4" value={userShallowCopy.email!} onChange={(e) => {
                setUserShallowCopy({ ...userShallowCopy, email: e.target.value });
              }} />
            </div>
            <div className="flex flex-row-reverse justify-end items-center w-full">
              <label className="text-gray-200 p-4 cursor-pointer">
              <input type="checkbox" className="p-4 rounded-sm cursor-pointer min-w-[20px] aspect-ratio-1/1" checked={userShallowCopy.rsvp!} onChange={(e) => {
                setUserShallowCopy({ ...userShallowCopy, rsvp: e.target.checked });
              }} />
              {`RSVP`}
              </label>
            </div>
          </form>
        </SpringModal>
      );
    }

    

    return (

        user && !isLoading && (
            <div className={`flex sm:flex-nowrap w-full justify-end flex-wrap items-center gap-4`}>
                <h1>Hey, {currentUser?.name}!</h1>
                {adminRoles.includes(currentUser?.role!) && (
                    <Button text={"View Admin Panel"} href={"/admin"} />
                )}
                <Button handleClick={() => setModalOpen(true)} text={`Edit my Info`} />
                <Button href="/api/auth/logout" text="Logout" withAnchor={true} Icon={FiLogOut} />
                <UserFormModal setOpen={setModalOpen} open={modalOpen} user={currentUser} />
            </div>
        )
    );
});



