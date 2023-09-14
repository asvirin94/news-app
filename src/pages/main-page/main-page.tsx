import { useEffect, useState } from "react";
import NewsBanner from "../../components/news-banner/news-banner";
import styles from "./styles.module.css";
import { getCategories, getNews } from "../../api/apiNews";
import NewsList from "../../components/news-list/news-list";
import Skeleton from "../../components/skeleton/skeleton";
import Pagination from "../../components/paginaton/pagination";
import Categories from "../../components/categories/categories";
import Search from "../../components/search/search";
import { useDebounce } from "../../hooks/useDebounce";

export default function MainPage(): JSX.Element {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [keywords, setKeywords] = useState('')
  const totalPages = 10;
  const pageSize = 11;

  const debounceKeywords = useDebounce(keywords, 1500);

  const fetchNews = async (currentPage: number) => {
    try {
      setIsLoading(true);
      const response = await getNews({
        page_number: currentPage,
        page_size: pageSize,
        category: selectedCategory === 'All' ? undefined : selectedCategory,
        keywords: debounceKeywords
      });
      setNews(response.news);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(['All', ...response.categories]);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage, selectedCategory, debounceKeywords]);

  useEffect(() => {
    fetchCategories();
  }, [])

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
      <Categories categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>

      <Search keywords={keywords} setKeywords={setKeywords}/>

      {news.length > 0 && !isLoading ? <NewsBanner item={news[0]} /> : <Skeleton count={1} type='banner'/>}

      <Pagination 
      totalPages={totalPages} 
      handleNextPageClick={handleNextPageClick} 
      handlePreviousPageClick={handlePreviousPageClick}
      handlePageClick={handlePageClick}
      currentPage={currentPage}
      />

      {isLoading ? <Skeleton count={10} type='item'/> : <NewsList news={news.slice(1)} />}
      
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
