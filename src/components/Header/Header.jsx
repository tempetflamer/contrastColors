import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Header.scss'

export default function Header() {
  const { pathname } = useLocation()

  return (
    <header>
      <div>All</div>
      <div>Colors</div>
      <div>Contrasts all text</div>
      <div>Contrasts small text</div>
      <div>Contrasts large text</div>
      <div>exports</div>
    </header>
  )
}
