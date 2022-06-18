import { Link, Route, Routes } from "react-router-dom";
import MySeries from "./MySeries";
import MyAbout from "./MyAbout";
import { useMatch } from "react-router-dom";
import styled from "styled-components";

const MyVelog = () => {
    const matchSeries = useMatch('/myvelog/series')
    const matchAbout = useMatch('/myvelog/about')
    const matchBoard = useMatch('/myvelog')
    return (
        <>
        <div>
            참새 개발자
        </div>
        <div>
                        <Tabs>
                        <Tab isActive={matchBoard != null}>
                    <Link to="/myvelog"> 글</Link>
                </Tab>
                <Tab isActive={matchSeries != null}>
                    <Link to="series"> 시리즈</Link>
                </Tab>
                <Tab isActive={matchAbout != null}>
                    <Link to="about"> 소개</Link>
                </Tab>
            </Tabs>
            
            {matchBoard !== null ? <>글</> : null}
            <Routes>
                <Route path="series" element={<MySeries/>} />
                <Route path="about" element={<MyAbout/>}/>
            </Routes>
        </div>
        </>
    );
}

const Tabs = styled.div`
margin-top: 40px;
display: grid;
grid-template-columns: repeat(3, 1fr);

gap: 10px;



`;


const Tab = styled.div`
text-align: center;
text-transform: uppercase;
padding: 10px 0px;
border-radius: 10px 10px 0px 0px;
border-bottom: ${(props) =>
    props.isActive ? '2px solid #20C997' : null};
font-weight: bold;


:hover {
    
    a{
    color: ${(props) =>
    props.isActive ? '#20C997' : '#222'};
 
    }
}


a{
text-decoration: none;
color: ${(props) =>
    props.isActive ? '#20C997' : '#222'};
}
`;


export default MyVelog;