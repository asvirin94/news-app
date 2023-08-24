import { ItemType } from '../../types';
import ListItem from '../list-item/list-item';
import styles from './styles.module.css';

type Props = {
    news: ItemType[]
}

export default function NewsList ({news}: Props): JSX.Element {
    return (
        <ul className={styles.list}>
            {news.map(newsItem => 
                <ListItem key={newsItem.id} item={newsItem}/> 
            )}
        </ul>
    );
}