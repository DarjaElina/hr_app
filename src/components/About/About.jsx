import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>About Us</h1>
      <p className={styles.text}>
        Welcome to our company! We are dedicated to delivering the best products and services to our customers.
        Our team is passionate about innovation, quality, and customer satisfaction.
      </p>
    </div>
  );
};

export default About;
