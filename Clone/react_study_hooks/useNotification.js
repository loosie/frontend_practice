// useNotification
// 크롬 알람이 실행되는 hook 
// https://developer.mozilla.org/ko/docs/Web/API/notification

export const useNotification = (title, options) => {
    if (!("Notification" in window)) {
        // window에서만 지원
        return;
    }
    const fireNotif = () => {
        if (Notification.permission !== "granted") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    new Notification(title, options);
                } else {
                    return;
                }
            });
        } else {
            new Notification(title, options);
        }
    };
    return fireNotif;
};


// ex
// import ReactDOM from "react-dom";

// const useNotification = (title, options) => {
//     if (!("Notification" in window)) {
//         // window에서만 지원
//         return;
//     }
//     const fireNotif = () => {
//         if (Notification.permission !== "granted") {
//             Notification.requestPermission().then((permission) => {
//                 if (permission === "granted") {
//                     new Notification(title, options);
//                 } else {
//                     return;
//                 }
//             });
//         } else {
//             new Notification(title, options);
//         }
//     };
//     return fireNotif;
// };
// const App = () => {
//     const tirggerNotif = useNotification("hi it's notinoti!", {
//         body: "this is body part"
//     });
//     return (
//         <div className="App">
//             <button onClick={tirggerNotif}>Hello </button>
//         </div>
//     );
// };

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
