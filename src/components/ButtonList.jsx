import React, { useEffect, useRef, useState } from "react";
import { fetchButtonList } from "../api/api";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const ButtonCarousel = () => {
  const [btnList, setBtnList] = useState([]);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const getButtons = async () => {
      try {
        const data = await fetchButtonList();
        setBtnList(data.items);
      } catch (error) {
        console.error("Error fetching button list:", error);
      }
    };
    getButtons();
  }, []);

  // Check scroll position to toggle scroll buttons
  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition(); // Initial check
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, [btnList]); // Re-check when buttons load

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relativen no-scrollbar overflow-hidden">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar space-x-3 pb-2"
      >
        {btnList.map((btn, index) => (
          <button
            key={btn.id || index}
            className="shrink-0 bg-gray-100 rounded-lg px-4 py-1 text-sm font-semibold whitespace-nowrap hover:bg-gray-200"
          >
            {btn.snippet.title}
          </button>
        ))}
      </div>

      {/* Scroll buttons */}
      {showLeftScroll && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-1 hover:bg-gray-100 z-10"
        >
          <ChevronLeftIcon fontSize="small" />
        </button>
      )}
      {showRightScroll && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-1 hover:bg-gray-100 z-10"
        >
          <ChevronRightIcon fontSize="small" />
        </button>
      )}
    </div>
  );
};

export default ButtonCarousel;
