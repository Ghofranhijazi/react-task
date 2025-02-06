import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { auth } from "../firebase"


function Home (){
    const [travels, setTravels] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getDocs(collection(db, "travels"));
            setTravels(data.docs.map(doc => ({id: doc.id, ...doc.data()})));
        };
        fetchData();
    }, []);

    return (
        <div>
          <h2>Travel Journal</h2>
          <Link to="/create">Add New Travel Entry</Link>
          {auth.currentUser ? (
        <Link to="/profile">My Profile</Link>
      ) : (
        <Link to="/login">Log in</Link>
      )}
          <div>
            {travels.map((entry) => (
              <div key={entry.id}>
                <h3>{entry.title}</h3>
                <p>{entry.location} - {entry.date}</p>
                <Link to={`/entry/${entry.id}`}>View Details</Link>
              </div>
            ))}
          </div>
        </div>
      );
}
export default Home;