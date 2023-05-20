import { useEffect } from "react";
import axios from 'axios'

const Home = () => {
  useEffect(() => {
    axios.get('https://7x5bv0kfa8.execute-api.ap-southeast-2.amazonaws.com/dev/getDetails', {
      headers: {
        'Authorization': `token ${sessionStorage.getItem("access_token")}`
      }
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  return (
    <div>
      hello
    </div>
  );
}

export default Home;