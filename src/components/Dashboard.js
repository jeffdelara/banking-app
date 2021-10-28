import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { MainContent } from "./MainContent";
import DATA from "../data";

export const Dashboard = (props) => {
    const [page, setPage] = useState('home');

    const changePageHandler = (pageName) => {
        setPage(pageName);
    }

    if(page === 'home') {
        return (
            <main>
              <Sidebar changePage={changePageHandler} logoutHandler={props.logoutHandler} />
              <MainContent users={DATA} />
            </main>
        )
    }

    if(page === 'create-account') {
        return (
            <main>
              <Sidebar changePage={changePageHandler} logoutHandler={props.logoutHandler} />
              <h1>Create account</h1>
            </main>
        )
    }

    if(page === 'transfer') {
        return (
            <main>
              <Sidebar changePage={changePageHandler} logoutHandler={props.logoutHandler} />
              <h1>Transfer</h1>
            </main>
        )
    }
  }
