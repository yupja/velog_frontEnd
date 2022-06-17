import logo from './logo.svg';
import './App.css';
import { Route , Routes }from "react-router-dom"
import Main from './Main';
import Header from './Header';
import Detail from './Detail';
import Register from './Register';
import Search from './Search';
import MyVelog from './MyVelog';
import Writing from './Posting';

function App() {
  return (
    <div className="App">
      <Header>
        <Routes>
     <Route path="/" exact element={<Main />} />
     <Route path="/detail" exact element={<Detail />} />
     <Route path="/register" exact element={<Register />} />
     <Route path="/search" exact element={<Search />} />
     <Route path="/myvelog" exact element={<MyVelog />} />
     <Route path="/writing" exact element={<Writing />} />
     </Routes>
      </Header>
    </div>
  );
}

export default App;
