import { useState } from "react";
import List from "./List";

const TrelloBoard = () => {
  const initialList = [
    {
      title: "To Do",
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
          members: [2],
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

  return (
    <>
      <div className="board-wrapper">
        {list && list.map((item) => <List item={item} />)}
      </div>
    </>
  );
};

export default TrelloBoard;
