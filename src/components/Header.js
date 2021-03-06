import styles from './Header.module.css'
import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
  <header className={styles.header}>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
  </header>
)

export default Header
