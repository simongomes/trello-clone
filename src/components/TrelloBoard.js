import { useState } from "react";
import EditTask from "./EditTask";
import List from "./List";

const TrelloBoard = () => {
  const [enableAddList, setEnableAddList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const [enableEditTask, setEnableEditTask] = useState(false);

  const [editListIndex, setEditListIndex] = useState(null);
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [editItem, setEditItem] = useState({});

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
          labels: ["green", "yellow", "red"],
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
          labels: ["green", "blue", "red"],
          members: [2],
        },
      ],
    },
  ];

  const [list, setList] = useState(initialList);
  const [renderKey, setRenderKey] = useState(0);

  const addNewCardHandler = (title, index) => {
    const newList = list;
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
    const moveItem = list[listIndex].tasks[cardIndex];
    list[listIndex].tasks.splice(cardIndex, 1);
    list[moveIndex].tasks.push(moveItem);
    setRenderKey(renderKey + 1);
  };

  const addNewList = () => {
    const newList = list;
    const newListItem = {
      title: newListTitle,
      tasks: [],
    };
    newList.push(newListItem);
    setList(newList);
    setEnableAddList(false);
  };

  const removeListItem = (listIndex) => {
    const newList = list;
    newList.splice(listIndex, 1);
    setList(newList);
    setRenderKey(renderKey + 1);
  };

  const editCardHandler = (taskIndex, listIndex) => {
    setEditTaskIndex(taskIndex);
    setEditListIndex(listIndex);
    const editItem = list[listIndex].tasks[taskIndex];
    setEditItem(editItem);
    setEnableEditTask(true);
  };

  const updateTask = (updatedTask) => {
    const updatedList = list;
    updatedList[editListIndex].tasks[editTaskIndex] = updatedTask;
    setList(updatedList);
    setEnableEditTask(false);
    setRenderKey(renderKey + 1);
  };

  const closeEdit = () => {
    setEnableEditTask(false);
  };

  return (
    <div className="main-wrapper">
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
              removeListItem={removeListItem}
              editCardHandler={editCardHandler}
            />
          ))}
        <div className="add-list-wrapper">
          {!enableAddList && (
            <div
              className="add-list-button"
              onClick={() => setEnableAddList(true)}
            >
              + Add list
            </div>
          )}
          {enableAddList && (
            <div className="add-list-field">
              <input
                type="text"
                placeholder="Add list title"
                onInput={(e) => setNewListTitle(e.target.value)}
              />
              <button className="button button-primary" onClick={addNewList}>
                Add List
              </button>
              <button
                className="button button-secondary"
                onClick={() => setEnableAddList(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
      {enableEditTask && (
        <EditTask
          task={editItem}
          updateTask={updateTask}
          closeEdit={closeEdit}
        />
      )}
    </div>
  );
};

export default TrelloBoard;
