"use client";
import Button from "./Button";
import { User, formatFetcher } from "./users/utils";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { useState, useEffect } from "react";
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0/client';

export default withPageAuthRequired(function UserGreeting() {

    const { user, isLoading } = useUser();
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const adminRoles = ['admin', 'groom', 'bride', 'wedding_planner'];

    
  useEffect(() => {

    if (user && !isLoading) {
      formatFetcher(`/api/users`, 'GET', { email: user.email }).then((data) => {
        let fetchedUser = data.rows[0] as User;
        setCurrentUser(fetchedUser);
      });

    }
  }, [user]);

    if (!user && !isLoading) {
        return (
            <Button href="/api/auth/login" text="Login" withAnchor={true} Icon={FiLogIn} />
        );
    }

    return (

        user && !isLoading && (
            <div className={`flex sm:flex-nowrap w-full justify-end flex-wrap items-center gap-4`}>
                <h1>Hey, {currentUser?.name}!</h1>
                {adminRoles.includes(currentUser?.role!) && (
                    <Button text={"View Admin Panel"} href={"/admin"} />
                )}
                <Button href="/api/auth/logout" text="Logout" withAnchor={true} Icon={FiLogOut} />
            </div>
        )
    );
});



