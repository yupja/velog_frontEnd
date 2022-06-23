import axios from "axios";
//action
const LOAD = 'date/LOAD';

const initialState = {
    list: [],
};

export function getDate(tags_list) {
    return { type: LOAD, tags_list }
};

export const getDateDB = (list_index) => {
    return async function (dispatch) {
        const response = await axios.get(`http://3.34.178.13/viewboards/${list_index}`)
           dispatch(getDate(response.data.createdAt.substr(0,10)))
    };
};



//reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "date/LOAD": {
            return { list: action.tags_list }
        }
        default:
            return state;
    };
};
