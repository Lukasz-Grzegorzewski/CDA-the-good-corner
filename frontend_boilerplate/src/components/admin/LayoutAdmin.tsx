import React from 'react'
import NavbarAdmin from './NavbarAdmin'

function LayoutAdmin({children}: { children: React.ReactNode }) {

  return (
    <>
      <NavbarAdmin />
      {children}
    </>
  )
}

export default LayoutAdmin