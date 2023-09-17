import { ItemType } from '../../types';
import ListItem from '../list-item/list-item';
import styles from './styles.module.css';
import withSkeleton from '../../hocks/withSkeleton';

type NewsListPropsType = {
    news: ItemType[];
}

function NewsList ({news}: NewsListPropsType): JSX.Element {
    return (
        <ul className={styles.list}>
            {news.map(newsItem => 
                <ListItem key={newsItem.id} item={newsItem}/> 
            )}
        </ul>
    );
}

export const NewsListWithSkeleton = withSkeleton(NewsList, 'item', 10);