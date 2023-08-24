import styles from './styles.module.css';
import { ItemType } from '../../types';
import { formatTimeAgo } from '../../utils';

type Props = {
    item: ItemType;
}

export default function ListItem ({item}: Props): JSX.Element {
    return (
        <li className={styles.item}>
            <div className={styles.wrapper} style={{backgroundImage: `url(${item.image})`}}></div>
            <div className={styles.info}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.extra}>
                    {formatTimeAgo(item.published)} by {item.author}
                </p>
            </div>
        </li>
    );
}