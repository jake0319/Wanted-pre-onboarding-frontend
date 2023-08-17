import { createBrowserRouter, Route, RouterProvider, Routes, useNavigate } from "react-router-dom";
import SignUp from "./components/signup";
import SignIn from "./components/signin";
import { createContext, useState } from "react";
import Todo from "./components/todo";

const router = createBrowserRouter([{ path: "*", Component: Root }]);
//컨텍스트 생성
type ContextValue = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

export const MyContext = createContext<ContextValue|null>(null);
//컨텍스트프로바이더 생성
const MyContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

  const contextValue: ContextValue = {
    email,
    setEmail,
    password,
    setPassword,
  };

	return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
};

export default function App() {
	return (
		<>
			<MyContextProvider>
				<RouterProvider router={router} />
			</MyContextProvider>
		</>
	);
}

function Root() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/signin" element={<SignIn />} />
			<Route path="/todo" element={<Todo/>} />
		</Routes>
	);
}

function Home() {
	const navigate = useNavigate();
	return (
		<>
			<button
				onClick={() => {
					navigate("/signup");
				}}
				css={{ width: 50, height: 50 }}
			>
				회원가입하러가기
			</button>
		</>
	);
}
