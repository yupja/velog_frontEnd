import axios from "axios";

//action
const LOAD = 'tags/LOAD';
const CREATE = 'tagsdetail/CREATE';
const UPDATE = 'tagsdetail/UPDATE';
const REMOVE = 'tagsdetail/REMOVE';


const initialState = {
    list: [],
};


//action creators
export function getTags(tags_list) {
    return { type: LOAD, tags_list }
};

//middlewares
export const getTagsDB = (list_index) => {
    return async function (dispatch) {
        const response = await axios.get(`http://3.34.178.13/viewboards/${list_index}`)
           dispatch(getTags(response.data.tagString.split(",")))
    };
};


//reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "tags/LOAD": {
            return { list: action.tags_list }
        }
        default:
            return state;
    };
};
