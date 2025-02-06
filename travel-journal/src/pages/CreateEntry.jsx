import { useState } from "react";
import { db, storage, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

function CreateEntry() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = "";
    
    if (image) {
      const imageRef = ref(storage, `travelImages/${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    await addDoc(collection(db, "travels"), {
      title,
      description,
      location,
      date,
      imageUrl,
      userId: auth.currentUser.uid,
    });

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} required></textarea>
      <input type="text" placeholder="Location" onChange={(e) => setLocation(e.target.value)} required />
      <input type="date" onChange={(e) => setDate(e.target.value)} required />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">Create Entry</button>
    </form>
  );
}

export default CreateEntry;
