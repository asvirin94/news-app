import { Dispatch, SetStateAction } from 'react';
import styles from './styles.module.css';

type props = {
    keywords: string;
    setKeywords: Dispatch<SetStateAction<string>>
}

export default function Search({keywords, setKeywords}: props): JSX.Element {
    return (
        <div className={styles.search}>
            <input type="text" value={keywords} className={styles.input} onChange={(e) => setKeywords(e.target.value)} placeholder='put smthng here'/>
        </div>
    );
}