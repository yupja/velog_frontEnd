import axios from "axios";
import React, { useEffect } from "react"
import styled from "styled-components";

const Detail = () => {
    const axios = require('axios').default;

    var post = null;

    useEffect(() => {
        getBoard()
    }, [])


    const getBoard = async () => {
        try {
            const response = await axios.get('http://localhost:3001/GetBoardDetail');
            console.log(response.data[0]);
            return post = response.data[0]
        } catch (error) {
            console.log(error)
        }}

        console.log(post)
    return (
        <DetailContainer>
            <h1>디테일 페이지 입니다</h1>
            <span>닉네임 </span>
            작성일자<br />
            {post}
            tag1 tag2 tag3<br />
            썸네일<br />
            내용
            <br />
            0개의 댓글<br />
            <textarea typeof="text" placeholder="댓글을 작성하세요" />
            <button>댓글 작성</button>
        </DetailContainer>

    );
}

const DetailContainer = styled.div`
`;

export default Detail;