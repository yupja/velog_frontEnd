import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getpostDetailDB } from "./redux/modules/postDetail";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import ReactMarkdown from "react-markdown"
import { addCommentDB, getCommentDB, removeCommentDB, updateCommentDB } from "./redux/modules/comments";
import { deletePostDB } from "./redux/modules/post";
import { getTagsDB } from "./redux/modules/tags";
import { getCommentDateDB, getDateDB } from "./redux/modules/date";


const Detail = (props) => {
const [isEdit, setIsEdit] = useState(false);

    const params = useParams();
    const list_index = params.id
    // const [content, setContent] = useState("");

    const dispatch = useDispatch()
    const content = React.useRef();
    const post_detail = useSelector((state) => state.postDetail.list)
    const comments = useSelector((state) => state.comments.list)
    const tags = useSelector((state) => state.Tags.list)
    const date = useSelector((state) => state.date.list)
    const navigate = useNavigate();
    
    // const onContentHandler = (event) => {
    //     setContent(event.currentTarget.value)
    //     console.log(content)
    // }
 
    useEffect(() => {
        dispatch(getpostDetailDB(list_index))
        dispatch(getCommentDB(list_index))
        dispatch(getTagsDB(list_index))
        dispatch(getDateDB(list_index))
    }, [])


  



    const addComment = () => {
        const comment = {
            username: props.Username,
            content: content.current.value
        };
        dispatch(addCommentDB(list_index, comment, props.token))
        window.location.reload()
    }

    const deleteComment = (index) => {
        dispatch(removeCommentDB(index, props.token))
    }

    const deletePost = (index) => {
        console.log(index)
        dispatch(deletePostDB(index, props.token))

    }


    const editComment = (index) => {
      
        const comment = {
            username: props.Username,
            content: content.current.value
        };
        dispatch(updateCommentDB(index, comment, props.token))
        setIsEdit(false)
        window.location.reload();
    }

    const openEdit = () => {
        setIsEdit(true)
    }

    const editPost = (index) => {
        window.location.replace(`/write/${index}`);
    }


    return (
        <DetailContainer>


            <h1>{post_detail.title}</h1>
            <PostUser>
                <span onClick={()=>navigate(`/@${post_detail.username}`)} >{post_detail.username} </span>
                ∙ {date}
            </PostUser>
            <TagContainer>

            {tags.map((tag)=>{
        return (
            <TagStyle>
            {tag}
            </TagStyle>
        );
    })}

   
            </TagContainer>

            {post_detail.username === props.Username ?
                <Mybtn><div onClick={() => { editPost(post_detail.id) }}>수정&nbsp;&nbsp;</div>
                    <div onClick={() => { deletePost(post_detail.id) }}>삭제</div>
                </Mybtn> : null}<br />



            <img src={post_detail.imgPath}></img><br />


            <ReactMarkdown>{post_detail.content}</ReactMarkdown>



            <h4> {comments.length}개의 댓글<br /> </h4>

            <CommentInput>
                <textarea typeof="text" placeholder="댓글을 작성하세요" ref={content} /><br />
                <button onClick={addComment} type="button">댓글작성</button>

            </CommentInput>

            {comments.map((comment, index) => {
                return (
                    <CommentContainer key={index}>
                        <CommentData>
                            <div>
                                <span> {comment.username}</span><br />
                                {comment.createdAt.substr(0,10)}
                            </div>
                            {comment.username === props.Username ?
                            <>
                             {isEdit ? <br/> : 
                             <div style={{ display: "flex", justifyContent: "flex-end", gridColumn: "auto/span 1" }}>
                                    <div onClick={openEdit} >수정&nbsp;&nbsp;</div>
                                    <div onClick={() => deleteComment(comment.id)}> 삭제</div>
                                </div>}

                            {isEdit ?  <CommentInput>
                                
                                <textarea defaultValue={comment.content} ref={content} /> 
                                
                                <button onClick={() => editComment(comment.id)} type="button">댓글 수정</button>
                                <BackBtn onClick={()=>{setIsEdit(false)}} type="button">뒤로가기</BackBtn>
                             </CommentInput> : <>{comment.content}</> }
                            </>
                               
                             
                              
                              :  null }
                        </CommentData>
                      
                    </CommentContainer>

                );
            })}
        </DetailContainer>

    );
}

const DetailContainer = styled.div`
padding-top: 20px;
max-width: 768px;
margin: auto;
word-break: keep-all;
overflow-wrap: break-word;
line-height: 30px;
padding-bottom: 100px;

img{
    max-width: 768px;
}

@media screen and (max-width:768px) {
    width: 90%;
    margin: auto;

    img {
        width: 100%;
        background-color: aliceblue;
    }
}
`;

const Mybtn = styled.div`
display: flex;
justify-content: flex-end;
`;

const PostUser = styled.div`

span {
    font-weight: bold;
}
`;

const TagContainer = styled.div`
margin-top:30px;
`;

const TagStyle = styled.span`
color:#12b886;
background-color: #F8F9FA;
padding:10px 12px;
border-radius: 30px;
margin-right:10px;

`;


const CommentInput = styled.div`

padding-bottom: 40px;
textarea {
    border: 1px solid #eee;
    min-width: 733px;
    height: 58px;
    padding: 16px 16px 24px 16px;
    margin: auto;
    resize: none;
    :focus {
        outline: none;
    }
}
button {
   
    margin: auto auto auto auto;
    background-color: #12b886;
    border-radius: 5px;
    border: 1px solid #12b886;
    color: white;
   height: 32px;
   width: 95px;
   font-weight: bold;
   font-size: 16px;
   float: right;
   right: 0;
  

   &:hover {
    background-color:#20C997;
   }
}


`;

const BackBtn = styled.button`
background-color: white;
border-radius: 5px;
border: 1px solid #12b886;
color:#12b886;
height: 32px;
width: 95px;
font-weight: bold;
font-size: 16px;
float: right;
right: 0;
`;

const CommentContainer = styled.div`
padding: 20px 0px;


`;

const CommentData = styled.span`
display: grid;
grid-template-columns: 1fr 0.1fr;
grid-template-rows: 1fr;
font-size: 12px;
color: #868296;

span {
    color:#222;
    font-weight: bold;
    font-size: 14px;
    
    
}
`;


export default Detail;