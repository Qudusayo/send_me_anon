import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

export default function Result() {
    const [messages, setMessages] = useState([]);

    const getDate = (timeStamp) => {
        let date = new Date(timeStamp);
        return date;
    };

    useEffect(() => {
        try {
            async function fetchData() {
                let response = await axios.get(
                    process.env.REACT_APP_STORAGE_URI
                );
                setMessages(Object.values(response.data).reverse());
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
                                    {moment(getDate(message.timestamp)).format(
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
