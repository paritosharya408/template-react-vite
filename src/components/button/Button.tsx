import React from 'react'
import styles from './Button.module.css'

interface IProps {
  children: string
  onClick: () => void
}

export function Button({ children, onClick }: IProps) {
  return (
    <button type="button" onClick={onClick} className={styles.button}>
      {children}
    </button>
  )
}
