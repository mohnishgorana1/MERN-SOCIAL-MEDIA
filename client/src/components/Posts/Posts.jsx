import Post from "./Post/Post.jsx";
import { CircularProgress, Grid } from "@material-ui/core";
import useStyles from "./styles.js";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Posts({ setCurrentId }) {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {}, [posts]);

  return (
    <>
      {!posts.length ? (
        <CircularProgress />
      ) : (
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={4} >
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default Posts;
