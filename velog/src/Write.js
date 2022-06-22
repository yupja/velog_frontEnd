import { Editor } from "@toast-ui/react-editor"
import '@toast-ui/editor/dist/toastui-editor.css'
import React, { useState } from 'react';
import { storage } from "./shared/firebase";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import Register from "./Register"

import { useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Write = () => {
    const storage = getStorage();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [content, setContent] = useState("")

    const editorRef = React.useRef()


    //register창 띄우기
    const [thumb, setThumb] = React.useState(false);

    const onTitleHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const onTagHandler = (event) => {
        setTag(event.currentTarget.value)
    }


    //글 내용 마크다운 문자열로 불러오기 
    const getMarkDown = () => {
        const editorIns = editorRef.current.getInstance();
        return editorIns.getMarkdown();
    }

    // const validation_check = () => { 
    //     const title = titleRef.current.value.trim(); 
    //     const content = getMarkDown(); 
    //     if(title !== '' || content !== ''){
    //         // DB에 저장 
    //     }else{ 
    //         // 에러 표시 
    //     } 
    // }


    // const [publish, setPublish] = useState(false);

    // const Publish = () => {
    //     setPublish(true)
    // }

    // const BacktoWrite = () => {
    //     setPublish(false);
    // }


    useEffect(() => {
        const editorIns = editorRef.current.getInstance();
        // editorIns.removeHook("addImageBlobHook"); //<- 제거 
        // editorIns.addHook('addImageBlobHook', uploadFB); //<- 추가 }
    }, []);





    return (
        <div>
            {thumb && (
                <Reg>
                    <Register
                        thumbOn={setThumb}
                        title={title}
                        content={content}
                        tag={tag} />
                </Reg>
            )}

            {/* {publish ? <Register publish={publish} BacktoWrite={BacktoWrite} />
                    : null} */}
            <>

                <TitleInput placeholder="제목을 입력하세요" onChange={onTitleHandler} />
                <div style={{ backgroundColor: "#495057", height: "6px", width: "64px", margin: "0px 25px" }} />
                <Tag>
                    <input placeholder="태그를 입력하세요" onChange={onTagHandler} />
                </Tag>

                <Editor
                    onChange={() => setContent(getMarkDown())}
                    ref={editorRef}
                    placeholder="당신의 이야기를 적어보세요. . ."
                    previewStyle="vertical"
                    height="80vh"

                    initialEditType="markdown"
                    useCommandShortcut={false}
                    previewHighlight={false}
                    hideModeSwitch={false}

                    // toolbarItems={[['bold', 'italic', 'strike'], ['image']]}
                    hooks={{
                        addImageBlobHook: async (blob, callback) => {

                            console.log(blob)
                            const uploaded_file = await uploadBytes(
                                ref(storage, `images/${blob.name}`), blob
                            );
                            const file_url = await getDownloadURL(uploaded_file.ref)
                            callback(file_url, 'img ALT');
                        }
                    }}
                />

                <Header>
                    <BackBtn>뒤로가기</BackBtn>
                    {/* <PublishBtn onClick={Publish}>출간하기</PublishBtn> */}
                    <PublishBtn onClick={() => { setThumb(true) }}><span>출간하기</span></PublishBtn>

                </Header>
            </>

        </div>


    )

}

const Reg = styled.div`
`;
const TitleInput = styled.textarea`
margin: 0px 25px;
font-size: 28px;
font-weight: bold;
height: 43px;
resize: none;
border: 1px solid transparent;

:focus{
    outline: none;
}

`;

const Tag = styled.div`

margin: 20px 25px;

input {
    border: 1px solid transparent;
:focus{
    outline: none;
}
}
`;


const Header = styled.header`
    background-color: white;
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 64px;
    box-shadow: 10px;
    box-shadow: 0px -2px 10px  rgba(0, 0, 0, .1);        

    `;

const BackBtn = styled.button`
    background-color: transparent;
    border: 1px solid transparent;
    padding: 20px;
    font-size: 18px;
    font-weight: bold;
    `;

const PublishBtn = styled.button`
background-color: #12b886;
border: 1px solid transparent;
    padding: 10px 20px;
    font-weight: bold;
    border-radius: 5px;
font-size: 18px;
color:white;
`;

export default Write;