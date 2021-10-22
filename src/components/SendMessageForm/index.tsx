import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { api } from "../../services/api";
import { VscGithubInverted, VscSignOut } from "react-icons/vsc";
import styles from "./styles.module.scss";

export function SendMessageForm() {
  const { user, signOut } = useContext(AuthContext);
  const [text, setText] = useState("");

  async function SendMessage(event: FormEvent) {
    event.preventDefault();

    if (!text.trim()) {
      alert("Deve-se informar algum texto na mensagem ;)");
      return;
    }

    await api
      .post("/messages", { message: text })
      .then(() => {
        setText("");
      })
      .catch((response) => {
        console.error(response.data.error);
        alert(
          "Ocorreu algum erro no cadastro da mensagem, verifique o log para mais detalhes"
        );
      });
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button className={styles.signOutButton} onClick={signOut}>
        <VscSignOut size={32} />
      </button>
      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name}></img>
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size={16} />
          {user?.login}
        </span>
      </header>

      <form className={styles.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          id="message"
          name="message"
          placeholder="Qual sua expectativa para o evento?"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
        />

        <button type="submit" onClick={(event) => SendMessage(event)}>
          Enviar mensagem
        </button>
      </form>
    </div>
  );
}
