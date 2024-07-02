"use client";
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

export default withPageAuthRequired(function Contact() {

    return (
        <main className="flex min-h-screen flex-col items-center gap-12 py-48 px-24">
            <div className="flex flex-col items-center justify-center w-full h-full">
                <h1 className="text-3xl font-bold">Contact Us</h1>
                <p className="text-lg">Coming soon...</p>
            </div>
        </main>
    );
})