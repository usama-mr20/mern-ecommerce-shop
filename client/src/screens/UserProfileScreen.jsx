import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { getUserDetails, updateUserProfile } from "../actions/userActions";
import LinearProgress from "@material-ui/core/LinearProgress";
import AlertMessage from "../components/AlertMessage";

const UserProfileScreen = ({ history, location }) => {
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (user.email !== userInfo.email) {
        dispatch(getUserDetails("profile"));
      } else {
        setEmail(user.email);
        setName(user.name);
      }
    }
  }, [userInfo, dispatch, history, user]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ name, email, password }));
    }
  };

  const snackbar = (message, variant) => {
    return <AlertMessage variant={variant}> {message} </AlertMessage>;
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={3}>
          <h2>My Profile:</h2>
          {error && <AlertMessage variant='error'> {error} </AlertMessage>}
          {message && snackbar(message, "error")} {/* passwords do not match */}
          {success && snackbar(" Profile updated successfully ", "success")}
          <br />
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete='name'
                  name='Name'
                  variant='filled'
                  required
                  fullWidth
                  id='Name'
                  label='Your Name'
                  value={name}
                  onChange={handleNameChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant='filled'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  value={email}
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='filled'
                  required
                  fullWidth
                  // name='password'
                  label='New password'
                  type='password'
                  // id='password'
                  onChange={handlePasswordChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='filled'
                  required
                  fullWidth
                  // name='confirm password'
                  label='Confirm password'
                  type='password'
                  id='confirmPassword'
                  onChange={handleConfirmPasswordChange}
                />
              </Grid>
            </Grid>
            <br />
            {loading && <LinearProgress />}
            <br />
            <Button type='submit' fullWidth variant='contained' color='primary'>
              Update
            </Button>
          </form>
        </Grid>

        <Grid item md={9}>
          <h2>My Orders</h2>
        </Grid>
      </Grid>
    </>
  );
};

export default UserProfileScreen;
