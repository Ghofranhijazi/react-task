import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userTravels, setUserTravels] = useState([]);
  const navigate = useNavigate();

  // جلب بيانات المستخدم والرحلات الخاصة به
  useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser);
      fetchUserTravels(auth.currentUser.uid);
    }
  }, []);

  // جلب الرحلات الخاصة بالمستخدم
  const fetchUserTravels = async (userId) => {
    const q = query(collection(db, "travels"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const travels = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUserTravels(travels);
  };

  // تسجيل الخروج
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login"); // إعادة التوجيه لصفحة تسجيل الدخول
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>الملف الشخصي</h2>
          <img src={user.photoURL || "https://via.placeholder.com/150"} alt="User" width="100" />
          <p><strong>الاسم:</strong> {user.displayName || "غير محدد"}</p>
          <p><strong>البريد الإلكتروني:</strong> {user.email}</p>
          
          <button onClick={handleLogout}>تسجيل الخروج</button>

          <h3>رحلاتي:</h3>
          {userTravels.length > 0 ? (
            <ul>
              {userTravels.map(travel => (
                <li key={travel.id}>
                  <strong>{travel.title}</strong> - {travel.location}
                  <button onClick={() => navigate(`/travel/${travel.id}`)}>عرض التفاصيل</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>لم تقم بإضافة أي رحلات بعد.</p>
          )}
        </div>
      ) : (
        <p>يرجى تسجيل الدخول لعرض ملفك الشخصي.</p>
      )}
    </div>
  );
};

export default Profile;
