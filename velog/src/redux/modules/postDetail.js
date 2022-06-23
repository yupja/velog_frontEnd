import axios from "axios";

//action
const LOAD = 'postdetail/LOAD';
const CREATE = 'postdetail/CREATE';
const UPDATE = 'postdetail/UPDATE';
const REMOVE = 'postdetail/REMOVE';


const initialState = {
    list: [
        {
            "title": "게시글 제목",
            "content": "게시글 내용",
            "contentSummary": "게시글 요약",
            "createdAt": "작성일자",
            "imgPath": "썸네일 이미지url",
            "member": "작성자정보?",
            "username": "username",
            "id": 1,
            "tagString": "tag1, tag2, tag3"
        }
    ],
};




//action creators
export function getPostDetail(post_list) {
    return { type: LOAD, post_list }
};
export function addPost(post){
    return { type: CREATE, post}
};

//middlewares
export const getpostDetailDB = (list_index) => {
    return async function (dispatch) {
        const response = await axios.get(`http://3.34.178.13/viewboards/${list_index}`)
           dispatch(getPostDetail(response.data))  
    };
};
export const addPostDB = (post, token) => {
    return async function (dispatch) {
        const response = await axios.post(`http://3.34.178.13/boards`, post, {
            headers:{
                'Authorization' : `Bearer ${token}`
            }
        })
        console.log(response.data)
        dispatch(addPost(response.data))
    }
}


//reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "postdetail/LOAD": {
            return { list: action.post_list }
        }
        case "postdetail/CREATE":{
            const new_post_list = [...state.list, action.post];
            return { list: new_post_list };
        }
        default:
            return state;
    };
};
