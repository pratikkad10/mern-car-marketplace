import { Button } from '../components/ui/button'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Errorpage = () => {
    return (
        <div className="bg-gradient-to-r from-slate-200 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-black dark:text-white">
            <div className="flex items-center justify-center min-h-screen px-2">
                <div className="text-center">
                    <h1 className="text-9xl font-bold">404</h1>
                    <p className="text-2xl font-medium mt-4">Oops! Page not found</p>
                    <p className="mt-4 mb-8">The page you're looking for doesn't exist or has been moved.</p>
                    <NavLink to="/"
                        className="px-6 py-3 bg-white font-bold font-semibold rounded-full hover:bg-purple-100 transition duration-300 ease-in-out dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">
                            <Button variant="secondary">Go Home</Button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Errorpage