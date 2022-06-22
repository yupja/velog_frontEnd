import styled from "styled-components";
import emptyAbout from "./styles/emptyIntroduce.svg"

const MyAbout = () => {
    return (
        <Container>
        <img src={emptyAbout}/>
        </Container>
    );
}

const Container = styled.div`
display: flex;
justify-content: center;

img {
    width: 20rem;
    height: 20rem;
    display: block;
  margin-top: 2rem;
}
`;

export default MyAbout;