import React, { useEffect, useState } from 'react'
import Logo from './logo';


const NavBar = () => {
    const [top, setTop] = useState(true);

    // detect whether user has scrolled the page down by 10px
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
  
    useEffect(() => {
      scrollHandler();
      window.addEventListener("scroll", scrollHandler);
      return () => window.removeEventListener("scroll", scrollHandler);
    }, [top]);

  return (
    <header className="fixed top-2 z-30 w-full md:top-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(theme(colors.gray.100),theme(colors.gray.200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
          {/* Site branding */}
          <div className="flex flex-1 items-center">
           <Logo />
          </div>

          {/* Desktop sign in links */}
          <ul className="flex flex-1 items-center justify-end gap-3">
            <li>
              <a
                href="/"
                className=" px-4 py-1 rounded-md hover:cursor-pointer bg-white text-gray-800 shadow hover:bg-gray-50"
              >
               About
              </a>
            </li>
            <li>
              <a
                href='https://github.com/riyajath-ahamed/genso-boilerplate'
                className="px-4 py-1 rounded-md hover:cursor-pointer bg-gray-800 text-gray-200 shadow hover:bg-gray-900"
              >
                Repo
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default NavBar