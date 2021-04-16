// useFullScreen
// 이미지를 fullScreen으로 만들어주는 hook

export const useFullScreen = (callback) => {
    const element = useRef();
    const runCb = (isFull) => {
        if (callback && typeof callback === "function") {
            callback(isFull);
        }
    };
    const triggerFull = () => {
        if (element.current) {
            if (element.current.requestFullscreen) {
                element.current.requestFullscreen();
            } else if (element.current.mozRequestFullscreen) {
                // firefox
                element.current.mozRequestFullscreen();
            } else if (element.current.webkitRequestFullscreen) {
                // opera
                element.current.webkitRequestFullscreen();
            } else if (element.current.msRequestFullscreen) {
                // ms
                element.current.msRequestFullscreen();
            }

            runCb(true);
        }
    };

    const exitFull = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullscreen) {
            document.mozCancelFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.exitFullmsExitFullscreenscreen();
        }
        runCb(false);
    };

    return { element, triggerFull, exitFull };
};


// ex
// import { useRef } from "react";
// import ReactDOM from "react-dom";

// const useFullScreen = (callback) => {
//     const element = useRef();
//     const runCb = (isFull) => {
//         if (callback && typeof callback === "function") {
//             callback(isFull);
//         }
//     };
//     const triggerFull = () => {
//         if (element.current) {
//             if (element.current.requestFullscreen) {
//                 element.current.requestFullscreen();
//             } else if (element.current.mozRequestFullscreen) {
//                 // firefox
//                 element.current.mozRequestFullscreen();
//             } else if (element.current.webkitRequestFullscreen) {
//                 // opera
//                 element.current.webkitRequestFullscreen();
//             } else if (element.current.msRequestFullscreen) {
//                 // ms
//                 element.current.msRequestFullscreen();
//             }

//             runCb(true);
//         }
//     };

//     const exitFull = () => {
//         if (document.exitFullscreen) {
//             document.exitFullscreen();
//         } else if (document.mozCancelFullscreen) {
//             document.mozCancelFullscreen();
//         } else if (document.webkitExitFullscreen) {
//             document.webkitExitFullscreen();
//         } else if (document.msExitFullscreen) {
//             document.exitFullmsExitFullscreenscreen();
//         }
//         runCb(false);
//     };

//     return { element, triggerFull, exitFull };
// };
// const App = () => {
//     const onFullS = (isFull) => {
//         console.log(isFull ? "we are full" : "we are small");
//     };
//     const { element, triggerFull, exitFull } = useFullScreen(onFullS);
//     return (
//         <div className="App">
//             <div
//                 style={{
//                     padding: "50px",
//                     margin: "0 auto"
//                 }}
//                 ref={element}
//             >
//                 <img
//                     style={{
//                         width: "50%",
//                         height: "50%"
//                     }}
//                     src="https://i.pinimg.com/474x/3a/10/46/3a1046f79004e8953a2aa26138a53b4d.jpg"
//                 />
//                 <button onClick={exitFull}>Exit FullScreen</button>
//             </div>
//             <button onClick={triggerFull}>Make FullScreen</button>
//         </div>
//     );
// };

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
