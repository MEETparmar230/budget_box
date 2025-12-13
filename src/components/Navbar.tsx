"use client";

import { ModeToggle } from './ModeToggle'
import { Button } from './ui/button'

export default function
    Navbar() {

        const logOut =async () =>{
          await fetch('/api/auth/logOut', {
                method: 'POST',
            }).then(() => {
                window.location.href = '/login';
            });
        }


    return ( 
        <header className="flex items-center justify-between mb-6 py-2 border border-border ">
            <h1 className="text-2xl font-bold mx-2">BudgetBox</h1>
            <nav className="flex items-center gap-4 mx-2">

                <ModeToggle />
            </nav>
        </header>
    )
}
