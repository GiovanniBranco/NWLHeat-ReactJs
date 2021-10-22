import { useEffect, useState } from "react";
import { api } from "../../services/api";
import io from "socket.io-client";
import styles from "./styles.module.scss";
import logoImg from "../../assets/logo.svg";

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
};

const messagesQueue: Message[] = [];

const socket = io("http://localhost:4000");

socket.on("new_message", (newMessage) => {
  console.log(newMessage);
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [messageList, setMessageList] = useState<Message[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessageList((prevMessage) =>
          [messagesQueue[0], prevMessage[0], prevMessage[1]].filter(Boolean)
        );

        messagesQueue.shift();
      }
    }, 3000);
  }, []);

  useEffect(() => {
    api.get<Message[]>("/messages/last").then((response) => {
      setMessageList(response.data);
    });
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="logo-do-while" />

      <ul className={styles.messageList}>
        {messageList.map((message) => {
          return (
            <li className={styles.message} key={message.id}>
              <p className={styles.messageContent}>{message.text}</p>

              <div className={styles.messageUser}>
                <div className={styles.userImage}>
                  <img src={message.user.avatar_url} alt={message.user.name} />
                </div>
                <span>{message.user.name}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
