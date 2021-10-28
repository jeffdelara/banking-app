import { Sidebar } from "./Sidebar";
import { MainContent } from "./MainContent";
import DATA from "../data";

export const Dashboard = (props) => {
    return (
      <main>
        <Sidebar logoutHandler={props.logoutHandler} />
        <MainContent users={DATA} />
      </main>
    )
  }
