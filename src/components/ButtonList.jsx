import React, { useEffect, useRef, useState } from "react";
import { fetchButtonList } from "../api/api";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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
    
    <div className="relative container bg-white px-4 py-3 sticky top-[88px] z-10  overflow-hidden">
      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide space-x-3"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {btnList.map((btn, index) => (
          <button
            key={btn.id || index}
            className="shrink-0 bg-gray-200 cursor-pointer rounded-xl px-4 py-2 text-lg font-semibold whitespace-nowrap hover:bg-gray-300 transition-colors"
          >
            {btn.snippet.title}
          </button>
        ))}
      </div>

      {/* Scroll buttons (only show if needed) */}
      {showLeftScroll && (
        <button
          onClick={() => scroll("left")}
          className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 bg-white p-2 shadow-md rounded-full hover:bg-gray-100"
        >
          <ChevronLeftIcon fontSize="small" />
        </button>
      )}
      {showRightScroll && (
        <button
          onClick={() => scroll("right")}
          className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 bg-white p-2 shadow-md rounded-full hover:bg-gray-100"
        >
          <ChevronRightIcon fontSize="small" />
        </button>
      )}
    </div>
  );
};

export default ButtonCarousel;