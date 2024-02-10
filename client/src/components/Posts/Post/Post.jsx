import React, { useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined.js";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles.js";
import {
  deletePostsAsync,
  fetchPostsAsync,
  likePostAsync,
} from "../../../Redux/postSlice.js";

function Post({ post, setCurrentId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user) || null;

  const handleLikes = async (id) => {
    await dispatch(likePostAsync(id));
    dispatch(fetchPostsAsync());
  };

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.includes(user?._id) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `You Liked`}
        </>
      ) : (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 1 ? `${post.likes.length} Likes` : "1 Like"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card} elevation={10}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {user?._id === post?.creator && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrentId(post._id)}
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
      )}

      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component={"p"}
          gutterBottom
        >
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => handleLikes(post._id)}
          disabled={!user}
        >
          <Likes />
        </Button>
        {user?._id === post?.creator && (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(deletePostsAsync(post._id));
            }}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default Post;
