import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getpostAc } from "./redux/modules/post";
import axios from "axios";

const Main = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const list_data = useSelector((state) => state.post.list)
  console.log(list_data, "리스트?")

  React.useEffect(() => {
    dispatch(getpostAc());
  }, []);

  const userCheck = () => {
    axios.get()
  }

  return (
    <>
      {list_data.map((list, id) => {
        return (
          <>
            <CardWrap key={list.id} onClick={() => { Navigate(`/detail/${list.id}`)}}>
              <CardImg src={list.imgPath}/>
              <Body>
                <Title>
                  {list.title}
                </Title>
                <Description>
                  {list.contentSummary}
                </Description>
                <DtCmt>
                  <span>
                    <span>{list.createdAt}</span>
                    {" ∙ "}
                    <span>댓글갯수</span>
                  </span>
                </DtCmt>
              </Body>
              <Footer>
                <FooterLeft>
                  <ProIm></ProIm>
                  <Span>by</Span>
                  <UserName>작성자</UserName>
                </FooterLeft>
                <Like>
                  <span>하트</span>
                </Like>
              </Footer>
            </CardWrap>

          </>
        )
      })}
    </>

  );

};

export const DtCmt = styled.div`
  font-size: 0.75rem;
  color: gray;
`;

export const CardWrap = styled.div`
  display: flex;
  width: 20rem;
  background-color: #fff;
  border: 1px solid black;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  margin: 1rem;
  overflow: hidden;
  flex-direction: column;
  margin: 20px 20px 20px 20px;
  float: left;
  &:hover{
    transform: translateY(-2px);
    box-shadow: rgb(0 0 0 / 8%) 0px 12px 20px 0px;
} 

`;
export const CardImg = styled.img`
  background-color: yellowgreen;
  background-size: cover;
  background-repeat: no-repeat;
  height: 167px;
`;
export const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  /* margin: 20px; */
  width: 320px;
  height: 140px;
  padding: 16px;
`;
export const Title = styled.h4`
  font-size: 16px;
  margin: 0 0 4px;
  font-weight: 900;
  width: 288px;
  height: 43px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: left;
`;
export const Description = styled.p`
  margin: 0 0 24px;
  width: 288px;
  height: 73px;
  color: gray;
  font-size: 14px;
  line-height: 1.5;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
export const Footer = styled.div`
  padding: 10px 16px;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin: 20px 20px 20px 20px; */
  cursor: pointer;
`;
export const FooterLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const Span = styled.span`
  color: rgb(134, 142, 150);
  font-size: 0.75rem;
  line-height: 1.5;
  margin-right: 0.25rem;
`;
export const UserName = styled.span`
  font-size: 12px;
  font-weight: bold;
`;
export const Like = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 1.75rem;
    height: 1.6rem;
  }
  span {
    font-size: 1rem;
  }
`;
export const ProIm = styled.div`
width: 24px;
height: 24px;
border-radius: 25px;
border: 1px solid black;
margin-right: 10px;
`;



export default Main;