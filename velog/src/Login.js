import { useState } from "react";
import styled from "styled-components";
import axios from "axios"
import {Cookies} from 'react-cookie'

const Login = (props) => {  
    const cookies = new Cookies()

    const [register, setRegister] = useState(false);

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [PWComfirm, setPWConfirm] = useState("");
    const [UserName, setUserName] = useState("");
    const [Introduce, setIntroduce] = useState("");


    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPWHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onPWConfirmHandler = (event) => {
        setPWConfirm(event.currentTarget.value)
    }
    const onNameHandler = (event) => {
        setUserName(event.currentTarget.value)
    }
    const onIntroHandler = (event) => {
        setIntroduce(event.currentTarget.value)
    }

    //회원가입 onClick 함수
    const Register = () => {
        axios.post('http://localhost:3001/user', {
            username: UserName,
            password: Password,
            passwordCheck: PWComfirm,
            email: Email,
            introduce: Introduce
        })
        .then(function (response) {
            console.log(response)

        })
        .catch(function(error){
            console.log(error)
        });
        Login();
        window.location.replace("/")
        
    }

    const Login = () => {
        axios.get('http://localhost:3001/user', {
            params:{
                username: UserName,
                password:Password
            }
        })
        .then(function (response){
            //(프론트용: 로그인 시 id값을 로컬 스토리지에 저장)
            localStorage.setItem('id', response.data[0].id);

            //access token을 local storage에 저장
            if(response.token){
                localStorage.setItem('wtw-token', response.token);
            }
            window.location.replace("/")
        })
        .catch(function(error){
            console.log(error)
        })
    }

    return (
        <>
            {props.showModal ?

                <Background>
                    <ModalContainer onClick={e => e.stopPropagation()}>
                        <div>
                            <div>메뉴</div>
                        </div>

                        <Wrapper>

                            <div style={{ paddingBottom: "50px", textAlign: "right" }}>
                                <div onClick={props.closeModal}>X</div>
                            </div>

                            <LoginWrapper>

                                {register ?

                                    <>
                                        <LoginText>회원가입<br /> </LoginText>

                                        <InputWrapper>
                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                            <input type="text" placeholder="아이디를 입력하세요." onChange={onNameHandler}/>
                                               
                                                <input type="password" placeholder="비밀번호를 입력하세요." onChange={onPWHandler}/>
                                                <input type="password" placeholder="비밀번호를 확인하세요." onChange={onPWConfirmHandler}/>
                                                <input type="text" placeholder="이메일을 입력하세요." onChange={onEmailHandler}/>
                                                <input type="text" placeholder="당신을 한 줄로 소개해보세요." onChange={onIntroHandler}/>
                                            </div>

                                        </InputWrapper>
                                        <LoginBtn isActive={register} onClick={Register}>회원가입</LoginBtn>

                                        <div>
                                            계정이 이미 있으신가요?
                                            <span onClick={() => { setRegister(false) }}> 로그인</span>
                                        </div>
                                    </>
                                    :

                                    <>
                                        <LoginText>로그인<br /> </LoginText>

                                        <InputWrapper>
                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                <input type="text" placeholder="아이디를 입력하세요" onChange={onNameHandler}/>
                                                <input type="password" placeholder="비밀번호를 입력하세요" onChange={onPWHandler}/>
                                            </div>
                                            <LoginBtn isActive={register} onClick={Login}>로그인</LoginBtn>
                                        </InputWrapper>

                                        <div>
                                            아직 회원이 아니신가요?
                                            <span onClick={() => { setRegister(true) }}> 회원가입</span>
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
    background-color: rgba(0,0,0,0.50);
    z-index: 0;
`;


const LoginWrapper = styled.div`


`;
const Wrapper = styled.div`
display: flex;
flex: 1 1 0%;
flex-direction: column;

input {
    height: 47px;
    width: 246px;
    border-right: none;
    outline: none;
    border-radius: 2px;
    padding: 0px 12px;
    border: 1px solid #eee;
    margin-bottom: 10px;
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
    width: 558px;
    height: 432px;
    padding: 30px;
    background: white;
    display: grid;
    grid-template-columns: 1fr 2fr;

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
height: 48px;
border: none;
height: ${(props) =>
        props.isActive ? '48px' : '108px'};
width: ${(props) =>
        props.isActive ? '272px' : '96px'};
border-radius: 2px;
color: white;
font-weight: bold;

`;

const LoginText = styled.span`
font-weight: bold;
font-size: 21px;
`;
export default Login;