import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { PiMicrophoneFill } from "react-icons/pi";
import { fetchSearchVideo } from "../api/api";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getSearch();
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm]);
  const getSearch = async () => {
    try {
      const data = await fetchSearchVideo(searchTerm);
      setSearchResults(data[1]);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  return (
    <div>
      {" "}
      <div className="flex  flex-1 justify-center max-w-[700px]">
        <div
          className={`relative flex items-center transition-all duration-300 bg-white border border-gray-300 rounded-l-full ${
            isFocused ? "w-[500px] ring-1 ring-blue-400" : "w-[500px]"
          }`}
        >
          {isFocused && (
            <CiSearch className="absolute left-3 text-gray-500" size={20} />
          )}
          <input
            type="search"
            placeholder="Search"
            onFocus={() => {
              setShowSuggestions(true);
              setIsFocused(true);
            }}
            onBlur={() => {
              setShowSuggestions(false);
              setIsFocused(false);
            }}
            value={searchTerm}
            onChange={(event) => handleSearch(event)}
            className={`w-full pl-10 pr-4 text-md bg-transparent rounded-full focus:outline-none`}
          />
          {showSuggestions && searchResults.length > 0 && (
            <div className="absolute top-14 py-4 left-0 w-full bg-white border border-gray-300 rounded-2xl">
              {searchResults.map((result, index) => (
                <div className="p-3 py-2 cursor-pointer flex gap-4 hover:bg-gray-100">
                  <CiSearch
                    size={24}
                    className=" left-3 my-auto  text-gray-800"
                  />{" "}
                  <p className="my-auto text-md font-semibold">{result}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <button className=" bg-gray-100 inset-shadow-2xs p-1 px-6 rounded-r-full hover:bg-gray-200 transition">
          <CiSearch className="text-xl" />
        </button>
        <div className="p-3 ml-[30px] bg-gray-100 hover:bg-gray-200 rounded-full">
          <PiMicrophoneFill className="text-xl" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
