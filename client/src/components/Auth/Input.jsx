import { Grid, IconButton, InputAdornment, TextField } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

function Input({ name, label, type, half, autoFocus, handleChange, handleShowPassword }) {
  return (
    <Grid item xs={12} sm={half ? 6 : 12} md={12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        label={label}
        required
        fullWidth
        autoFocus={autoFocus}
        type={type}
        InputProps={
          name === "password" && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {type === "password" ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }
        }
      />
    </Grid>
  );
}

export default Input;
