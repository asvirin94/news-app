import { useEffect, useState } from "react";
import NewsBanner from "../../components/news-banner/news-banner";
import styles from "./styles.module.css";
import { getNews } from "../../api/apiNews";
import NewsList from "../../components/news-list/news-list";
import Skeleton from "../../components/skeleton/skeleton";
import Pagination from "../../components/paginaton/pagination";

export default function MainPage(): JSX.Element {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const pageSize = 10;

  const fetchNews = async (currentPage: number) => {
    try {
      setIsLoading(true);
      const response = await getNews(currentPage, pageSize);
      setNews(response.news);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage]);

  const handleNextPageClick = () => {
    if(currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePreviousPageClick = () => {
    if(currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handlePageClick = (pageNumber: number) => {
    if(currentPage !== pageNumber) {
      setCurrentPage(pageNumber)
    }
  }

  return (
    <main className={styles.main}>

      {news.length > 0 && !isLoading ? <NewsBanner item={news[0]} /> : <Skeleton count={1} type='banner'/>}

      <Pagination 
      totalPages={totalPages} 
      handleNextPageClick={handleNextPageClick} 
      handlePreviousPageClick={handlePreviousPageClick}
      handlePageClick={handlePageClick}
      currentPage={currentPage}
      />

      {isLoading ? <Skeleton count={10} type='item'/> : <NewsList news={news} />}
      
      <Pagination 
      totalPages={totalPages} 
      handleNextPageClick={handleNextPageClick} 
      handlePreviousPageClick={handlePreviousPageClick}
      handlePageClick={handlePageClick}
      currentPage={currentPage}
      />

    </main>
  );
}
