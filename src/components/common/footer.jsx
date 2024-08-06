import React from 'react'
import Logo from './logo'

const Footer = () => {
  return (
    <div>
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="space-y-2 sm:col-span-12 lg:col-span-4">
        <div>
          <Logo />
        </div>
        <div className="text-sm text-gray-600">
          &copy; Genso - All rights reserved.
        </div>
      </div>
    </div>
    <div className="relative -mt-16 h-60 w-full" aria-hidden="true">
        <div className="pointer-events-none absolute left-1/2 -z-10 -translate-x-1/2 text-center text-[348px] font-bold leading-none before:bg-gradient-to-b before:from-gray-200 before:to-gray-100/30 before:to-80% before:bg-clip-text before:text-transparent before:content-['Genso'] after:absolute after:inset-0 after:bg-gray-300/70 after:bg-clip-text after:text-transparent after:mix-blend-darken after:content-['Genso'] after:[text-shadow:0_1px_0_white]"></div>
        {/* Glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2/3"
          aria-hidden="true"
        >
          <div className="h-56 w-56 rounded-full border-[20px] border-blue-700 blur-[80px]"></div>
        </div>
      </div>
    </div>
  );
}

export default Footer