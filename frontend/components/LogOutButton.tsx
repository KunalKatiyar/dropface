"use client";

import { signOut } from "@/lib/api";
import { Button } from "./ui/button";

export default function LogOutButton() {
    return (
        <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={async () => {
                await signOut();
            }}
        >
            Log Out
        </Button>
    );
}


