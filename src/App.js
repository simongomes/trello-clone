import { useEffect } from "react";
import "./App.css";
import TrelloBoard from "./components/TrelloBoard";
import { USERS } from "./utils/users";

function App() {
  useEffect(() => {
    const members = localStorage.getItem("members");
    if (!members) {
      localStorage.setItem("members", JSON.stringify(USERS));
    }
  }, []);

  return (
    <div className="App">
      <TrelloBoard />
    </div>
  );
}

export default App;
