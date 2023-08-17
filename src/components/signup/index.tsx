/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import HttpClient from "../../utils/httpClient";
import { MyContext } from "../../App";

export default function SignUp() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
	// const context = useContext(MyContext);
  // if (!context) {
  //   throw new Error('MyContext must be used within a Provider');
  // }
  // const { email, setEmail, password, setPassword } = context;
	const [isButtonDisabled1, setIsButtonDisabled1] = useState(true);
	const [isButtonDisabled2, setIsButtonDisabled2] = useState(true);
	const navigate = useNavigate();
	const tokenNavigate =useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem('access_token')){
      tokenNavigate('/signin')}
      else{
        tokenNavigate('/todo')
      }
  },[])

	const signup = async (email: string, password: string) => {
		//testId : wantedTest@naver.com
		//password: 123123123
		try {
			await HttpClient.post(
				"auth/signup",
				{ email, password },
				{
					"Content-Type": "application/json",
				}
			);
			navigate("/signin");
		} catch (e) {
			console.error(`(${(e as AxiosError).request}:회원가입실패`);
			return;
		}
	};

	const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		const regex = /@/g;
		if (regex.test(e.target.value)) {
			setIsButtonDisabled1(false);
		} else {
			setIsButtonDisabled1(true);
		}
	};

	const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		if (e.target.value.length >= 8) {
			setIsButtonDisabled2(false);
		} else {
			setIsButtonDisabled2(true);
		}
	};

	return (
		<div css={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
			<div
				css={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					width: 330,
					height: 200,
					borderRadius: 16,
					background: "#C9C9C9",
					margin: "0 auto",
					padding: "2rem",
				}}
			>
				<div css={{ alignSelf: "start", margin: "1rem 0px" }}>
					<span css={{ marginRight: "2rem" }}>이메일 :</span>
					<input value={email} onChange={handleEmail} data-testid="email-input" />
					{isButtonDisabled1 ? <div css={{ color: "red" }}>이메일에 '@'를 포함시켜주세요</div> : <span css={{ color: "green", marginLeft: 16 }}>OK</span>}
				</div>
				<div css={{ alignSelf: "start", margin: "1rem 0px" }}>
					<span css={{ marginRight: "1.2rem" }}>패스워드 :</span>
					<input value={password} onChange={handlePassword} data-testid="password-input" />

					{isButtonDisabled2 ? <div css={{ color: "red" }}>8자 이상의 비밀번호를 입력해주세요</div> : <span css={{ color: "green", marginLeft: 16 }}>OK</span>}

					<button
						onClick={e => {
							e.stopPropagation();
							signup(email, password);
						}}
						disabled={isButtonDisabled1 || isButtonDisabled2}
						css={{
							cursor: "pointer",
							color: isButtonDisabled1 && isButtonDisabled2 ? "red" : "green",
							margin: "20px auto",
						}}
						data-testid="signup-button"
					>
						회원가입
					</button>
				</div>
			</div>
		</div>
	);
}
