/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import styles from './TextField.module.css'

export function TextField({
  type,
  value,
  onChange,
  placeholder,
  name,
  disabled,
  error,
}: any) {
  return (
    <div>
      <div className={styles.container}>
        <input
          disabled={disabled}
          className={styles.input}
          type={type}
          name={name}
          onChange={onChange}
          value={value}
        />
        <label className={[styles.label, value && styles.filled].join(' ')}>
          {placeholder}
        </label>
      </div>
      {error ? <p className={styles.error}>{error}</p> : ''}
    </div>
  )
}
