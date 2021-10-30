import React from 'react';
import { Logo } from './Logo';

export const Sidebar = (props) => {
    const { user, logoutHandler, changePage } = props;
    let menu = null;

    // not regular user but an admin
    if(!user) {
        menu = <SideMenu changePage={changePage} logoutHandler={logoutHandler} />;
    }

    // regular user
    if(user) {
        menu = <ClientMenu changePage={changePage} logoutHandler={logoutHandler} />
    }

    return(
        <section id="side-menu">
            <Logo />
            {menu}
        </section>
    )
}

export const ClientMenu = (props) => {
    const {changePage, logoutHandler} = props;

    return (
        <ul>
            <SideLink onClickHandler={changePage} page="home" icon="bx bx-home" text="Home" />
            <SideLink onClickHandler={changePage} page="budget" icon="bx bx-money" text="Budget App" />
            <SideLink onClickHandler={changePage} page="transfer" icon="bx bx-transfer" text="Fund Transfer" />
            <SideLink onClickHandler={logoutHandler} icon="bx bx-log-out" text="Logout" />
        </ul>
    )
}
  
export const SideMenu = (props) => {
    const {changePage, logoutHandler} = props;
    return (
        <ul>
            <SideLink onClickHandler={changePage} page="home" icon="bx bx-home" text="Home" />
            <SideLink onClickHandler={changePage} page="create-account" icon="bx bx-user-pin" text="Create Account" />
            <SideLink onClickHandler={changePage} page="transfer" icon="bx bx-transfer" text="Fund Transfer" />
            <SideLink onClickHandler={changePage} page="deposit" icon="bx bx-money" text="Deposit" />
            <SideLink onClickHandler={changePage} page="withdraw" icon="bx bx-log-out-circle" text="Withdraw" />
            <SideLink onClickHandler={logoutHandler} icon="bx bx-log-out" text="Logout" />
        </ul>
    )
}
  
export const SideLink = (props) => {
    const {icon, text, page} = props;
    
    function clickLink(event) {
        if(page) {
            event.preventDefault();
            props.onClickHandler(page);
        } else {
            event.preventDefault();
            props.onClickHandler();
        }
    }

    return (
        <li><a onClick={clickLink} href="#"><i className={icon} ></i> {text}</a></li>
    )
}
