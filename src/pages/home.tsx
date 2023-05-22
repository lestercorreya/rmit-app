import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import { Box, Typography, AppBar, Card, CardActionArea, CardMedia, Toolbar, CardActions, Button } from "@mui/material";

type StudentDetails = {
  name: string,
  role: string,
  certificates: Array<string>
}
type AdminDetails = {
  name: string,
  role: string,
  students: Array<{
    name: string,
    certificates: Array<string>
  }>
}

const Home = () => {
  const navigate = useNavigate()

  const [studentDetails, setStudentDetails] = useState<StudentDetails>({
    name: "",
    role: "student",
    certificates: []
  })
  const [adminDetails, setAdminDetails] = useState<AdminDetails>({
    name: "",
    role: "admin",
    students: []
  })
  const [role, setRole] = useState("Student")

  useEffect(() => {
    axios.get('https://3ow7byfdjd.execute-api.ap-southeast-2.amazonaws.com/dev/getDetails', {
      headers: {
        'Authorization': `token ${sessionStorage.getItem("access_token")}`
      }
    })
      .then((response: any) => {
        setRole(response.data.role)
        if (response.data.role == "student") {
          setStudentDetails(response.data)
        } else {
          setAdminDetails(response.data)
        }
      })
      .catch((error) => {
        navigate("/login")
      });
  }, [])

  const handleLogOut = () => {
    sessionStorage.removeItem("access_token")
    navigate("/login")
  }

  return (
    <Box sx={{ height: "100vh", backgroundImage: `url(${"images/home-background.jpg"})`, overflowY: "scroll", backgroundSize: "cover" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <SchoolIcon />
          </Typography>
          <Button color="inherit" onClick={handleLogOut}>Log Out</Button>
        </Toolbar>
      </AppBar>
      {role == "student" ? <StudentPage studentDetails={studentDetails} /> : <AdminPage adminDetails={adminDetails} />}
    </Box>
  );
}

const StudentPage = ({ studentDetails }: { studentDetails: StudentDetails }) => {
  return (
    <Box sx={{ padding: "50px" }}>
      <Typography variant="h3" sx={{ fontFamily: "'Eczar', serif;" }}>
        Welcome, {studentDetails.name}
      </Typography>
      <Typography variant="h4" sx={{ fontFamily: "'Eczar', serif;", margin: "50px 0" }}>
        Certificates
      </Typography>
      <Box sx={{ display: "flex", gap: "40px" }}>
        {studentDetails.certificates.map(url => {
          return <CustomCard url={url} role={studentDetails.role} />
        })}
      </Box>
    </Box>
  )
}

const AdminPage = ({ adminDetails }: { adminDetails: AdminDetails }) => {
  return (
    <Box sx={{ padding: "50px" }}>
      <Typography variant="h3" sx={{ fontFamily: "'Eczar', serif;" }}>
        Welcome, {adminDetails.name}
      </Typography>
      {adminDetails.students.map(student => {
        return (
          <>
            <Typography variant="h4" sx={{ fontFamily: "'Eczar', serif;", margin: "20px 0" }}>
              {student.name}'s Certificates
            </Typography>
            <Box sx={{ display: "flex", gap: "40px" }}>
              {student.certificates.map(url => {
                return <CustomCard url={url} role={adminDetails.role} />
              })}
            </Box>
          </>
        )
      })}
    </Box>
  )
}

const CustomCard = ({ url, role }: { url: string, role: string }) => {

  const downloadImage = (src: string) => {
    fetch(src, { headers: { "Access-Control-Allow-Headers": "*", "Access-Control-Allow-Credentials": "true" }, cache: "no-cache" })
      .then(response => response.blob())
      .then(blob => {
        let blobUrl = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.download = "certificate"
        a.href = blobUrl;
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          src={url}
          alt="green iguana"
          onClick={() => window.open(url, '_blank')?.focus()}
        />
      </CardActionArea>
      {role == "student" &&
        <CardActions>
          <Button size="large" color="primary" onClick={() => downloadImage(url)}>
            Download
          </Button>
        </CardActions>
      }
    </Card>
  )
}

export default Home;