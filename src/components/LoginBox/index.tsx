import styles from "./styles.module.scss";
import { VscGithubInverted } from "react-icons/vsc";

export function LoginBox() {
  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href="#" className={styles.signInWithGithub} onClick={() => {}}>
        <VscGithubInverted size={28} />
        Entrar com GitHub
      </a>
    </div>
  );
}
