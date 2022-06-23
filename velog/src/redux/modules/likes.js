import axios from "axios";

//action
const GET = "likes/GET"
const UPDATE = "likes/UPDATE"


const initialState = {
  list: [],
};

export function getLikes(likes) {
  return { type: GET, likes }
}
export function updateLikes(post_index){
  return {type:UPDATE, post_index}
}


//middlewares
export const getLikesDB = (boardID) => {
  return function (dispatch) {
    axios.get(`http://3.34.178.13/viewlikes/${boardID}`)
      .then(response => {
        console.log(response.data.likeCnt)
        dispatch(getLikes(response.data.likeCnt));
      })
      .catch(error => {
        console.log("get error", error)
      })
  };
}


export const UpdateLikesDB = (boardID, behavior, token) => {
  return function (dispatch) {
    axios.put(`http://3.34.178.13/like/${boardID}`, behavior, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log(response)
      dispatch(updateLikes(boardID))
    }).catch((error) => {
      console.log(error)
    })
  }
}


//reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "likes/GET": {
      return { list: action.likes }
    }
    case "likes/UPDATE": {
      const new_likes_list = state.list.map((l, idx)=>{
          if (parseInt(action.post_index) === idx){
          } else { return l; }
      })
      return { list: new_likes_list };
  }

    default:
      return state;
  };
};
