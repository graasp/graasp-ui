import * as React from 'react'
import styles from './styles.module.css'

interface Props {
  message: string
}

export const ExampleComponent = ({ message }: Props) => {
  return <div className={styles.test}>Example Component: {message}</div>
}
