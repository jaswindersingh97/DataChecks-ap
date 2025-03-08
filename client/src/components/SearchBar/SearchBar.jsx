import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import Api from "../../Api/Api";
import { Link } from "react-router-dom";
const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchResults = async (searchTerm) => {
    if (!searchTerm) return;
    const response = await Api({
      endpoint: `/posts/search?keyword=${searchTerm}`,
      method: "get",
    });
    setResults(response.data);
    setShowDropdown(true);
  };

  const debouncedFetchResults = useCallback(debounce(fetchResults, 500), []);

  useEffect(() => {
    if (keyword.length > 2) {
      debouncedFetchResults(keyword);
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  }, [keyword, debouncedFetchResults]);

  return (
    <div className="relative max-w-md mx-auto">
      <input
        type="search"
        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      {showDropdown && results.length > 0 && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-700 dark:border-gray-600">
          {results.map((item) => (
            <Link to={`/posts/${item.id}`}>
            <li key={item.id} className="p-2 hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-600">
              <h1 className="font-bold">{item.title}</h1>
              <p>{item.content}</p>
            </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
