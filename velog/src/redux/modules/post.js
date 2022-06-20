import axios from "axios";

//action
const GET_POST = "GET_POST"
const ADD_POST = "ADD_POST"

const initialState = {
    list: [
      {
        "title": "게시글 제목2",
        "contentSummary": "게시글 요약2",
        "thumbnail": "썸네일 이미지2",
        "createdAt": "작성일자2",
        "id": 1
      }
    ],
  };

  //action creators
  export function getPost (post_list){
    return { type: GET_POST, post_list}
  };
  export function addPost (post){
    return { type: ADD_POST, post}
  };

  //middlewares
  export const getpostAc = () => {
    return function (dispatch) {
      axios.get("http://localhost:5001/GetBoardMain")
      .then(response => {
        console.log(response.data,"redux_data");
        // dispatch(getPost([...response.data]));
        dispatch(getPost(response.data));
      })
      .catch(error => {
        console.log("get error", error)
      })
    };
  };

  export const addpostAc = (post) => {
    return function (dispatch) {
      axios.post("http://localhost5001", post)
            .then((response) => {})
            dispatch(addPost(post))
            .catch(error => {
              console.log("add error", error)
            })
    };
  };

  //reducer
  export default function reducer(state = initialState, action = {}){
    switch (action.type) {
        case "GET_POST": {
          return { list: action.post_list }
        }
        case "ADD_POST": {
          const new_post_list = [action.post]
            return { list: new_post_list, ...state };
        }

        default:
            return state;
    };
  };
