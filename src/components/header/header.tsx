import FormattedDate from '../date/date';
import {useState} from 'react';
import styles from './styles.module.css';

export default function Header (): JSX.Element {
    const [actualDate, setActualDate] = useState(new Date());

    setTimeout(() => {
        setActualDate(new Date());
    }, 60000)

    return (
        <header className={styles.header}> 
            <h1 className={styles.title}> News</h1>
            <FormattedDate date={actualDate}/>
        </header>
    );
}