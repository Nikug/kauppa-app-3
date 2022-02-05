import { useSelector } from "react-redux";
import { getGroups } from "./redux/appSlice";
import { Groupview } from "./views/GroupView";

function App() {
  const groups = useSelector(getGroups);
  return (
    <div>
      {groups.map((group) => (
        <Groupview key={group.id} group={group} />
      ))}
    </div>
  );
}

export default App;
