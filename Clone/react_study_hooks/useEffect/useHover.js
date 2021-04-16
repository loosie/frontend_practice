// useHover
// useClick과 작동방식 동일
// 어떤 태그에 마우스 오버하면 설정한 이벤트를 실행시키는 hook
// onHover : 마우스 오버시 발생하는 이벤트 

export const useHover = (onHover) => {
    if (typeof onHover !== "function") {
        return;
    }
    const element = useRef();
    useEffect(() => {
        if (element.current) {
            element.current.addEventListener("mouseenter", onHover);
        }
        return () => {
            // componentWillUmount
            if (element.current) {
                element.current.removeEventListener("mouseenter", onHover);
            }
        };
    }, []);
    return element;
};


