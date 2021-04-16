// useTabs 
// button tab하면 그에 맞는 데이터를 보여주는 hook
// allTabs : 데이터를 담은 배열


const useTabs = (initialTab, allTabs) => {
    const [currentIndex, setCurrentIndex] = useState(initialTab);

    if (!allTabs || !Array.isArray(allTabs)) {
        return;
    }

    return {
        currentItem: allTabs[currentIndex],
        changeItem: setCurrentIndex
    };
};


// ex
// import { useState } from "react";
// import ReactDOM from "react-dom";

// const content = [
//   {
//     tab: "Section 1",
//     content: "I'm the content of the Section1"
//   },
//   {
//     tab: "Section 2",
//     content: "I'm the content of the Section2"
//   },
//   {
//     tab: "Section 3",
//     content: "I'm the content of the Section3"
//   }
// ];

// const useTabs = (initialTab, allTabs) => {
//   const [currentIndex, setCurrentIndex] = useState(initialTab);

//   if (!allTabs || !Array.isArray(allTabs)) {
//     return;
//   }

//   return {
//     currentItem: allTabs[currentIndex],
//     changeItem: setCurrentIndex
//   };
// };
// const App = () => {
//   const { currentItem, changeItem } = useTabs(0, content);

//   return (
//     <div className="App">
//       <h1>Hello CodeSandbox</h1>
//       {content.map((section, index) => (
//         <button onClick={() => changeItem(index)}>{section.tab}</button>
//       ))}

//       <div>{currentItem.content}</div>
//     </div>
//   );
// };

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
