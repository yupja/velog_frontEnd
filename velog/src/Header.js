import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"
import Login from "./Login";

const Header = () => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false);
    }


    return (
        <Wrap>
            <HeaderContainer>
                <Link to="/"> 홈으로 가기</Link>
                <span onClick={openModal}>로그인</span>
                {showModal ?
                    <Login showModal={showModal} closeModal={closeModal} />
                    : null}
            </HeaderContainer>
        </Wrap>

    );
}

const Wrap = styled.div``;

const HeaderContainer = styled.header`
background-color: aliceblue;
`;


export default Header;