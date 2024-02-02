import Post from "./Post/Post.jsx";
import { CircularProgress, Grid } from "@material-ui/core";
import useStyles from "./styles.js";
import { useSelector } from "react-redux";

function Posts() {
  const classes = useStyles();

  const posts = useSelector((state) => state.posts);
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
            <Grid key={post._id} item xs={12} sm={6}>
              <Post post={post} />

            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default Posts;
