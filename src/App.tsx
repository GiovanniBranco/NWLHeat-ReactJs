import { useContext } from "react";
import styles from "./app.module.scss";
import { LoginBox } from "./components/LoginBox";
import { MessageList } from "./components/MessageList";
import { SendMessageForm } from "./components/SendMessageForm";
import { AuthContext } from "./contexts/auth";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <main
      className={`${styles.contentWrapper} 
      ${user != null ? styles.contentSigned : ""} 
      `}
    >
      <MessageList />
      {user != null ? <SendMessageForm /> : <LoginBox />}
    </main>
  );
}

export { App };
