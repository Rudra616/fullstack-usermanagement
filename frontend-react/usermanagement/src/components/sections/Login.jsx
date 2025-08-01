import axios from 'axios';
import React , {useState} from 'react'
import {useNavigate} from 'react-router-dom'
const Login = () => {
  const [username, newusername] = useState("");
  const [password, newpassword] = useState("");
  const [loading, setloding] = useState(false);
  // const [errors,seterror] = useState({})
  const navigate = useNavigate()
  const handleLogin = async (e) =>{
    e.preventDefault()
    setloding(true)
    const userData = { 
      username,
      password
    }
    try{
      const responce  = await axios.post('http://fullstakeusermanagement.local/token/',userData)
      newusername("");
      newpassword("");
      localStorage.setItem('accessToken',responce.data.access)
      localStorage.setItem('accessToken',responce.data.refresh)
      console.log("login successfully")
      navigate('/')
    }catch(error){

      // seterror(error.response.data);
      console.log("server response:", error.response?.data);
      
    }finally{
      setloding(false)
    }
  }
  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            zIndex: 9999,
            cursor: "not-allowed",
          }}
        ></div>
      )}

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 bg-light p-4 rounded">
            <h3 className="text-center">Login</h3>
            <form onSubmit={handleLogin}>
    
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => newusername(e.target.value)}
                />
              {/* <small>{errors.username}</small> */}
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => newpassword(e.target.value)}
                />
                {/* <small>{errors.password}</small> */}
              </div>
                   
              <button
                type="submit"
                className="btn btn-info w-100"
                disabled={loading}
                style={{ cursor: loading ? "not-allowed" : "pointer" }}
              >
                {loading ? "Loging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login