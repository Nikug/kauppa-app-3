import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getGroups } from "./redux/appSlice";
import { getGroups as getApiGroups } from "./firebase/api";
import { Groupview } from "./views/GroupView";

function App() {
  const groups = useSelector(getGroups);

  useEffect(() => {
    getApiGroups("mainRoute");
  }, []);

  return (
    <div className="flex justify-center">
      {groups?.length > 0 && <Groupview key={groups[0].id} group={groups[0]} />}
    </div>
  );
}

export default App;
