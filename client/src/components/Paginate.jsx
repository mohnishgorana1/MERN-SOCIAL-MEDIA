import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsAsync } from "../Redux/postSlice";

function Paginate({ page }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { numberOfPages } = useSelector((state) => state.posts);

  const user = useEffect(() => {
    if (page) {
      dispatch(fetchPostsAsync(page));
    }
  }, [page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  );
}

export default Paginate;
