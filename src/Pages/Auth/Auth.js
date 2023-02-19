import { app } from "../../firebase";
import styles from "./Auth.module.scss";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export default function Auth() {
  const auth = getAuth(app);
  const user = auth.currentUser;
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const login = () => {
    if (user) {
      navigate("/messages");
    } else {
      signInWithPopup(auth, provider)
        .then(async (result) => {
          const user = result.user;

          if (user.email !== process.env.REACT_APP_ADMIN_EMAIL) {
            Toast.fire({
              icon: "error",
              title: "Access Denied",
            });
            await signOut(auth);
            navigate("/");
          } else {
            navigate("/messages");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (user) navigate("/messages");
  }, []);

  return (
    <div>
      <h2>Auth</h2>
      <div className={styles.googleBtn} onClick={login}>
        <div className={styles.googleIconWrapper}>
          <img
            className={styles.googleIcon}
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          />
        </div>
        <p className={styles.btnText}>
          <b>Sign in with google</b>
        </p>
      </div>
    </div>
  );
}
