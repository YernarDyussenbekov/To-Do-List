import "./App.css";
import Main from "./Components";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h3 className="header-title">Simple To Do List</h3>
          <p className="header-subtitle">
            Today is awesome day. The weather is awesome, you are awesome too!
          </p>
        </div>
        <Main />
      </div>
      <footer>
        <p className="footer-text">
          Made with ❤️ at{" "}
          <a href="https://www.nfactorial.school/">nFactorial</a> in 2024.
        </p>
        <p className="footer-text grey-text">
          Credits: icons from <a href="https://icons8.com/">Icons8</a>.
        </p>
      </footer>
    </div>
  );
}

export default App;
