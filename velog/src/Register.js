import styled from "styled-components";

const Register = () => {
    return (
        <>
        <div style={{height:"100%", width:"100%", backgroundColor:"red"}}></div>
      <PubBox>
            <Left>
                <Ph4>포스트 미리보기</Ph4>
                <div style={{height:"194px", width:"320px", backgroundColor:"#e9ecef", position:"relative"}}>
                    <img></img>
                    <Thumbbtn>썸네일 업로드</Thumbbtn>
                </div>
                <Ph4>title</Ph4>
                <DeInput></DeInput>
                <p style={{textAlign:"right"}}>desc.length/150</p>
            </Left>
            <Right>
                <Rp>공개 설정</Rp>
                <BtnBox>
                    <Open>전체공개</Open>
                    <Priv>비공개</Priv>
                </BtnBox>    
                <Rp>URL 설정</Rp>
                <UrlInput></UrlInput>
                <Rp>시리즈 설정</Rp>
                <SeriesBtn>시리즈에 추가하기</SeriesBtn>
                <LastBtn>
                <CancBtn>취소</CancBtn>
                <PubBtn>출간하기</PubBtn>
                </LastBtn>
            </Right>
        </PubBox>
        </>
    );
}
const PubBox = styled.div`
height: 425px;
width: 705px;
border: 1px solid black;
display: flex;
margin: auto;
align-items: center;
margin-top: 20%;
`;

const Left = styled.div`
height: 425px;
width: 352px;
border: 1px solid red;
display: flex;
flex-direction: column;
padding-left: 15px;
`;

const Thumbbtn = styled.button`
height: 32px;
width: 165px;
background-color: white;
position: absolute;
top: 60%;
left: 25%;
border: none;
border-radius: 4px;
color: #20c997;
font-size: 16px;
font-weight: 700;
`;

const DeInput = styled.textarea`
height: 118px;
width: 320px;
background-color: white;
border: none;
resize: none;
`;

const Right = styled.div`
height: 425px;
width: 352px;
border: 1px solid blue;
display: flex;
flex-direction: column;
padding-left: 16px;
`;

const BtnBox = styled.div`
height: 48px;
width: 320px;
border: 1px solid purple;
display: flex;
justify-content: space-between;
`;

const Open = styled.button`
height: 48px;
width: 152px;
border: 1px solid #20c997;
border-radius: 4px;
background-color: white;
color: #20c997;
font-size: 18px;
font-weight: 700;
`;

const Priv = styled.button`
height: 48px;
width: 152px;
border: 1px solid #20c997;
border-radius: 4px;
background-color: white;
color: #20c997;
font-size: 18px;
font-weight: 700;
`;
const UrlInput = styled.input`
height: 40px;
width: 320px;
border: none;
background-color: white;
`;

const SeriesBtn = styled.button`
height: 48px;
width: 320px;
border: none;
background-color: white;
border: 1px solid black;
color: #20c997;
font-size: 18px;
font-weight: 700;
`;

const LastBtn = styled.div`
height: 40px;
width: 320px;
border: 1px solid pink;
display: flex;
justify-content: right;
/* justify-items: flex-end; */
-webkit-align-items: flex-end;
align-items: flex-end;
margin-top: auto;
margin-bottom: 12px;
`;

const CancBtn = styled.button`
height: 40px;
width: 72px;
background-color: none;
color: #12b886;
font-size: 18px;
font-weight: 700;
border: none;
border-radius: 4px;
`;

const PubBtn = styled.button`
height: 40px;
width: 108px;
background-color: #20c997;
color: white;
font-size: 18px;
font-weight: 700;
margin:  0 0 0 14px;
border: none;
border-radius: 4px;
`;

const Ph4 = styled.p`
text-align: left;
font-size: 21px;
font-weight: 700;
`;

const Rp = styled.p`
text-align: left;
font-size: 21px;
font-weight: 700;
margin: 20px 0 0 0;
`;

export default Register;