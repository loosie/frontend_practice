// useBeforeLeave
// (마우스가 페이지를 벗어날 때)탭을 닫을 때 실행되는 hook

export const useBeforeLeave = (onBefore) => {
    if (typeof onBefore !== "function") {
        return;
    }

    const handle = (event) => {
        const { clientY } = event;
        // mouse가 위로 벗어났을 때만
        if (clientY <= 0) {
            onBefore();
        }
    };
    useEffect(() => {
        document.addEventListener("mouseleave", handle);
        return () => document.removeEventListener("mouseleave", handle);
    });
};



// ex 
// import { useEffect } from "react";
// import ReactDOM from "react-dom";

// const useBeforeLeave = (onBefore) => {
//     if (typeof onBefore !== "function") {
//         return;
//     }

//     const handle = (event) => {
//         // console.log("leaving");
//         const { clientY } = event;
//         // console.log(event);
//         // mouse가 위로 벗어났을 때만
//         if (clientY <= 0) {
//             onBefore();
//         }
//     };
//     useEffect(() => {
//         document.addEventListener("mouseleave", handle);
//         return () => document.removeEventListener("mouseleave", handle);
//     });
// };
// const App = () => {
//     const begForLife = () => {
//         console.log("plz dont leave");
//     };
//     useBeforeLeave(begForLife);

//     return (
//         <div className="App">
//             <h1>Hello</h1>
//         </div>
//     );
// };

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
