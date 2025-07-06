const GOOGLE_API_KEY = "AIzaSyAnIQcN0wZJ7CHnGLZ_3Ga75GHQ1te8O3E";
export const YOUTUBE_POPULAR_VEDIO =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" +
  GOOGLE_API_KEY;
export const YotubeVedioList = (maxResults = 10, pageToken = "") => {
  let base = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&domain=youtube&chart=mostPopular&regionCode=IN&order=viewCount&maxResults=${maxResults}`;
  if (pageToken) base += `&pageToken=${pageToken}`;
  return `${base}&key=${GOOGLE_API_KEY}`;
};

export const BUTTON_LIST =
  "https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=IN&key=" +
  GOOGLE_API_KEY;

export const SEARCH_VIDEO =
  "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";
export const DETAIL_VIDEO =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=" +
  GOOGLE_API_KEY +
  "&id=";
export const SEATCH_RESULT_VEDIO_LIST =
  "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=25&key=" +
  GOOGLE_API_KEY +
  "&q=";
export const RELATED_VIDEOS = (categoryId, tags = "") =>
  `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=${categoryId}&q=${encodeURIComponent(
    tags
  )}&maxResults=10&key=${GOOGLE_API_KEY}`;

export const getCommentsURL = (videoId, maxResults = 10, pageToken = "") => {
  let base = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=${maxResults}`;
  if (pageToken) base += `&pageToken=${pageToken}`;
  return `${base}&key=${GOOGLE_API_KEY}`;
};

export const CommentReply = (commentId) =>
  `https://www.googleapis.com/youtube/v3/comments?part=snippet&parentId=${commentId}&key=${GOOGLE_API_KEY}`;

export const ChannelDetail = (channelId) =>
  `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${channelId}&key=${GOOGLE_API_KEY}`;

export const ChannelVedioList = (channelId) =>
  `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&order=date&type=video&key=${GOOGLE_API_KEY}`;

export const ChannelVedioListNext = (channelId, pageToken) =>
  `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&pageToken=${pageToken}&order=date&type=video&key=${GOOGLE_API_KEY}`;

export const ChannelByHandle = (handle) =>
  `https://www.googleapis.com/youtube/v3/channels?part=snippet,brandingSettings,statistics&forHandle=${handle}&key=${GOOGLE_API_KEY}`;

export const ChannelBanner = (channelId) =>
  `https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${channelId}&key=${GOOGLE_API_KEY}`;
