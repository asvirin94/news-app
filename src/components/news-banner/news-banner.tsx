import { formatTimeAgo } from '../../utils';
import Image from '../image/image';
import styles from './styles.module.css';
import { ItemType } from '../../types';


type Props = {
    item: ItemType;
}

export default function NewsBanner ({item}: Props): JSX.Element {
    return (
        <div className={styles.banner}>
            <Image image={item.image} />
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.date}>{formatTimeAgo(item.published)} by {item.author}</p>
        </div>
    );
}