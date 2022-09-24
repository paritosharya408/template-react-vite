import { Outlet } from 'react-router-dom'
import { Header } from '../header'
import { Sidebar } from '../sidebar'
import styles from './Layout.module.css'

export function Layout() {
  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <main className={styles.main}>
        <Header />
        <div className={styles.pageContent}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
