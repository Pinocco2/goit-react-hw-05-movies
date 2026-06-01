import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import clsx from 'clsx'; // або використовуй звичайні класи в залежності від твого шаблону
import styles from './SharedLayout.module.css';

export const SharedLayout = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <NavLink to="/" className={({ isActive }) => clsx(styles.link, isActive && styles.active)}>
            Home
          </NavLink>
          <NavLink to="/movies" className={({ isActive }) => clsx(styles.link, isActive && styles.active)}>
            Movies
          </NavLink>
        </nav>
      </header>
      <main>
        <Suspense fallback={<div className={styles.loader}>Loading page...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};