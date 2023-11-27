import axios from "axios";
import Routes from "./Routes";
import { UserContextProvider } from "./UserContext";
import {ToastContainer} from 'react-toastify'

function App() {
  axios.defaults.baseURL = "http://localhost:4000";
  axios.defaults.withCredentials = true;

  return (
    <UserContextProvider>
      <ToastContainer />
      <Routes />
    </UserContextProvider>
  );
}

export default App;
