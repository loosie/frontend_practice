// useConfirm
// 사용자가 버튼을 클릭하는 작업을 하면(이벤트를 실행하기 전에 ) 메세지를 보여주는 hook
// 사용자가 무언가를 하기전에 확인하는 용도

// onConfirm : 확인을 눌렀을 때 발생하는 이벤트 (필수)
// onCancel : 취소를 눌렀을 때 발생하는 이벤트 (필수 x)

export const useConfirm = (message = "", onConfirm, onCancel) => {
    if (!onConfirm || typeof onConfirm !== "function") {
        return;
    }
    // onCancel: not 필수
    if (onCancel && typeof onCancel !== "function") {
        return;
    }

    const confirmAction = () => {
        if (confirm(message)) {
            onConfirm();
        } else {
            onCancel();
        }
    };

    return confirmAction;
};



// ex
// import ReactDOM from "react-dom";

// const useConfirm = (message = "", onConfirm, onCancel) => {
    // if (!onConfirm || typeof onConfirm !== "function") {
    //     return;
    // }
    // if (onCancel && typeof onCancel !== "function") {
    //     return;
    // }

//     const confirmAction = () => {
//         if (confirm(message)) {
//             onConfirm();
//         } else {
//             onCancel();
//         }
//     };

//     return confirmAction;
// };
// const App = () => {
//     const deleteWorld = () => console.log("Deleting the world");
//     const abort = () => console.log("Aborted");
//     const confirmDelete = useConfirm("Are you sure", deleteWorld, abort);
//     return (
//         <div className="App">
//             <button onClick={confirmDelete}>Delete the world</button>
//         </div>
//     );
// };

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
