import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './nav.module.css'

function Nav() {
  return (
    <div className={styles.nav}>
      <NavLink to="/">Список дел</NavLink>
      <NavLink to="/other">Другая страница</NavLink>
    </div>
  )
}

export default Nav
