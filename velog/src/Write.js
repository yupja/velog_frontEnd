import { Editor } from "@toast-ui/react-editor"
import '@toast-ui/editor/dist/toastui-editor.css'

import { storage } from "./shared/firebase";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";


import { useEffect, useRef } from "react";
import axios from "axios";

const Write = () => {
    const storage = getStorage();

    const getMarkDown = () => { //글 내용 마크다운 문자열로 불러오기 
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

    useEffect(()=> {
        const editorIns = editorRef.current.getInstance(); 
        // editorIns.removeHook("addImageBlobHook"); //<- 제거 
        // editorIns.addHook('addImageBlobHook', uploadFB); //<- 추가 }
        },[]); 

    const editorRef = useRef()
    


        return (
            <>
                <h1>제목을 입력하세요</h1>
                태그를 입력하세요
                <Editor
                    ref={editorRef}
                    placeholder="당신의 이야기를 적어보세요. . ."
                    previewStyle="vertical"
                    height="100vh"
                    initialEditType="markdown"
                    useCommandShortcut={false}
                    toolbarItems={[['bold', 'italic', 'strike'], ['image']]}
                  hooks={{
                    addImageBlobHook: async (blob, callback) => {

                    console.log(blob)
                    const uploaded_file = await uploadBytes(
                        ref(storage, `images/${blob.name}`),blob
                    );
                    const file_url = await getDownloadURL(uploaded_file.ref)
                    callback(file_url, 'img ALT');
                    }
                }}
                />
            </>
        );
    }


export default Write;