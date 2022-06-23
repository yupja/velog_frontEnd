import { Link, Route, Routes, useNavigate } from "react-router-dom";
import MySeries from "./MySeries";
import MyAbout from "./MyAbout";
import { useMatch } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import profile from "./styles/DefaultProfile.png"
import { useEffect, useState } from "react";
import { list } from "firebase/storage";

const MyVelog = (props) => {
    console.log(props.Username)
    const [isThumbnail, setIsThumbnail] = useState(false);
    const matchSeries = useMatch(`/@${props.Username}/series`)
    const matchAbout = useMatch(`/@${props.Username}/about`)
    const matchBoard = useMatch(`/@${props.Username}`)
    const Navigate = useNavigate();
    const list_data = useSelector((state) => state.post.list)


    return (
        <Container>
            <ProfileContainer>
                <img src={profile}/>
                <div>
                    <span>
                        {props.Username}
                    </span>
                    개발자(fake)
                </div>



            </ProfileContainer>
            <hr style={{ border: "0.5px solid #eee", margin:"32px 0px"}} />

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
                                       {list.imgPath !== null ? <img src={list.imgPath} /> : null } 
                                        <div>
                                            <h2>
                                                {list.title}
                                            </h2>
                                            <p>
                                                {list.contentSummary}
                                            </p>
                                            <div>
                                                <span>
                                                    <DateStyle>{list.date.substr(0, 10)}</DateStyle>

                                                </span>
                                            </div>
                                        </div>
                                        <div>

                                            <hr style={{ border: "0.5px solid #eee", marginTop: "60px" }} />

                                        </div>

                                    </MyCardWrap> : null}


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
padding-bottom: 100px;
margin-top: 5.625rem;
overflow: hidden;

`;

const DateStyle = styled.span`
color:#868296;
font-size: 14px;
`;

const ProfileContainer = styled.div`
display: flex;

div {
    display: flex;
    flex-direction: column;
    justify-content:center;
}

span{
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 4px;
    
}

img{
    width: 128px;
    height: 128px;
    border-radius: 50%;
    margin-right: 16px;
}
`;

const Tabs = styled.div`
display: flex;
justify-content: center;

margin-top: 4.5rem;
    margin-bottom: 4.5rem;


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
text-overflow: ellipsis  ellipsis;
margin-bottom: 30px;
img{
    width: 100%;
    height: 402px;
    object-fit: cover;
}
`;


export default MyVelog;