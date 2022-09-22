import './app.css'
import MainPage from "./pages/MainPage";
import AuthProvider from './contexts/General';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <MainPage/>
      </div>
      <ToastContainer autoClose={1500}/>
    </AuthProvider>
  );
}

export default App;
