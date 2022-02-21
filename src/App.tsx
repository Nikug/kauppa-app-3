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
      {groups["main"] && (
        <Groupview key="main" groupId="main" group={groups["main"]} />
      )}
    </div>
  );
}

export default App;
