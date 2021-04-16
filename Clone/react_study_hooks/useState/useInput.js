// useInput
// input태그에 입력을 넣어주는 hook
// validator : 입력 데이터를 크기 제한, 입력 제한 등 설정하는 로직 
export const useInput = (initialValue, validator) => {
    const [value, setValue] = useState(initialValue);

    const onChange = (event) => {
        const {
            target: { value }
        } = event;
        let willUpdate = true;
        if (typeof validator === "function") {
            willUpdate = validator(value);
        }

        if (willUpdate) {
            setValue(value);
        }
    };

    return { value, onChange };
};




// ex
// import { useState } from "react";
// import ReactDOM from "react-dom";
// 
// const useInput = (initialValue, validator) => {
//     const [value, setValue] = useState(initialValue);
// 
//     const onChange = (event) => {
//         const {
//             target: { value }
//         } = event;
//         let willUpdate = true;
//         if (typeof validator === "function") {
//             willUpdate = validator(value);
//         }

//         if (willUpdate) {
//             setValue(value);
//         }
//     };

//     return { value, onChange };
// };
// 
// const App = () => {
// const maxLen = (value) => value.length <= 10;
//   const name = useInput("Mr.", maxLen);
//   return (
//     <div className="App">
//       <h1>Hello CodeSandbox</h1>
//       <input placeholder="Name" {...name} />
//     </div>
//   );
// };

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);