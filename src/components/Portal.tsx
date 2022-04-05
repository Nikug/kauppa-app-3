import ReactDOM from "react-dom";

interface Props {
  children?: React.ReactNode;
}

export const Portal = (props: Props) => {
  return ReactDOM.createPortal(props.children, document.body);
};
