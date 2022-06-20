import React from "react";
import { useSelector } from "react-redux/es/exports";
import styled from "styled-components";

const ConTable = () => {
    const list_data = useSelector((state) =>state.post.list)

    return(
        <>
        <TableBox>
        <p style={{textAlign:"left", marginBottom:"30px"}}>총 list.length 개의 포스트를 찾았습니다.</p>
        {list_data.map((list, id)=>(
        <Table>
            <tbody>
                <tr>
                    <th>프사, 닉네임</th>
                </tr>
                <tr>
                     <th key={list.id}>{list.title}</th>
                </tr>
                <tr>
                   <th>{list.contentSummary}</th>
                </tr>
                <tr>
                    <th>tag</th>  
                </tr>
                <tr>
                    <th>day ' comentscount</th>
                </tr>
            </tbody>
        </Table>
           ))}
           </TableBox>
        </>
    )
    
};

const Table = styled.table`
/* display: flex; */
text-align: left;
margin-right: auto;
margin-bottom: 30px;
`;

const TableBox = styled.div`
margin: auto;
width: 765px;
display: flex;
flex-direction: column;
border: 1px solid black;
`;

export default ConTable;