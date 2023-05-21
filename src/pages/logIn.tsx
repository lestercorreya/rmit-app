import { Box, Typography, Button, TextField, Paper, Snackbar, Alert, InputLabel, FormControl, FormHelperText, OutlinedInput, IconButton, InputAdornment } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup"
import { Link } from "react-router-dom"
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  type Values = {
    emailId: String,
    password: String
  }
  type Alert = "success" | "error"

  const initialValues = {
    "emailId": "",
    "password": "",
  }
  const validationSchema = Yup.object({
    emailId: Yup.string().email("Please enter a valid email Id").required("Please enter an email Id"),
    password: Yup.string().required("Please enter a password").min(4, "must be atleast 4 characters long")
  })

  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [alertType, setAlertType] = useState<Alert>("error")

  const onSubmit = (values: Values) => {
    axios.post('https://3ow7byfdjd.execute-api.ap-southeast-2.amazonaws.com/dev/logIn', values)
      .then((response: any) => {
        sessionStorage.setItem("access_token", response.data.access_token);
        setAlertMessage("User Logged In Successfully")
        setAlertOpen(true)
        setAlertType("success")
        setTimeout(() => {
          navigate("/")
        }, 1000)
      })
      .catch((error: any) => {
        setAlertMessage(error.response.data.message)
        setAlertOpen(true)
      });
  }

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", padding: "20px", backgroundImage: `url(${"images/background.jpg"})`, backgroundSize: "cover", backgroundPosition: "bottom" }}>
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
          <Typography variant="subtitle1" sx={{ fontFamily: "'Eczar', serif;", textAlign: "center", marginBottom: "20px" }}>
            Don't have an account? {" "}
            <Link to="/signIn">Sign Up</Link>
          </Typography>
          <Link to="/validate">
            <Typography variant="h6" sx={{ fontFamily: "'Eczar', serif;", textAlign: "center" }}>
              Validate Certificate
            </Typography>
          </Link>
        </Paper >
      </Box>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={() => setAlertOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setAlertOpen(false)} severity={alertType} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box >
  );
}

export default LogIn;