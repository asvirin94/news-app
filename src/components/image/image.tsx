import styles from './styles.module.css';

type Props = {
    image: string;
}

export default function Image ({image}: Props): JSX.Element {
    if(image !== 'None') {
        return (
            <div className={styles.wrapper}>
                <img className={styles.image} src={image}></img>
            </div>
        );
    } 

    return <div className={styles.wrapper}></div>
}