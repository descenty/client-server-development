import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      {["блок1", "второй блок"].map((text) => <div>
        <p>{text}</p>
      </div>)}
    </div>
  );
}

export default App;
