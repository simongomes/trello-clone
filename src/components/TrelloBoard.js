import { useState } from "react";
import List from "./List";

const TrelloBoard = () => {
  const initialList = [
    {
      title: "Todo",
      tasks: [
        {
          title: "Task 1",
          description: "Short Description",
          labels: ["green", "yellow", "blue", "red"],
          members: [1],
        },
        {
          title: "Task 2",
          description: "Short Description",
          labels: ["green", "yellow", "blue", "red"],
          members: [0, 2],
        },
      ],
    },
    {
      title: "On Progress",
      tasks: [
        {
          title: "Task 3",
          description: "Short Description",
          labels: ["green", "yellow", "blue", "red"],
          members: [2],
        },
      ],
    },
  ];

  const [list, setList] = useState(initialList);
  const [renderKey, setRenderKey] = useState(0);

  const addNewCardHandler = (title, index) => {
    const newList = list;
    console.log(newList[index].tasks);
    newList[index].tasks = [
      ...newList[index].tasks,
      {
        title: title,
        description: "",
        labels: [],
        members: [],
      },
    ];

    setList(newList);
    setRenderKey(renderKey + 1);
  };

  const moveCardHandler = (cardIndex, listIndex, moveIndex) => {
    console.log(cardIndex, listIndex, moveIndex);
    const moveItem = list[listIndex].tasks[cardIndex];
    list[listIndex].tasks.splice(cardIndex, 1);
    list[moveIndex].tasks.push(moveItem);
    setRenderKey(renderKey + 1);
  };

  return (
    <>
      <div className="board-wrapper" key={renderKey}>
        {list &&
          list.map((item, index) => (
            <List
              items={list}
              item={item}
              index={index}
              key={index}
              addNewCardHandler={addNewCardHandler}
              moveCardHandler={moveCardHandler}
            />
          ))}
      </div>
    </>
  );
};

export default TrelloBoard;
