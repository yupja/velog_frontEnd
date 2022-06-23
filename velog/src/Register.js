import React, {useState, useRef, useEffect} from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { storage } from "./shared/firebase";
import { createPostAc } from "./redux/modules/post";
import { useLocation } from "react-router-dom";


const Register = (props) => {
    console.log(props.content,)

    const dispatch = useDispatch();
    const imgRef = React.useRef();
    const title_ref = React.useRef(null);
    const contentSummary_ref = React.useRef();
    const storage = getStorage();

    const [imgFile, setImgFile] = useState();

    const [contentSummary, setContentSummary] = React.useState()


    const thumb = React.useRef();

    const styleButton = () =>{
        let myInput = document.getElementById("input-file");
              myInput.click();
            }

    //파이어베이스 스토리지에
    const uploadIMG = async (e) => {
        const uploded_file = await uploadBytes(
            ref(storage, `images/${e.target.files[0].name}`),
            e.target.files[0]);
            fileImagePreview(e.target.files[0]);
            const file_url = await getDownloadURL(uploded_file.ref);
            // imgRef.current = { url : file_url};
            setImgFile(file_url)
            
    };

    const fileImagePreview = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        
        return new Promise((resolve) => {
            reader.onload = () => {
                setImgFile(reader.result);
                resolve();
            };
        
        });
        
    };

    const token = localStorage.getItem('wtw-token');

    const postAc = () => {
        const post = {
            title:props.title,
            content:props.content,
            tagStrings:props.tag,
            contentSummary:contentSummary_ref.current.value,
            imgPath:imgFile

        }
        dispatch(createPostAc(post,token))
    }


    // const changeSummary = (e) => {
    //     if(contentSummary.length < 150){
    //         setContentSummary(e.target.value)
    //     }
    // }

    const fadeout = () =>{
        thumb.current.classList.add('thumb-out');
        setTimeout(()=>{
          thumb.current.classList.remove('thumb-out');
          props.thumbOn(false);
        },250)
      }
    
    
    return (
        <>
        <Div></Div>
      <PubBox ref={thumb}>
            <Left>
                <Ph4>포스트 미리보기</Ph4>
                <div 
                style={{height:"194px", width:"320px", 
                backgroundColor:"#e9ecef", position:"relative", border:"none", marginTop:"22px"}}>

                    <img src={imgFile} style={{width:"320px" ,height:"195px", border:"none"}} />

                    <input type="file" name="file" id="input-file" ref={imgRef} 
                    onChange={uploadIMG} style={{display:"none"}}></input>
                    
                    <Thumbbtn onClick={styleButton}>썸네일 업로드</Thumbbtn>
                </div>
                {/* <Ph4 ref={title_ref}>{props.title_ref}</Ph4> */}
                <Ph4>{props.title}</Ph4>
                <DeInput ref={contentSummary_ref}  defaultValue={props.content} />
                <span style={{textAlign:"right", marginRight:"15px", marginTop:"5px"}}>{props.content.length} /150</span>
            </Left>
            <Right>
                <Rp>공개 설정</Rp>
                <BtnBox>
                    <Open>
                    <svg width="22" height="22" fill="none" viewBox="0 -3 30 30" style={{textAlign:"center"}}><path fill="currentColor" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.243 22.212a10.209 10.209 0 0 1-6.03-2.939A10.218 10.218 0 0 1 1.714 12c0-2.473.868-4.813 2.458-6.673.041.492.142 1.019.116 1.395-.094 1.373-.23 2.232.574 3.39.313.451.39 1.098.542 1.62.149.51.744.779 1.155 1.094.828.635 1.62 1.373 2.5 1.932.579.369.941.552.771 1.26-.136.569-.174.92-.469 1.426-.09.155.34 1.15.482 1.292.433.433.862.83 1.333 1.219.732.604-.07 1.389-.42 2.257zm8.516-2.939a10.213 10.213 0 0 1-5.34 2.832c.285-.705.793-1.331 1.264-1.694.409-.316.922-.924 1.136-1.405.213-.48.496-.898.783-1.34.407-.628-1.005-1.577-1.463-1.776-1.03-.447-1.805-1.05-2.72-1.694-.653-.46-1.977.24-2.713-.082-1.009-.44-1.84-1.206-2.716-1.866-.905-.68-.861-1.475-.861-2.48.708.026 1.716-.196 2.187.373.148.18.659.984 1 .698.28-.233-.207-1.168-.3-1.388-.29-.676.658-.94 1.142-1.398.632-.597 1.989-1.535 1.882-1.964-.108-.428-1.358-1.643-2.092-1.453-.11.028-1.078 1.044-1.266 1.203l.015-.994c.004-.21-.39-.424-.372-.56.046-.34.996-.96 1.232-1.232-.165-.103-.73-.588-.9-.517-.415.173-.882.291-1.296.464 0-.144-.017-.279-.038-.412a10.188 10.188 0 0 1 2.614-.758l.812.326.574.68.573.591.5.162.795-.75-.205-.535v-.481c1.572.228 3.057.814 4.357 1.719-.233.02-.488.055-.777.091-.119-.07-.272-.102-.401-.15.376.81.77 1.608 1.169 2.408.426.853 1.372 1.77 1.539 2.67.195 1.063.06 2.028.166 3.278.104 1.204 1.358 2.572 1.358 2.572s.579.197 1.06.128a10.222 10.222 0 0 1-2.698 4.734z"></path></svg>
                        전체공개</Open>
                    <Priv>
                    <svg width="23" height="23" fill="none" viewBox="0 -3 30 30"><path fill="currentColor" d="M17.625 9H16.5V6.81c0-2.47-1.969-4.522-4.44-4.56a4.514 4.514 0 0 0-4.56 4.5V9H6.375A1.88 1.88 0 0 0 4.5 10.875v9a1.88 1.88 0 0 0 1.875 1.875h11.25a1.88 1.88 0 0 0 1.875-1.875v-9A1.88 1.88 0 0 0 17.625 9zm-4.969 5.85v3.225a.672.672 0 0 1-.623.675.657.657 0 0 1-.69-.656V14.85a1.5 1.5 0 0 1-.838-1.486 1.5 1.5 0 1 1 2.152 1.486zM15.187 9H8.814V6.75c0-.848.332-1.645.937-2.25A3.16 3.16 0 0 1 12 3.562a3.16 3.16 0 0 1 2.25.938 3.16 3.16 0 0 1 .938 2.25V9z"></path></svg>
                        비공개</Priv>
                </BtnBox>    
                <Rp>URL 설정</Rp>
                <UrlInput></UrlInput>
                <Rp>시리즈 설정</Rp>
                <SeriesBtn>
                <svg width="24" height="24" viewBox="0 -3 24 24" fill="none" style={{marginRight:"2vw"}}><path fill-rule="evenodd" clip-rule="evenodd" d="M14 10H2V12H14V10ZM14 6H2V8H14V6ZM18 14V10H16V14H12V16H16V20H18V16H22V14H18ZM2 16H10V14H2V16Z" fill="currentColor"></path></svg>
                    시리즈에 추가하기</SeriesBtn>
                <LastBtn>
                <CancBtn onClick={()=>{fadeout()}}>취소</CancBtn>
                <PubBtn onClick={postAc}>출간하기</PubBtn>
                </LastBtn>
            </Right>
        </PubBox>
        </>
    );
}
const Div = styled.div`
position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100rem;
  background-color: #f8f9fa;
`;

const PubBox = styled.div`
top:0;
left:0;
height: 425px;
width: 705px;
/* border: 1px solid black; */
display: flex;
margin: auto;
align-items: center;
margin-top: 10%;
z-index: 15;
margin-bottom: 800px;
animation: 300ms ease 0ms 1 normal forwards running thumbIn;
  @keyframes thumbIn {
      0%{
          transform: translateY(100%)
      }
      100%{
          transform: translateY(0)
      }
  }
  &.thumb-out{
    animation: 250ms ease 0ms 1 normal forwards running thumbOut;
    @keyframes thumbOut {
        0%{
            transform: translateY(0)
        }
        100%{
            transform: translateY(100%)
        }
    }
  }
`;

const Left = styled.div`
height: 425px;
width: 352px;
/* border: 1px solid red; */
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

const Input = styled.input`
height: 32px;
width: 165px;
position: absolute;
top: 60%;
left: 25%;
`;

const DeInput = styled.textarea`
height: 95px;
width: 316px;
background-color: white;
border: none;
resize: none;
margin-top: 2rem;
:focus{
    outline: none;
}
`;

const Right = styled.div`
height: 425px;
width: 352px;
/* border: 1px solid blue; */
display: flex;
flex-direction: column;
padding-left: 16px;
`;

const BtnBox = styled.div`
height: 48px;
width: 320px;
/* border: 1px solid purple; */
display: flex;
justify-content: space-between;
margin-bottom: 1rem;
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
display: flex;
justify-content: center;
align-items: center;
;
`;

const Priv = styled.button`
height: 48px;
width: 152px;
border: none;
border-radius: 4px;
background-color: white;
color: #868e96;
font-size: 18px;
font-weight: 700;
display: flex;
justify-content: center;
align-items: center;
box-shadow: rgb(0 0 0 / 10%) 0px 0px 3px;
:active{
    border: 1px solid #20c997;
    color: #20c997;
}
`;
const UrlInput = styled.input`
height: 40px;
width: 320px;
border: none;
background-color: white;
margin-bottom: 1rem;
:focus{
    outline: none;
}
`;

const SeriesBtn = styled.button`
height: 48px;
width: 320px;
border: none;
background-color: white;
/* border: 1px solid black; */
color: #20c997;
font-size: 18px;
font-weight: 700;
`;

const LastBtn = styled.div`
height: 40px;
width: 320px;
/* border: 1px solid pink; */
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

const Ph4 = styled.span`
text-align: left;
font-size: 21px;
font-weight: 700;
`;

const Rp = styled.p`
text-align: left;
font-size: 21px;
font-weight: 700;
margin: 0 0 20px 0;
`;

export default Register;