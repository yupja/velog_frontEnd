import { Route, Routes } from "react-router-dom"
import Main from './Main';
import Header from './Header';
import Detail from './Detail';
import Login from './Login';
import Search from './Search';
import MyVelog from './MyVelog';
import Write from './Write';
import Register from './Register';
import { useEffect, useState } from "react";



function App() {
  const [isLogin, setIsLogin] = useState(false)
  const token = localStorage.getItem('wtw-token');
  const Username = localStorage.getItem('username');

  const isLoginCheck = () => {
    if(token !== null){
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
}

const LogOut = () => {
  localStorage.removeItem('username')
  localStorage.removeItem('wtw-token');
  setIsLogin(false);
}

  useEffect(() => {
    isLoginCheck();
},[])

  return (
    <div className="App">
      <Header isLogin={isLogin} LogOut={LogOut} Username={Username}/>
        <Routes>
          <Route path="/" exact element={<Main />} />
          <Route path="/detail/:id" exact element={<Detail Username={Username} token={token}/>} />
          <Route path="/search" exact element={<Search />} />
          <Route path={`/@${Username}/*`} exact element={<MyVelog Username={Username}/>} />
          <Route path="/write" element={<Write />} />
          <Route path="/write/:id" element={<Write />} />
        </Routes>
    </div>
  );
}

export default App;
