// useFadeIn
// 어떤 element를 서서히 나타나게 하는(fade in) hook

// duration : 밝아지는데 걸리는 시간
// delay : 나타나기 시작하는 시간
export const useFadeIn = (duration = 1, delay = 0) => {
    if (typeof duration !== "number" || typeof delay !== "number") {
        return;
    }

    const element = useRef();

    useEffect(() => {
        if (element.current) {
            const { current } = element;
            current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
            current.style.opacity = 1;
        }
    }, []);
    return { ref: element, style: { opacity: 0 } };
};




// ex
// import { useEffect, useRef } from "react";
// import ReactDOM from "react-dom";

// duration : 밝아지는데 걸리는 시간
// delay : 나타나기 시작하는 시간
// const useFadeIn = (duration = 1, delay = 0) => {
//     if (typeof duration !== "number" || typeof delay !== "number") {
//         return;
//     }

//     const element = useRef();

//     useEffect(() => {
//         if (element.current) {
//             const { current } = element;
//             current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
//             current.style.opacity = 1;
//         }
//     }, []);
//     return { ref: element, style: { opacity: 0 } };
// };
// const App = () => {
//     const fadeInH1 = useFadeIn(1, 2);
//     const fadeInP = useFadeIn(5, 10);
//     return (
//         <div className="App">
//             <h1 {...fadeInH1}>Hello</h1>
//             <p {...fadeInP}>lorem ipsum slalal</p>
//         </div>
//     );
// };

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
