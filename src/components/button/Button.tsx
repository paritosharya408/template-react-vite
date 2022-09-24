import React from 'react'
import styles from './Button.module.css'

export function Button({ children, onClick }: any) {
  return (
    <button type="button" onClick={onClick} className={styles.button}>
      {children}
    </button>
  )
}
