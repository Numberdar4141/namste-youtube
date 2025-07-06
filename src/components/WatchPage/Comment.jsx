import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  CircularProgress,
  Button,
} from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ReplyIcon from "@mui/icons-material/Reply";
import { fetchCommentsList, getRepliesForComment } from "../../api/api";

const CommentList = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  const [comments, setComments] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [repliesMap, setRepliesMap] = useState({});
  const loaderRef = useRef(null);

  const fetchComments = async (token = "") => {
    setIsLoading(true);
    try {
      const data = await fetchCommentsList(videoId, 10, token);
      setComments((prev) => [...prev, ...(data.items || [])]);
      setNextPageToken(data.nextPageToken || null);
    } catch (err) {
      console.error("Failed to fetch comments", err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadReplies = async (commentId) => {
    if (repliesMap[commentId]) return;
    try {
      const replies = await getRepliesForComment(commentId);
      setRepliesMap((prev) => ({ ...prev, [commentId]: replies }));
    } catch (err) {
      console.error("Failed to load replies", err);
    }
  };

  useEffect(() => {
    setComments([]);
    setNextPageToken(null);
    setRepliesMap({});
    if (videoId) fetchComments();
  }, [videoId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && nextPageToken && !isLoading) {
          fetchComments(nextPageToken);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [nextPageToken, isLoading]);

  return (
    <Box sx={{ px: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>

      {comments.map((item) => {
        const topComment = item.snippet.topLevelComment.snippet;
        const totalReplyCount = item.snippet.totalReplyCount;
        const commentId = item.snippet.topLevelComment.id;

        return (
          <Box key={item.id} sx={{ display: "flex", mb: 4 }}>
            <Avatar
              src={topComment.authorProfileImageUrl}
              alt={topComment.authorDisplayName}
              sx={{ width: 40, height: 40, mr: 2 }}
            />
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                {topComment.authorDisplayName}{" "}
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.secondary", ml: 1 }}
                >
                  {new Date(topComment.publishedAt).toLocaleDateString()}
                </Typography>
              </Typography>
              <Typography
                variant="body2"
                sx={{ whiteSpace: "pre-wrap", mt: 0.5 }}
                dangerouslySetInnerHTML={{ __html: topComment.textDisplay }}
              />
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <IconButton size="small">
                  <ThumbUpOffAltIcon fontSize="small" />
                </IconButton>
                <Typography variant="caption" sx={{ mr: 2 }}>
                  {topComment.likeCount}
                </Typography>
                <IconButton size="small">
                  <ThumbDownOffAltIcon fontSize="small" />
                </IconButton>
                <Typography
                  variant="caption"
                  sx={{ ml: 2, fontWeight: 500, cursor: "pointer" }}
                >
                  <ReplyIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                  Reply
                </Typography>
              </Box>

              {totalReplyCount > 0 && (
                <Button
                  onClick={() => loadReplies(commentId)}
                  sx={{ borderRadius: "20px", px: 2, my: 1 }}
                  variant="text"
                >
                  {repliesMap[commentId]
                    ? "Hide replies"
                    : `View ${totalReplyCount} replies`}
                </Button>
              )}

              {/* Render replies */}
              {repliesMap[commentId]?.map((reply) => (
                <Box key={reply.id} sx={{ display: "flex", mt: 2, ml: 6 }}>
                  <Avatar
                    src={reply.snippet.authorProfileImageUrl}
                    alt={reply.snippet.authorDisplayName}
                    sx={{ width: 32, height: 32, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {reply.snippet.authorDisplayName}{" "}
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "text.secondary", ml: 1 }}
                      >
                        {new Date(
                          reply.snippet.publishedAt
                        ).toLocaleDateString()}
                      </Typography>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ whiteSpace: "pre-wrap", mt: 0.5 }}
                      dangerouslySetInnerHTML={{
                        __html: reply.snippet.textDisplay,
                      }}
                    />
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <IconButton size="small">
                        <ThumbUpOffAltIcon fontSize="small" />
                      </IconButton>
                      <Typography variant="caption" sx={{ mr: 2 }}>
                        {topComment.likeCount}
                      </Typography>
                      <IconButton size="small">
                        <ThumbDownOffAltIcon fontSize="small" />
                      </IconButton>
                      <Typography
                        variant="caption"
                        sx={{ ml: 2, fontWeight: 500, cursor: "pointer" }}
                      >
                        <ReplyIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                        Reply
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        );
      })}

      <Box
        ref={loaderRef}
        sx={{ display: "flex", justifyContent: "center", my: 4 }}
      >
        {isLoading && <CircularProgress />}
      </Box>
    </Box>
  );
};

export default CommentList;
