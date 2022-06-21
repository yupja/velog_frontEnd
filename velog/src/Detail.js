import axios from "axios";
import React, { useEffect } from "react"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Detail = () => {
    const axios = require('axios').default;
    const list_data = useSelector((state) => state.post.list)
    const params = useParams();
    console.log(list_data)

    var post = null;

    useEffect(() => {
        getBoard()
    }, [])


    const getBoard = async () => {
        try {
            const response = await axios.get('http://localhost:5001/GetBoardDetail');
            console.log(response.data[0]);
            return post = response.data[0]
        } catch (error) {
            console.log(error)
        }}

    
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