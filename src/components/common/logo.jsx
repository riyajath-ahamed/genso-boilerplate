import React from 'react'

import genso from './assets/GensoLogo.svg'

const Logo = () => {

  return (
    <a href="/" className="inline-flex" aria-label="Cruip">
        <img className="h-8" src={genso} alt="Cruip" />
  </a>
  )
}

export default Logo