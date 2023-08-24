import styles from './styles.module.css';

type Props = {
    image: string;
}

export default function Image ({image}: Props): JSX.Element {
    return (
        <div className={styles.wrapper}>
            {image ? <img className={styles.image} src={image}></img> : null}
        </div>
    );
}