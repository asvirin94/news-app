import styles from './styles.module.css';

type DateProps = {
    date: Date
}

const getDayName = (date: Date): string => {
    const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
}

export default function FormattedDate ({date}: DateProps): JSX.Element {
    const year = date.getFullYear();
    const month = date.toLocaleDateString('default', {month: 'long'});
    const day = date.getDate();
    const dayName = getDayName(date);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return (
        <p className={styles.date}>
            {year}, {month}, {day}, {dayName}<br />
            {hours}:{minutes < 10 ? `0${minutes}` : minutes}
        </p>
    )
}