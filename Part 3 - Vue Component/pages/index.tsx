import { NextPageWithLayout } from "./_app";
import Layout from "../layouts/default";
import { useEffect, useState } from "react";
import { Book } from "../types/books";
import { Books } from "../data/books";
import styles from "./index.module.scss";
import * as _ from "underscore";

const Home: NextPageWithLayout = () => {
  const [asc, setAsc] = useState<boolean>(true);
  const [books, setBooks] = useState<Book[]>(Books);
  const [sortBy, setSortBy] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const handleSetBooks = () => {
    if (sortBy != "") {
      let sort = _.sortBy(search == "" ? Books : books, sortBy);
      const sortedBooks: Book[] = asc ? sort : sort.reverse();

      setBooks(sortedBooks);
    } else {
      setBooks(Books);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;

    setSearch(searchValue);
    let sortedBooks = books;

    if (searchValue != "") {
      sortedBooks = _.filter(books, function (book) {
        const x = searchValue.toLowerCase();

        const title = book.title.toLowerCase();
        const author = book.author.toLowerCase();

        const searchTitle = title.includes(x);
        const searchAuthor = author.includes(x);
        const searchYear = String(book.year).includes(x);

        return searchTitle || searchAuthor || searchYear;
      });

      setBooks(sortedBooks);
    } else {
      handleSetBooks();
    }
  };

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortByValue = event.target.value;

    setSortBy(sortByValue);
    handleSetBooks();
  };

  const handleSortDirection = () => {
    const isAsc = !asc;
    setAsc(isAsc);
    handleSetBooks();
  };

  // useEffect(() => {
  //   handleSetBooks();
  // }, []);

  return (
    <div>
      <div className={styles.filters}>
        <div className={styles.sort}>
          Sort
          <select value={sortBy} onChange={handleSort}>
            <option value="">Default</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="year">Year</option>
          </select>
          {sortBy != "" && (
            <button type="button" onClick={handleSortDirection}>
              {!asc && <>↑</>}
              {asc && <>↓</>}
            </button>
          )}
        </div>
        <div className={styles.search}>
          <input type="search" onChange={handleSearch} placeholder="search" />
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => {
            return (
              <tr key={`book-${index}`}>
                <td width={300}>{book.title}</td>
                <td width={200}>{book.author}</td>
                <td width={20}>{book.year}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
