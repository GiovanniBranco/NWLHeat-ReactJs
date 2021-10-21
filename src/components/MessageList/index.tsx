import styles from "./styles.module.scss";
import logoImg from "../../assets/logo.svg";

export function MessageList() {
  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="logo-do-while" />

      <ul className={styles.messageList}>
        <li className={styles.message}>
          <p className={styles.messageContent}>
            Não vejo a hora de começar esse evento, com certeza vai ser o melhor
            de todos os tempos, vamooo pra cima! 🔥🔥
          </p>

          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img
                src="https://github.com/GiovanniBranco.png"
                alt="GiovanniBranco"
              />
            </div>
            <span>Giovanni Branco</span>
          </div>
        </li>

        <li className={styles.message}>
          <p className={styles.messageContent}>
            Não vejo a hora de começar esse evento, com certeza vai ser o melhor
            de todos os tempos, vamooo pra cima! 🔥🔥
          </p>

          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img
                src="https://github.com/GiovanniBranco.png"
                alt="GiovanniBranco"
              />
            </div>
            <span>Giovanni Branco</span>
          </div>
        </li>

        <li className={styles.message}>
          <p className={styles.messageContent}>
            Não vejo a hora de começar esse evento, com certeza vai ser o melhor
            de todos os tempos, vamooo pra cima! 🔥🔥
          </p>

          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img
                src="https://github.com/GiovanniBranco.png"
                alt="GiovanniBranco"
              />
            </div>
            <span>Giovanni Branco</span>
          </div>
        </li>
      </ul>
    </div>
  );
}