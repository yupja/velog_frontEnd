import styled from "styled-components";
import { Link } from "react-router-dom";

const Main = () => {
    return (
        <>
        <h1>메인 페이지 입니다</h1>
        <Link to="/detail">
        <div style={{width:"100px", height:"100px", backgroundColor:"wheat"}}>게시글 1</div>
       </Link>
        </>
        
    );
}



export default Main;