// useScroll
// 유저가 스크롤해서 무언가를 지나쳤을 때 속성(색상이나 폰트크기 등)을 수정하는 hook

export const useScroll = () => {
    const [state, setState] = useState({
        x: 0,
        y: 0
    });

    const onScroll = () => {
        setState({ y: window.scrollY, x: window.scrollX });
        console.log("y", window.scrollY, ", x ", window.scrollX);
    };

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return state;
};


// ex 
// import { useEffect, useState } from "react";
// import ReactDOM from "react-dom";

// const useScroll = () => {
//     const [state, setState] = useState({
//         x: 0,
//         y: 0
//     });

//     const onScroll = () => {
//         setState({ y: window.scrollY, x: window.scrollX });
//         console.log("y", window.scrollY, ", x ", window.scrollX);
//     };

//     useEffect(() => {
//         window.addEventListener("scroll", onScroll);
//         return () => window.removeEventListener("scroll", onScroll);
//     }, []);
//     return state;
// };

// const App = () => {
//     const { y } = useScroll();
//     return (
//         <div className="App" style={{ height: "1000vh" }}>
//             <h1 style={{ position: "fixed", color: y > 100 ? "red" : "blue" }}>Hi</h1>
//         </div>
//     );
// };

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
