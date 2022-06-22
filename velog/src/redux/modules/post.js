import axios from "axios";

//action
const GET_POST = "GET_POST"
const ADD_POST = "ADD_POST"
const CREATE = "CREATE"
const REMOVE = "REMOVE"
const UPDATE = "UPDATE"


const initialState = {
  list: [
    {
      "title": "게시글 제목",
      "content": "게시글 내용",
      "contentSummary": "게시글 요약",
      "createdAt": "작성일자",
      "imgPath": "썸네일 이미지url",
      "username": "username",
      "id": 1,
      "tagString": "tag1, tag2, tag3"

    }
  ],
};

export function createPost(post) {
  return { type: CREATE, post }
}

//action creators
export function getPost(post_list) {
  return { type: GET_POST, post_list }
};
export function addPost(post) {
  return { type: ADD_POST, post }
};
export function removePost(post_index) {
  return { type: REMOVE, post_index }
}
export function updatePost(post_index){
  return {type:UPDATE, post_index}
}

//middlewares
export const getpostAc = () => {
  return function (dispatch) {
    axios.get("http://3.34.178.13/viewboards")
      .then(response => {
        console.log(response.data, "redux_data");
        console.log(response)
        dispatch(getPost(response.data));
      })
      .catch(error => {
        console.log("get error", error)
      })
  };
};

export const addpostAc = (post, token) => {
  return function (dispatch) {
    axios.post("http://3.34.178.13/boards", post, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => { })
    dispatch(addPost(post))
      .catch(error => {
        console.log("add error", error)
      })
  };
};

export const createPostAc = (post, token) => {
  return function (dispatch) {
    axios.post("http://3.34.178.13/boards", post, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response);
        dispatch(createPost())
        alert("출간 완료");
        window.location.replace("/");
      })
      .catch((error) => {
        console.log(error);
        alert("다시 시도해주세요")
      });
  };
};


export const deletePostDB = (postID, token) => {
  return function (dispatch) {
    axios.delete(`http://3.34.178.13/boards/${postID}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        dispatch(removePost(postID))
        window.location.replace("/")
      }).catch((error) => {
        console.log(error)
      })
  }
}

export const UpdatePostDB = (postID, post, token) => {
  return function (dispatch) {
    axios.put(`http://3.34.178.13/boards/${postID}`, post, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log(response)
      dispatch(updatePost(postID))
    }).catch((error) => {
      console.log(error)
    })
  }
}


//reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "GET_POST": {
      return { list: action.post_list }
    }
    case "ADD_POST": {
      const new_post_list = [action.post]
      return { list: new_post_list, ...state };
    }
    case "CREATE": {
      const new_post_list = [...state.list, action.post];
      return { list: new_post_list }
    }
    case "UPDATE": {
      const new_post_list = state.list.map((l, idx)=>{
          if (parseInt(action.post_index) === idx){
          } else { return l; }
      })
      return { list: new_post_list };
  }
    case "REMOVE": {
      const new_post_list = [...state.list.filter(list => list !== action.post_index)]
      return { list: new_post_list }
    }

    default:
      return state;
  };
};
