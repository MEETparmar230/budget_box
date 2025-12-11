import React from 'react'
import { ModeToggle } from './ModeToggle'

export default function
    Navbar() {
    return ( 
        <header className="flex items-center justify-between mb-6 py-2 border border-border ">
            <h1 className="text-2xl font-bold mx-2">BudgetBox</h1>
            <nav className="flex items-center gap-4 mx-2">
                <ModeToggle />
            </nav>
        </header>
    )
}
