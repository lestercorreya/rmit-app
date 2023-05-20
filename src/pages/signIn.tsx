import { Box, Typography, Button, TextField, Paper, AppBar, InputLabel, FormControl, FormHelperText, OutlinedInput, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup"
import { useState } from 'react';
import axios from 'axios'

const SignIn = () => {
  interface Values {
    name: String,
    emailId: String,
    studentNumber: String,
    password: String
  }

  const initialValues = {
    "name": "",
    "emailId": "",
    "studentNumber": "",
    "password": "",
  }
  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter a name"),
    emailId: Yup.string().email("Please enter valid a email Id").required("Please enter an email Id"),
    studentNumber: Yup.string().required("Please enter a student Number").matches(/^[0-9]+$/, "Must be only digits").min(7, 'Must be exactly 7 digits').max(7, 'Must be exactly 7 digits'),
    password: Yup.string().required("Please enter a password").min(4, "must be atleast 4 characters long")
  })

  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = (values: Values) => {
    axios.post('https://3ow7byfdjd.execute-api.ap-southeast-2.amazonaws.com/dev/signIn', values)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  }

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", padding: "20px", backgroundImage: `url(${"images/background.jpg"})`, backgroundSize: "cover", backgroundPosition: "bottom" }}>
      <AppBar position="static" sx={{ backgroundColor: "white", borderRadius: "50px", opacity: 0.5 }}>
        <Typography variant="h2" sx={{ textDecoration: "underline", fontFamily: "'Berkshire Swash', cursive", textAlign: "center", padding: "20px", color: "black" }}>
          RMIT
        </Typography>
      </AppBar>
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Paper elevation={3} sx={{ display: "flex", flexDirection: "column", maxWidth: "500px", padding: "50px", width: "100%" }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", fontFamily: "'Eczar', serif;", textAlign: "center" }}>
            Sign Up
          </Typography>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {(props) => (
              <Form>
                <Field as={TextField} label='Full Name' name="name" required margin='normal' fullWidth helperText={<ErrorMessage name="name" />} error={props.errors["name"] && props.touched["name"]} />
                <Field as={TextField} label='Email Address' name="emailId" required margin='normal' fullWidth helperText={<ErrorMessage name="emailId" />} error={props.errors["emailId"] && props.touched["emailId"]} />
                <Field as={TextField} label='Student Number' name="studentNumber" required margin='normal' fullWidth helperText={<ErrorMessage name="studentNumber" />} error={props.errors["studentNumber"] && props.touched["studentNumber"]} />
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
                    Sign Up
                  </Typography>
                </Button>
              </Form>
            )}
          </Formik>
          <Typography variant="subtitle1" sx={{ fontFamily: "'Eczar', serif;", textAlign: "center" }}>
            Already have an account? {" "}
            <Link to="/logIn">Log In</Link>
          </Typography>
        </Paper >
      </Box>
    </Box>
  );
}

export default SignIn;