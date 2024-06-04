import type { ReactElement } from 'react';
import { cloneElement } from "react";
import "./App.css";

interface IHOC {
  children: ReactElement & {ref: HTMLElement}
}

function HOC = ({children}: IHOC): ReactElement => {
return cloneElement(children, {...children.props})
}
function ChildElement = (): ReactNode => {
  return <p>I am a child element</p>
}
function App() {
  return (
    <HOC>
<ChildElement/>
      </HOC>
  );
}

export default App;
