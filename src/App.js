import React from 'react'
import { Banner, Footer, Header, NavBar } from './components'

const App = () => {
  return (
    <div className=" font-inter tracking-tight text-gray-900 ">
      <div className='flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip'>
        <NavBar />
        <Header />
        <Banner />
        <Footer />
      </div>
    </div>
  );
}

export default App
