// usePreventLeave 
// window 브라우저창을 닫기 전에 (어떤 내용)에 대해 확인하는 메세지를 나타내는 hook 

export const usePreventLeave = () => {
    const listener = (event) => {
        // 표준에 따라 기본 동작 방지
        event.preventDefault();
        // Chrome에서는 returnValue 설정이 필요함
        event.returnValue = "";

        // 참고 링크 : https://developer.mozilla.org/ko/docs/Web/API/Window/beforeunload_event
    };
    const enablePrevent = () => window.addEventListener("beforeunload", listener);
    const disablePrevent = () =>
        window.removeEventListener("beforeunload", listener);

    return { enablePrevent, disablePrevent };
};



// ex
// import ReactDOM from "react-dom";

// const usePreventLeave = () => {
//     const listener = (event) => {
//         event.preventDefault();
//         event.returnValue = "";
//     };
//     const enablePrevent = () => window.addEventListener("beforeunload", listener);
//     const disablePrevent = () =>
//         window.removeEventListener("beforeunload", listener);

//     return { enablePrevent, disablePrevent };
// };
// const App = () => {
//     const { enablePrevent, disablePrevent } = usePreventLeave();

//     return (
//         <div className="App">
//             <button onClick={enablePrevent}>Protect</button>
//             <button onClick={disablePrevent}>unProtect</button>
//         </div>
//     );
// };

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

