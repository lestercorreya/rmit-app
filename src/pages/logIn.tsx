import { Box, Typography, Button, TextField, Paper, AppBar, InputLabel, FormControl, FormHelperText, OutlinedInput, IconButton, InputAdornment } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup"
import { Link } from "react-router-dom"
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import axios from 'axios'

const LogIn = () => {
  interface Values {
    emailId: String,
    password: String
  }

  const initialValues = {
    "emailId": "",
    "password": "",
  }
  const validationSchema = Yup.object({
    emailId: Yup.string().email("Please enter a valid email Id").required("Please enter an email Id"),
    password: Yup.string().required("Please enter a password").min(4, "must be atleast 4 characters long")
  })

  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = (values: Values) => {
    axios.post('https://7x5bv0kfa8.execute-api.ap-southeast-2.amazonaws.com/dev/logIn', values)
      .then((response: any) => {
        console.log(response.data)
        sessionStorage.setItem("access_token", response.data.access_token);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  }

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", padding: "20px", backgroundImage: `url(${"images/background.jpg"})`, backgroundSize: "cover" }}>
      <AppBar position="static" sx={{ backgroundColor: "white", borderRadius: "50px", opacity: 0.5 }}>
        <Typography variant="h2" sx={{ textDecoration: "underline", fontFamily: "'Berkshire Swash', cursive", textAlign: "center", padding: "20px", color: "black" }}>
          Our App
        </Typography>
      </AppBar>
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Paper elevation={3} sx={{ display: "flex", flexDirection: "column", maxWidth: "500px", padding: "50px", width: "100%" }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", fontFamily: "'Eczar', serif;", textAlign: "center" }}>
            Log In
          </Typography>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {(props) => (
              <Form>
                <Field as={TextField} label='Email Address' name="emailId" required margin='normal' fullWidth helperText={<ErrorMessage name="emailId" />} error={props.errors["emailId"] && props.touched["emailId"]} />
                <FormControl variant="outlined" margin='normal' fullWidth required >
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <Field as={OutlinedInput}
                    id="outlined-adornment-password"
                    helperText={<ErrorMessage name="password" />}
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    error={props.errors["password"] && props.touched["password"]}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((show) => !show)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  {props.errors["password"] && props.touched["password"] && <FormHelperText error>{props.errors["password"]}</FormHelperText>}
                </FormControl>
                <Button type="submit" variant="contained" sx={{ margin: "20px 0" }} size='large' fullWidth>
                  <Typography variant="h5" sx={{ fontFamily: "'Eczar', serif;", textAlign: "center" }}>
                    Log In
                  </Typography>
                </Button>
              </Form>
            )}
          </Formik>
          <Typography variant="subtitle1" sx={{ fontFamily: "'Eczar', serif;", textAlign: "center" }}>
            Don't have an account? {" "}
            <Link to="/signIn">Sign Up</Link>
          </Typography>
        </Paper >
      </Box>
    </Box >
  );
}

export default LogIn;