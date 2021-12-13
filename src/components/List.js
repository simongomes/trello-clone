import Task from "./Task";

const List = ({ item, index }) => {
  return (
    <div className="list-wrapper">
      <div className="list-header">
        <h4 className="list-title">{item.title}</h4>
      </div>
      <div className="tasks-wrapper">
        {item.tasks.map((task, index) => (
          <Task task={task} key={index} />
        ))}
      </div>
    </div>
  );
};

export default List;
