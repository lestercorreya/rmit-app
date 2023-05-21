import { Box, Typography, Button, TextField, Paper } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup"
import { Link } from "react-router-dom"
import { useState } from 'react';
import axios from 'axios'

const Validate = () => {
  interface Values {
    certificateId: String,
  }

  const initialValues = {
    "certificateId": "",
  }
  const validationSchema = Yup.object({
    certificateId: Yup.string().required("Please enter a certificate Id").min(8, 'Must be exactly 8 characters').max(8, 'Must be exactly 8 characters'),
  })

  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = (values: Values) => {
    axios.post('https://3ow7byfdjd.execute-api.ap-southeast-2.amazonaws.com/dev/validate', values)
      .then((response: any) => {
        window.open(response.data.url, '_blank')?.focus();
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  }

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", padding: "20px", backgroundImage: `url(${"images/background.jpg"})`, backgroundSize: "cover", backgroundPosition: "bottom" }}>
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Paper elevation={3} sx={{ display: "flex", flexDirection: "column", maxWidth: "500px", padding: "50px", width: "100%" }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", fontFamily: "'Eczar', serif;", textAlign: "center" }}>
            Validate
          </Typography>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {(props) => (
              <Form>
                <Field as={TextField} label='Certificate Id' name="certificateId" required margin='normal' fullWidth helperText={<ErrorMessage name="certificateId" />} error={props.errors["certificateId"] && props.touched["certificateId"]} />
                <Button type="submit" variant="contained" sx={{ margin: "20px 0" }} size='large' fullWidth>
                  <Typography variant="h5" sx={{ fontFamily: "'Eczar', serif;", textAlign: "center" }}>
                    Validate
                  </Typography>
                </Button>
              </Form>
            )}
          </Formik>
          <Typography variant="subtitle1" sx={{ fontFamily: "'Eczar', serif;", textAlign: "center" }}>
            Already have an account? {" "}
            <Link to="/logIn">Log In</Link>
          </Typography>
          <Typography variant="subtitle1" sx={{ fontFamily: "'Eczar', serif;", textAlign: "center" }}>
            Don't have an account? {" "}
            <Link to="/signIn">Sign Up</Link>
          </Typography>
        </Paper >
      </Box>
    </Box >
  );
}

export default Validate;