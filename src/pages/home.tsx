import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from "@mui/material";

type StudentDetails = {
  name: String,
  role: String,
  certificates: Array<String>
}
type AdminDetails = {
  name: String,
  role: String,
  students: Array<{
    name: String,
    certificates: Array<String>
  }>
}

const Home = () => {
  const navigate = useNavigate()

  const [studentDetails, setStudentDetails] = useState({
    name: "",
    role: "Student",
    certificates: []
  })
  const [adminDetails, setAdminDetails] = useState({
    name: "",
    role: "admin",
    students: []
  })
  const [role, setRole] = useState("Student")

  useEffect(() => {
    axios.get('https://7x5bv0kfa8.execute-api.ap-southeast-2.amazonaws.com/dev/getDetails', {
      headers: {
        'Authorization': `token ${sessionStorage.getItem("access_token")}`
      }
    })
      .then((response: any) => {
        setRole(response.data.role)
        if (response.data.role == "Student") {
          setStudentDetails(response.data)
        } else {
          setAdminDetails(response.data)
        }
      })
      .catch(() => {
        navigate("/login")
      });
  }, [])

  return (
    <Box sx={{ height: "100vh" }}>
      {role == "Student" ? <StudentPage studentDetails={studentDetails} /> : <AdminPage adminDetails={adminDetails} />}
    </Box>
  );
}

const StudentPage = ({ studentDetails }: { studentDetails: StudentDetails }) => {
  return (
    <>
      <Typography variant="h2" sx={{ fontFamily: "'Eczar', serif;", textAlign: "center" }}>
        Hello, {studentDetails.name}
      </Typography>
    </>
  )
}

const AdminPage = ({ adminDetails }: { adminDetails: AdminDetails }) => {
  return (
    <>
      <Typography variant="h2" sx={{ fontFamily: "'Eczar', serif;", textAlign: "center" }}>
        Hello, {adminDetails.name}
      </Typography>
    </>

  )
}

export default Home;