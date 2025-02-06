import { useState } from "react";
import { auth, createUserWithEmailAndPassword } from "../firebase"
import { useNavigate } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handleRegister = async (e) => {
      e.preventDefault();
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate("/");
      } catch (error) {
        console.error("Error signing up:", error);
      }
    };
  
    return (
      <div>
        <h2>Create a new account</h2>
        <form onSubmit={handleRegister}>
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
          <button type="submit">Create account</button>
        </form>
      </div>
    );
  }
  
  export default Register;