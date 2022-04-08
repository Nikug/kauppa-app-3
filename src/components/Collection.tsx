import { Link } from "react-router-dom";
import { TodoCollection } from "../types/todo";

interface Props {
  collection: TodoCollection;
  onSelect(collectionId: string): void;
}

export const Collection = (props: Props) => {
  const { collection, onSelect } = props;

  return (
    <div className="border bg-white p-4">
      <Link to={collection.url} onClick={() => onSelect(collection.id)}>
        <h2>{collection.name ?? <i>No name</i>}</h2>
        <p>{collection.url}</p>
      </Link>
    </div>
  );
};
