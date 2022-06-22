import styled from "styled-components";
import emptySeries from "./styles/emptySeries.svg"

const MySeries = () => {
    return (
        <Container>
        <img src={emptySeries}/>
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
export default MySeries;