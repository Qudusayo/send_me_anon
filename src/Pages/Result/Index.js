import moment from "moment";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../firebase";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Result() {
  const [messages, setMessages] = useState([]);
  const auth = getAuth(app);
  const navigate = useNavigate();
  const db = getFirestore(app);
  const user = auth.currentUser;

  const getDate = (timeStamp) => {
    let date = new Date(timeStamp);
    return date;
  };

  useEffect(() => {
    if (!user) return navigate("/auth");
    try {
      async function fetchData() {
        let messages = [];
        const querySnapshot = await getDocs(collection(db, "messages"));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          messages.push(doc.data());
        });
        // Sort messages by timesatamp seconds
        messages.sort((a, b) => {
          return b.timestamp.seconds - a.timestamp.seconds;
        });

        setMessages(messages);
        // let response = await axios.get(
        //     process.env.REACT_APP_STORAGE_URI
        // );
        // setMessages(Object.values(response.data).reverse());
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className={styles.Result}>
      <div className={styles.Header}>
        <h1>Messages for</h1>
        <h2>You Qudusayo</h2>
      </div>
      <div className={styles.Results}>
        {messages.length ? (
          messages.map((message, index) => (
            <div key={index} className={styles.Card}>
              <div className={styles.Date}>
                <span>{messages.length - index}</span>
                <span>
                  {moment(getDate(message.timestamp.seconds * 1000)).format(
                    "DD/MM/YY h:mm:ss"
                  )}
                </span>
              </div>
              {message.message}
            </div>
          ))
        ) : (
          <div>Loading Messages...</div>
        )}
      </div>
    </div>
  );
}
