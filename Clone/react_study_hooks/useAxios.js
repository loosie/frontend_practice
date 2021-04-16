// useAxios

// add Dependency : axios
// axios를 사용하여 http Requset를 하는 hook

export const useAxios = (opts, axiosInstance = defaultAxios) => {
    const [state, setState] = useState({
        loading: true,
        error: null,
        data: null
    });

    const [trigger, setTrigger] = useState(0);
    if (!opts.url) {
        return;
    }
    const refetch = () => {
        setState({ ...state, loading: true });
        setTrigger(Date.now());
    };
    useEffect(() => {
        axiosInstance(opts)
            .then((data) => {
                setState({
                    ...state,
                    loading: false,
                    data
                });
            })
            .catch((error) => {
                setState({ ...state, loading: false, error });
            });
    }, [trigger]);
    return { ...state, refetch };
};



// ex
// useAxios.js
// import defaultAxios from "axios";
// import { useEffect, useState } from "react";

// const useAxios = (opts, axiosInstance = defaultAxios) => {
//     const [state, setState] = useState({
//         loading: true,
//         error: null,
//         data: null
//     });

//     const [trigger, setTrigger] = useState(0);
//     if (!opts.url) {
//         return;
//     }
//     const refetch = () => {
//         setState({ ...state, loading: true });
//         setTrigger(Date.now());
//     };
//     useEffect(() => {
//         axiosInstance(opts)
//             .then((data) => {
//                 setState({
//                     ...state,
//                     loading: false,
//                     data
//                 });
//             })
//             .catch((error) => {
//                 setState({ ...state, loading: false, error });
//             });
//     }, [trigger]);
//     return { ...state, refetch };
// };
// 
// export default useAxios;

// app.js
// import ReactDOM from "react-dom";
// import useAxios from "./useAxios";

// const App = () => {
//     const { loading, error, data, refetch } = useAxios({
//         url: "https://yts.mx/api/v2/list_movies.json"
//     });

//     console.log(
//         `Loading: ${loading}\n Error: ${error}\n Data: ${JSON.stringify(data)}`
//     );

//     return (
//         <div className="App">
//             <h1>{data && data.status}</h1>
//             <h2>{loading && "Loading"}</h2>
//             <button onClick={refetch}>Refetch</button>
//         </div>
//     );
// };

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);





