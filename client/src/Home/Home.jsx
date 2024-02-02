import { Container, Grid, Grow } from "@material-ui/core";
import { useEffect, useState } from "react";
import Posts from "../components/Posts/Posts";
import Form from "../components/Form/Form.jsx";
import { fetchPostsAsync } from "../Redux/postSlice";
import { useDispatch } from "react-redux";
import useStyles from "../styles.js";

function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, [dispatch, currentId]);

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.mainContainer}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
