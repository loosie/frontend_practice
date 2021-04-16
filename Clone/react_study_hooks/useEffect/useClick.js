// useClick
// 어떤 태그를 클릭하면 설정한 이벤트를 실행시키는 hook
// onClick : 클릭시 발생하는 이벤트 

export const useClick = (onClick) => {
    if (typeof onClick !== "function") {
        return;
    }
    const element = useRef();
    useEffect(() => {
        if (element.current) {
            element.current.addEventListener("click", onClick);
        }
        return () => {
            // componentWillUmount
            if (element.current) {
                element.current.removeEventListener("click", onClick);
            }
        };
    }, []);
    return element;
};


// ex 
// import { useEffect, useRef } from "react";
// import ReactDOM from "react-dom";

// const useClick = (onClick) => {
//   if (typeof onClick !== "function") {
//     return;
//   }
//   const element = useRef();
//   useEffect(() => {
//     if (element.current) {
//       element.current.addEventListener("click", onClick);
//     }
//     return () => {
//       // componentWillUmount
//       if (element.current) {
//         element.current.removeEventListener("click", onClick);
//       }
//     };
//   }, []);
//   return element;
// };

// const App = () => {
//   const sayHello = () => console.log("say hello");

//   const title = useClick(sayHello);

//   return (
//     <div className="App">
//       <h1 ref={title}>Hello CodeSandbox</h1>
//     </div>
//   );
// };

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
