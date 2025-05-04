import { BUTTON_LIST, YOUTUBE_POPULAR_VEDIO, YOUTUBE_VEDIO_LIST } from "../utils/constant";

export const fetchYoutubeVedioData = async () => {
  const res = await fetch(YOUTUBE_POPULAR_VEDIO);
  const data = await res.json();
  return data;
};

export const fetchYoutubeVedioList = async () => {
  const res = await fetch(YOUTUBE_VEDIO_LIST);
  const data = await res.json();
};

export const fetchButtonList = async () => {
  const res = await fetch(BUTTON_LIST);
  console.log("🚀 ~ fetchButtonList ~ res:", res)
  const data = await res.json();
  return data;
};
