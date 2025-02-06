import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { doc, getDoc, updateDoc, deleteDoc, collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";

const TravelDetails = () => {
  const { travelId } = useParams();  // للحصول على معرف المقال من رابط URL
  const navigate = useNavigate();
  const [travel, setTravel] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // جلب تفاصيل الرحلة من Firestore
  useEffect(() => {
    const fetchTravel = async () => {
      const docRef = doc(db, "travels", travelId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTravel(docSnap.data());
      } else {
        console.log("There is no data for this flight");
      }
    };

    const fetchComments = async () => {
      const data = await getComments(travelId);
      setComments(data);
    };

    fetchTravel();
    fetchComments();
  }, [travelId]);

  // 🔹 دالة جلب التعليقات
  const getComments = async (travelId) => {
    const q = query(collection(db, "comments"), where("travelId", "==", travelId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };

  // 🔹 دالة إضافة تعليق جديد
  const addComment = async (travelId, text) => {
    await addDoc(collection(db, "comments"), {
      travelId,
      text,
      createdAt: serverTimestamp(),
    });
  };

  // إضافة تعليق
  const handleAddComment = async () => {
    if (newComment.trim() !== "") {
      await addComment(travelId, newComment);
      setNewComment("");
      const data = await getComments(travelId);  // إعادة تحميل التعليقات
      setComments(data);
    }
  };

  // تعديل الرحلة
  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(travel.title);
    setEditDescription(travel.description);
  };

  const handleSaveEdit = async () => {
    const travelRef = doc(db, "travels", travelId);
    await updateDoc(travelRef, {
      title: editTitle,
      description: editDescription,
    });
    setIsEditing(false);
    setTravel(prev => ({
      ...prev,
      title: editTitle,
      description: editDescription,
    }));
  };

  // حذف الرحلة
  const handleDelete = async () => {
    const travelRef = doc(db, "travels", travelId);
    await deleteDoc(travelRef);
    navigate("/"); // التوجيه للصفحة الرئيسية بعد الحذف
  };

  return (
    <div>
      {travel && (
        <div>
          <h2>
            {isEditing ? (
              <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
            ) : (
              travel.title
            )}
          </h2>

          <p>
            {isEditing ? (
              <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
            ) : (
              travel.description
            )}
          </p>

          <p>📍 Location: {travel.location}</p>
          <p>📅 Date: {new Date(travel.date.seconds * 1000).toLocaleDateString()}</p>
          {travel.imageUrl && <img src={travel.imageUrl} alt={travel.title} width="300" />}

          {/* أزرار التعديل والحذف (يظهر فقط للمستخدم الذي أنشأ الرحلة) */}
          {auth.currentUser?.uid === travel.userId && (
            <div>
              {isEditing ? (
                <button onClick={handleSaveEdit}>💾Save Edits</button>
              ) : (
                <button onClick={handleEdit}>✏️Edit Trip</button>
              )}
              <button onClick={handleDelete}>🗑️Delete flight</button>
            </div>
          )}

          {/* التعليقات */}
          <div>
            <h3>💬Comments:</h3>
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>{comment.text}</li>
              ))}
            </ul>

            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="✍️Add a comment... "
            />
            <button onClick={handleAddComment}>➕Add a comment</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelDetails;
