import { UserT } from '../../types/user'
import styles from './tag.module.css'

type Props = Omit<UserT, 'id'>

const Tag = (props: Props) => {
  const { login, avatar_url, type } = props

  return (
    <div className={styles.wrapper} data-testid="wrapper">
      <div className={styles.avatar}>
        <img src={avatar_url} alt={`${login}'s image'`} />
      </div>
      <div className={styles.info}>
        <p>{login}</p>
        <p>{type}</p>
      </div>
    </div>
  )
}

export default Tag
