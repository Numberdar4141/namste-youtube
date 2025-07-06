export const formatViewCount = (num) => {
  if (num < 1000) return `${num} views`;
  if (num < 1_000_000) return `${(num / 1000).toFixed(1)}K views`;
  if (num < 1_000_000_000) return `${(num / 1_000_000).toFixed(1)}M views`;
  return `${(num / 1_000_000_000).toFixed(1)}B views`;
};

export const getRelativeTime = (dateString) => {
  const now = new Date();
  const published = new Date(dateString);
  const seconds = Math.floor((now - published) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (let interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};

export const formatCount = (num) => {
  if (!num) return "0";
  const n = Number(num);
  if (n >= 1e9) return (n / 1e9).toFixed(1) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return n.toString();
};

export const formatSubscribers = (count) => {
  return `${formatCount(count)} subscribers`;
};

export const formatVideos = (count) => {
  return `${formatCount(count)} videos`;
};
