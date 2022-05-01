import Search from '../../components/search'
import styles from './home.module.scss'

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <p>Welcome Home</p>
      <Search onChange={(e) => console.log(e)} />
    </div>
  )
}

export default Home
