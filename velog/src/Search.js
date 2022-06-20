import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { getpostAc } from "./redux/modules/post";
import ConTable from "./Contable";

const Search = () => {
    const dispatch = useDispatch();
    const list_data = useSelector((state) =>state.post.list)
    const [query, setQuery] = useState("");
    const keys = ["title", "contentSummary"];

    console.log(list_data.filter(list=>list.title.toLowerCase().includes(query)),"쿼리야")

    React.useEffect(() => {
        dispatch(getpostAc());
      },[]);

      const search = (list_data) => {
        return list_data.filter(
            (list)=>
            keys.some((key)=> list[key].toLowerCase().includes(query)) 
        );
      };

    return (
        <>
        <div className="app">
        <SearchBox>
            <svg width="26" height="26" viewBox="0 0 17 17" style={{margin:"auto auto auto 23px"}}><path fillRule="evenodd" d="M13.66 7.36a6.3 6.3 0 1 1-12.598 0 6.3 6.3 0 0 1 12.598 0zm-1.73 5.772a7.36 7.36 0 1 1 1.201-1.201l3.636 3.635c.31.31.31.815 0 1.126l-.075.075a.796.796 0 0 1-1.126 0l-3.636-3.635z" clipRule="evenodd" fill="currentColor"></path></svg>
            <Input  placeholder="검색어를 입력하세요" className="search" 
            onChange={(e) => setQuery(e.target.value)}>
            </Input>
        </SearchBox>
            {query.length != 0 &&(
            <ConTable data={search(list_data)}/>
            )
        }
            </div>
            </>
    );
};

const SearchBox = styled.div`
    width: 765px;
    height: 64px;
    border: 1px solid #adb5bd;
    display: flex;
    margin: 45px auto 10px auto;
`;
const Input = styled.input`
    width: 670px;
    height: 44px;
    padding: 10px 10px 10px 10px;
    background-color: none;
    border: none;
    display: flex;
    /* justify-self: right; */
    margin-left: auto;
    font-size: 30px;
    :focus{
    outline: none;
}
`;

export default Search;