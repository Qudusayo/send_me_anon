import { useState } from "react";
import styles from "./style.module.scss";
import axios from "axios";
import Swal from "sweetalert2";

import Spinner from "./../../Components/Spinner/Index";

function Anon() {
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);

    const setMessageHandler = (e) => {
        setMessage(e.target.value);
    };

    const submitFormHandler = async (e) => {
        e.preventDefault();
        setIsSending(true);

        if (message.length < 10) {
            Swal.fire({
                title: "Hey!",
                html: "Please lenghten your text to 10 Characters or more",
                timer: 3000,
                timerProgressBar: true,
            })
            return setIsSending(false)
        }

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

        try {
            let request = await axios.post(process.env.REACT_APP_STORAGE_URI, {
                message,
                timestamp: Date.now(),
            });
            if (request.status === 200) {
                setMessage("");
                Toast.fire({
                    icon: "success",
                    title: "Message sent successfully",
                });
            } else {
                Toast.fire({
                    icon: "error",
                    title: "Error sending message",
                });
            }
        } catch (error) {
            console.log(error);
            Toast.fire({
                icon: "error",
                title: "Error sending message",
            });
        }
        return setIsSending(false);
    };

    return (
        <div className={styles.Anon}>
            <div className={styles.Header}>
                <h1>Say Something...</h1>
                <h2>About QUDUSAYO</h2>
            </div>
            <form className={styles.Form} onSubmit={submitFormHandler}>
                <textarea
                    autoFocus={true}
                    placeholder="Leave a message for Qudusayo here..."
                    onChange={setMessageHandler}
                    value={message}
                    disabled={isSending}
                    minLength="10"
                    required={true}
                ></textarea>
                <button disabled={isSending} type="submit">
                    {isSending ? <Spinner /> : "Send Message"}
                </button>
            </form>
            <div className={styles.Hack}>
                Say what do you think about Qudusayo or Leave a feedback for
                Qudusayo anonymously using the form above.. 🥰 <br />
                <br />
                Thank You!! 😍😊
            </div>
        </div>
    );
}

export default Anon;
