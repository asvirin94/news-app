import { useState } from "react";
import styles from "./styles.module.css";
import { getCategories, getNews } from "../../api/apiNews";
import Pagination from "../../components/paginaton/pagination";
import Categories from "../../components/categories/categories";
import Search from "../../components/search/search";
import { useDebounce } from "../../hooks/useDebounce";
import { TOTAL_PAGES, PAGE_SIZE } from "../../consts";
import { NewsBannerWithSkeleton } from "../../components/news-banner/news-banner";
import { NewsListWithSkeleton } from "../../components/news-list/news-list";
import { useFetch } from "../../hooks/useFetch";

export default function MainPage(): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [keywords, setKeywords] = useState("");

  const debounceKeywords = useDebounce(keywords, 1500);

  const {data, error, isLoading} = useFetch(getNews, {
    page_number: currentPage,
    page_size: PAGE_SIZE,
    category: selectedCategory === "All" ? undefined : selectedCategory,
    keywords: debounceKeywords,
  });

  console.log(error);

  const {data: dataCategories} = useFetch(getCategories)

  const handleNextPageClick = () => {
    if (currentPage < TOTAL_PAGES) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPageClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    if (currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <main className={styles.main}>

      {dataCategories ? <Categories
        categories={dataCategories.categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      /> : null}

      <Search keywords={keywords} setKeywords={setKeywords} />

      {data && data.news && <NewsBannerWithSkeleton isLoading={isLoading} item={data?.news[0]} />}

      <Pagination
        totalPages={TOTAL_PAGES}
        handleNextPageClick={handleNextPageClick}
        handlePreviousPageClick={handlePreviousPageClick}
        handlePageClick={handlePageClick}
        currentPage={currentPage}
      />

      <NewsListWithSkeleton isLoading={isLoading} news={data?.news.slice(1)} />

      <Pagination
        totalPages={TOTAL_PAGES}
        handleNextPageClick={handleNextPageClick}
        handlePreviousPageClick={handlePreviousPageClick}
        handlePageClick={handlePageClick}
        currentPage={currentPage}
      />
    </main>
  );
}
