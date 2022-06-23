
import axios from "axios";

//action
const LOAD = 'comment/LOAD';
const CREATE = 'comment/CREATE';
const UPDATE = 'comment/UPDATE';
const REMOVE = 'comment/REMOVE';


const initialState = {
    list: [],
  };
  
  //action creators
  export function getComment (comment_list){
    return { type: LOAD, comment_list}
  };
  export function createComment(comment){
    return { type: CREATE, comment}
  };
  export function deleteComment(comment_index){
    return {type: REMOVE, comment_index}
  }
  export function updateComment(comment_index){
    return {type: UPDATE, comment_index}
  }

  //middlewares
  export const getCommentDB = (boardId) => {
    return function (dispatch) {
      axios.get(`http://3.34.178.13/viewcomments/${boardId}`)
      .then(response => {
        console.log(response.data);
        dispatch(getComment(response.data));
      })
      .catch(error => {
        console.log("get error", error)
      })
    };
  };

  export const addCommentDB = (boardId, comment, token) => {
    return function (dispatch) {
        axios.post(`http://3.34.178.13/comments/${boardId}`, comment ,{
          headers: {
            'Authorization' : `Bearer ${token}`
          }
        })
        .then (response => {
          console.log(response)
            dispatch(createComment(response.data))
            window.location.reload()
        }).catch(error => {
            console.log("get error", error)
        })
    }
  }

export const updateCommentDB = (commentID, comment, token) => {
  return function (dispatch) {
    axios.put(`http://3.34.178.13/comments/update/${commentID}`, comment, {
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    }).then((response)=>{
      dispatch((updateComment(response.data)))
    }).catch((error) => {
      console.log(error)
    })
  }
}


  export const removeCommentDB = (commentID, token) => {
    return function (dispatch) {
      axios.delete(`http://3.34.178.13/comments/${commentID}`, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((reponse)=>{
          dispatch(deleteComment(commentID))
          window.location.reload()
      }).catch((error)=>{
        console.log(error)
      })
    }
  }


  //reducer
  export default function reducer(state = initialState, action = {}){
    switch (action.type) {
        case "comment/LOAD": {
          return { list: action.comment_list }
        }
        case "comment/CREATE": {
          const new_post_list = [action.post]
            return { list: new_post_list, ...state };
        }
        case "post/UPDATE": {
          console.log("이제 수정할거야!")
          const new_comment_list = state.list.map((l, idx) => {
              if (parseInt(action.comment_index) === idx){
                  console.log(action.post.user)
              } else { return l; }
          })
          return { list: new_comment_list };
      }
        case "comment/REMOVE": {
          const new_comment_list = [...state.list.filter(list => list !== action.comment_index)]
          return { list: new_comment_list }
        }

        default:
            return state;
    };
  };
