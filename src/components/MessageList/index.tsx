import { useEffect, useState } from "react";
import { api } from "../../services/api";
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

export function MessageList() {
  const [messageList, setMessageList] = useState<Message[]>([]);

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
