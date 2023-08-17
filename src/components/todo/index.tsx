import React, { useState, useEffect } from "react";

function Todo() {
	const [listArray, setListArray] = useState<string[] | null>(() => {
		//로컬스토리지 값이 없다면 디폴트세팅
		const storedArray = localStorage.getItem("listArray");
		if (!storedArray) {
			localStorage.setItem("listArray", JSON.stringify(["TODO 1", "TODO 2"]));
			return ["TODO 1", "TODO 2"];
		} else {
			//있다면
			return JSON.parse(storedArray);
		}
	});
	const [inputText, setInputText] = useState<string>("");

	useEffect(() => {
		const storedArray = localStorage.getItem("listArray");
		if (storedArray) setListArray(JSON.parse(storedArray));
	}, []);

	return (
		<div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
			<div style={{ border: "1px solid black", width: "50%", height: "50%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
				<div style={{ marginBottom: 16, display: "flex", alignItems: "center" }}>
					<input
						onChange={e => {
							setInputText(e.target.value);
						}}
						data-testid="new-todo-input"
					/>
					<button
						onClick={() => {
							if (listArray) {
								const updatedList = [...listArray, inputText];
								localStorage.setItem("listArray", JSON.stringify(updatedList));
								setListArray(updatedList);
							}
						}}
						data-testid="new-todo-add-button"
					>
						추가
					</button>
				</div>
				{listArray
					? listArray.map((item: any, idx) => {
							return (
								<div key={idx}>
									<ContensComponent item={item} listArray={listArray} inputText={inputText} setListArray={setListArray} key={idx}></ContensComponent>
								</div>
							);
					  })
					: undefined}
			</div>
		</div>
	);
}

export default Todo;

export const ModifyComponent = ({
	isModifyOn,
	setIsModifyOn,
	listArray,
	inputText,
	item,
	setListArray,
}: {
	isModifyOn: any;
	setIsModifyOn: any;
	listArray: string[];
	inputText: string;
	item: string;
	setListArray: any;
}) => {
	const [modifyText, setModifyText] = useState("");
	return (
		<div>
			{!isModifyOn ? (
				<button
					data-testid="modify-button"
					onClick={e => {
						e.stopPropagation();
						//수정모드 on-off
						setIsModifyOn(!isModifyOn);
					}}
				>
					수정
				</button>
			) : (
				<div>
					<input
						onChange={e => {
							setModifyText(e.target.value);
						}}
						data-testid="modify-input"
					/>
					<button
						onClick={e => {
							e.stopPropagation();
							if (listArray) {
								let updatedList = [...listArray];
								const index = updatedList.findIndex(text => text === item);
								updatedList[index] = modifyText;
								localStorage.setItem("listArray", JSON.stringify(updatedList));
								setListArray(updatedList);
								setIsModifyOn(false);
							}
						}}
						data-testid="submit-button"
					>
						제출
					</button>
					<button
						onClick={e => {
							e.stopPropagation();
							setIsModifyOn(!isModifyOn);
						}}
						data-testid="cancel-button"
					>
						취소
					</button>
				</div>
			)}
		</div>
	);
};

function ContensComponent(props: { item: any; listArray: any; inputText: any; setListArray: any; key: number }) {
	const [isModifyOn, setIsModifyOn] = useState(false);
	return (
		<div>
			<li style={{ display: "flex" }}>
				<label>
					<input type="checkbox" />
					{isModifyOn ? undefined : <span>{props.item}</span>}
				</label>
				<ModifyComponent
					isModifyOn={isModifyOn}
					setIsModifyOn={setIsModifyOn}
					listArray={props.listArray}
					inputText={props.inputText}
					item={props.item}
					setListArray={props.setListArray}
				></ModifyComponent>
				{isModifyOn ? undefined : (
					<button
						data-testid="delete-button"
						onClick={() => {
							if (props.listArray) {
								let updatedList = [...props.listArray];
								updatedList = updatedList.filter(text => text !== props.item);
								localStorage.setItem("listArray", JSON.stringify(updatedList));
								props.setListArray(updatedList);
							}
						}}
					>
						삭제
					</button>
				)}
			</li>
		</div>
	);
}
