import { UsersProvider } from "./store/context/UsersContext";
import Home from "./views/home";

function App() {
  return (
    <UsersProvider>
      <Home />
    </UsersProvider>
  );
}

export default App;
