import { useState } from "react";
import styled from "styled-components";
import axios from "axios"
import { Cookies } from 'react-cookie'
import Loginimg from "./styles/Login.svg"

const Login = (props) => {
    const [error, setError] = useState();
    const [pwError, setPwError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [mailError, setMailError] = useState(false);

    const [register, setRegister] = useState(false);

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [PWComfirm, setPWConfirm] = useState("");
    const [UserName, setUserName] = useState("");
    const [Introduce, setIntroduce] = useState("");


    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
        console.log(Email)
        console.log(mailError)
        if (Email === null || !toString(Email).includes('@','.') ){
            setMailError(true);
        } else if (Email.includes('@','.')){
            setMailError(false);
        }
    }

    const onPWHandler = (event) => {
        setPassword(event.currentTarget.value)
        if (Password < 8){
            setPwError(true);
        } else {
            setPwError(false);
        }
    }
    const onPWConfirmHandler = (event) => {
        setPWConfirm(event.currentTarget.value)
    }
    const onNameHandler = (event) => {
        setUserName(event.currentTarget.value)
        if(UserName === null){
            setNameError(true);
        }   else {
            setNameError(false);
        }
    }
    const onIntroHandler = (event) => {
        setIntroduce(event.currentTarget.value)
    }

    //회원가입 onClick 함수
    const Register = () => {

        axios.post('http://3.34.178.13/user/signup', {
            username: UserName,
            password: Password,
            email: Email,
            introduce: Introduce
        })
            .then(function (response) {
                console.log(response)
                if (!response.data.result) {
                    console.log(response.data.errMsg)
                    setError(response.data.errMsg)
                } else {
                    Login();
                    window.location.replace("/")
                }

            })
            .catch(function (error) {
                console.log(error)
            });


    }

    const Login = () => {
        axios.post('http://3.34.178.13/user/login', {
            username: UserName,
            password: Password
        }
        )
            .then(function (response) {
                console.log(response)
                if (response.data.token) {
                    localStorage.setItem('wtw-token', response.data.token);
                    localStorage.setItem('username', UserName)
                    window.location.replace("/")
                }

            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <>
            {props.showModal ?

                <Background>
                    <ModalContainer onClick={e => e.stopPropagation()}>
                        <LeftContainer>
                            <div>
                                <img src={Loginimg} />
                                <h2>환영합니다!</h2>
                            </div>

                        </LeftContainer>

                        <Wrapper>



                            <LoginWrapper>

                                {register ?

                                    <>
                                  
                                        <div style={{ paddingBottom: "10px", textAlign: "right" }}>
                                            <div onClick={props.closeModal}>X</div>
                                        </div>
                                        <div style={{ marginBottom: "10px" }}>
                                            <LoginText>회원가입</LoginText>
                                        </div>


                                        <InputWrapper>
                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                <input type="text" placeholder="아이디를 입력하세요." onChange={onNameHandler} />
                                                <input type="password" placeholder="비밀번호를 입력하세요." onChange={onPWHandler} />
                                                <input type="password" placeholder="비밀번호를 확인하세요." onChange={onPWConfirmHandler} />
                                                <input type="text" placeholder="이메일을 입력하세요." onChange={onEmailHandler} />
                                                <input type="text" placeholder="당신을 한 줄로 소개해보세요." onChange={onIntroHandler} />
                                                
                                            </div>

                                        </InputWrapper>
                                        <LoginBtn isActive={register} onClick={Register}>회원가입</LoginBtn>
                                        <br/>
                                        
                                        {nameError ? <ErrorMsg>❗️ 아이디를 입력하세요!</ErrorMsg> : null}
                                        {pwError ? <ErrorMsg>❗️ 비밀번호는 5자 이상이어야 합니다!</ErrorMsg> : null}
                                        {mailError ?  <ErrorMsg>❗️ 이메일을 확인해주세요!</ErrorMsg> : null}
                                        {error === "중복된 사용자 ID가 존재합니다." ? <ErrorMsg>❗️ {error}</ErrorMsg> : null}
                                        <div style={{ marginTop: "30px" , textAlign:"right"}}>
                                            계정이 이미 있으신가요?
                                            <span onClick={() => { setRegister(false) }}
                                                style={{ color: "#12b886", fontWeight: "bold" }}> 로그인</span>
                                        </div>
                                    </>
                                    :

                                    <>
                                        <div style={{ paddingBottom: "70px", textAlign: "right" }}>
                                            <div onClick={props.closeModal}>X</div>
                                        </div>
                                        <div style={{ marginBottom: "10px" }}>
                                            <LoginText>로그인<br /> </LoginText>
                                        </div>


                                        <InputWrapper>
                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                <input type="text" placeholder="아이디를 입력하세요" onChange={onNameHandler} />
                                                <input type="password" placeholder="비밀번호를 입력하세요" onChange={onPWHandler} />
                                            </div>
                                            <LoginBtn isActive={register} onClick={Login}>로그인</LoginBtn>
   
                                        </InputWrapper>
                                        {nameError ? <ErrorMsg>❗️ 아이디를 입력하세요!</ErrorMsg> : null}
                                        {pwError ? <ErrorMsg>❗️ 비밀번호는 5자 이상이어야 합니다!</ErrorMsg> : null}
                                        {!error === "" ? <ErrorMsg>❗️ {error}</ErrorMsg> : null}

                                        <div style={{ marginTop: "20px", textAlign:"right" }}>
                                            아직 회원이 아니신가요?
                                            <span onClick={() => { setRegister(true) }}
                                                style={{ color: "#12b886", fontWeight: "bold" }}> 회원가입</span>
                                        </div>
                                    </>

                                }
                            </LoginWrapper>



                        </Wrapper>
                    </ModalContainer>
                </Background> : null}
        </>

    );
}



const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(249,249,249,0.85);
    z-index: 0;
`;


const LoginWrapper = styled.div`


`;

const LeftContainer = styled.div`
background-color: #f8f9fa;
padding: 10px;
justify-content: center;
display: flex;
text-align: center;
align-items: center;

img{
    width: 100%;
    height: auto;
    display: block;

}
`;

const Wrapper = styled.div`
display: flex;
flex: 1 1 0%;
flex-direction: column;
padding: 30px;


input {
    height: 47px;
    width: 246px;
    border-right: none;
    outline: none;
    border-radius: 2px;
    padding: 0px 12px;
    border: 1px solid #eee;

}
`;

const InputWrapper = styled.div`
display: grid;
grid-template-columns: 3fr 1fr;

`;
const ModalContainer = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 606px;
    height: 500px;

    background: white;
    display: grid;
    grid-template-columns: 1fr 2fr;
    box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;

    @media screen and (max-width:600px){
        width: 100vw;
        height: 100vh;
        padding: 20px;
    }
`;

const closeBtn = styled.div`
align-self: flex-end;
text-align: right;
height: 100px;
`;

const LoginBtn = styled.button`
background-color: #12b886;
border: none;
height: ${(props) =>
        props.isActive ? '48px' : '98px'};
width: ${(props) =>
        props.isActive ? '272px' : '96px'};
border-radius: 2px;
color: white;
font-weight: bold;
margin-bottom: 10px;

`;

const LoginText = styled.span`
font-weight: bold;
font-size: 21px;
`;

const ErrorMsg = styled.span`
color:#e74c3c;
font-size: 14px;
`;
export default Login;