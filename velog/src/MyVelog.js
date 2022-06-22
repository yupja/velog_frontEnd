import { Link, Route, Routes, useNavigate } from "react-router-dom";
import MySeries from "./MySeries";
import MyAbout from "./MyAbout";
import { useMatch } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

const MyVelog = (props) => {
    console.log(props.Username)
    const matchSeries = useMatch(`/@${props.Username}/series`)
    const matchAbout = useMatch(`/@${props.Username}/about`)
    const matchBoard = useMatch(`/@${props.Username}`)
    const Navigate = useNavigate();
    const list_data = useSelector((state) => state.post.list)

    return (
        <Container>
            <h1 style={{marginTop:"5.625rem"}}>
                @{props.Username}
            </h1>
            <hr style={{border:"0.5px solid #eee"}}/>
            <div>
                <Tabs>
                    <Tab isActive={matchBoard != null}>
                        <Link to={`/@${props.Username}`}> 글</Link>
                    </Tab>
                    <Tab isActive={matchSeries != null}>
                        <Link to="series"> 시리즈</Link>
                    </Tab>
                    <Tab isActive={matchAbout != null}>
                        <Link to="about"> 소개</Link>
                    </Tab>
                </Tabs>

                {matchBoard !== null ? <>

                    {list_data.map((list, id) => {

                        console.log(list)
                        return (
                         
                            <>
                               {list.username === props.Username ? 
                               <MyCardWrap key={list.id} onClick={() => { Navigate(`/detail/${list.id}`) }}>
                                    <img src={list.imgPath} />
                                    <div>
                                        <h2>
                                            {list.title}
                                        </h2>
                                        <p>
                                            {list.contentSummary}
                                        </p>
                                        <div>
                                            <span>
                                                <span>{list.date}</span>
                                                {/* {" ∙ "}
                                                <span>댓글갯수</span> */}
                                            </span>
                                        </div>
                                    </div>
                                    <div>


                                    </div>
                                </MyCardWrap> : <>no</>}
                                

                            </>
                        )


                    })}
                </> : null}


                <Routes>
                    <Route path="series" element={<MySeries />} />
                    <Route path="about" element={<MyAbout />} />
                </Routes>
            </div>
        </Container>


    );
}

const Container = styled.div`
max-width: 768px;
margin: auto;
`;

const Tabs = styled.div`
display: flex;
justify-content: center;
margin-top: 4.5rem;



`;


const Tab = styled.div`
display: flex;
font-size: 1.325rem;
width: 8rem;
height: 3rem;
align-items: center;
text-align: center;
justify-content: center;
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

const MyCardWrap = styled.div`

`;


export default MyVelog;