import { useEffect, useState } from "react";
import NewsBanner from "../../components/news-banner/news-banner";
import styles from "./styles.module.css";
import { getNews } from "../../api/apiNews";
import NewsList from "../../components/news-list/news-list";
import Skeleton from "../../components/skeleton/skeleton";

export default function MainPage(): JSX.Element {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const response = await getNews();
        setNews(response.news);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNews();
  }, []);

  return (
    <main className={styles.main}>
      {news.length > 0 && !isLoading ? <NewsBanner item={news[0]} /> : <Skeleton count={1} type='banner'/>}
      {isLoading ? <Skeleton count={10} type='item'/> : <NewsList news={news} />}
    </main>
  );
}
