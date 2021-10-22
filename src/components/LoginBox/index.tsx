import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import styles from "./styles.module.scss";
import { VscGithubInverted } from "react-icons/vsc";

export function LoginBox() {
  const { signInUrl, user } = useContext(AuthContext);

  console.log(user);

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithubInverted size={28} />
        Entrar com GitHub
      </a>
    </div>
  );
}
