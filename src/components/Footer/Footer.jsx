import styles from "./Footer.module.css";

const Footer = () => {
    return (
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Daria Elina · REACT25K</p>
      </footer>
    );
  };
  
  export default Footer;
  