import {
  BUTTON_LIST,
  ChannelBanner,
  ChannelByHandle,
  ChannelDetail,
  ChannelVedioList,
  ChannelVedioListNext,
  CommentReply,
  DETAIL_VIDEO,
  getCommentsURL,
  RELATED_VIDEOS,
  SEARCH_VIDEO,
  YotubeVedioList,
} from "../utils/constant";

export const fetchYoutubeVedioData = async (
  maxResults = 10,
  pageToken = ""
) => {
  const url = YotubeVedioList(maxResults, pageToken);
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const fetchButtonList = async () => {
  const res = await fetch(BUTTON_LIST);
  const data = await res.json();
  return data;
};

export const fetchSearchVideo = async (query) => {
  const res = await fetch(SEARCH_VIDEO + query);
  const data = await res.json();
  return data;
};

export const fetchVedioDetails = async (id) => {
  const res = await fetch(DETAIL_VIDEO + id);
  const data = await res.json();
  return data;
};

export const fetchRelatedVideos = async (id, tags) => {
  const res = await fetch(RELATED_VIDEOS(id, tags)); // call function, not add string
  const data = await res.json();
  return data;
};

export const fetchCommentsList = async (
  videoId,
  maxResults = 10,
  pageToken = ""
) => {
  const url = getCommentsURL(videoId, maxResults, pageToken);
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const getRepliesForComment = async (commentId) => {
  const res = await fetch(CommentReply(commentId));
  const data = await res.json();
  return data.items; // Array of replies
};

export const getChannelDetails = async (channelId) => {
  const res = await fetch(ChannelDetail(channelId));
  const data = await res.json();
  return data.items; // Array of replies
};

export const getChannelVideos = async (channelId) => {
  const res = await fetch(ChannelVedioList(channelId));
  const data = await res.json();
  return data.items; // Array of replies
};

export const getChannelVideosNext = async (channelId, pageToken) => {
  const res = await fetch(ChannelVedioListNext(channelId, pageToken));
  const data = await res.json();
  return data.items; // Array of replies
};

export const getChannelByHandle = async (handle) => {
  const res = await fetch(ChannelByHandle(handle));
  const data = await res.json();
  return data.items; // Array of replies
};

export const getChannelBanner = async (channelId) => {
  const res = await fetch(ChannelBanner(channelId));
  const data = await res.json();
  return data.items; // Array of replies
};
