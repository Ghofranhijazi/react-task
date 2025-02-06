import { useState } from "react";
import { auth, googleProvider, signInWithEmailAndPassword  } from "../firebase"
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch(error) {
            console.error("Error logging in:", error)
        }
    };
    const handleGoogleLogin = async () => {
        try {
          await signInWithPopup(auth, googleProvider);
          navigate("/");
        } catch (error) {
          console.error("Error logging in with Google:", error);
        }
      };
      return (
        <div>
          <h2>Log in</h2>
    
          <form onSubmit={handleEmailLogin}>
            <input
              type="email"
              placeholder="e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Log in</button>
          </form>
    
          <hr />
          <button onClick={handleGoogleLogin}> Sign in with Google</button>
        </div>
      );
    }
    export default Login;


