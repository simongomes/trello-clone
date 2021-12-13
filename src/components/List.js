const List = ({ item }) => {
  return (
    <div className="list-wrapper">
      <div className="list-header">
        <h4 className="list-title">{item.title}</h4>
      </div>
    </div>
  );
};

export default List;
