import React from 'react';
import { Logo } from './Logo';

export const Sidebar = (props) => {
    const { user, logoutHandler, changePage, page } = props;
    let menu = null;

    // not regular user but an admin
    if(!user) {
        menu = <SideMenu changePage={changePage} page={page} logoutHandler={logoutHandler} />;
    }

    // regular user
    if(user) {
        menu = <ClientMenu changePage={changePage} page={page} logoutHandler={logoutHandler} />
    }

    return(
        <section id="side-menu">
            <Logo />
            {menu}
        </section>
    )
}

export const ClientMenu = (props) => {
    const {changePage, logoutHandler, page} = props;

    return (
        <ul>
            <SideLink onClickHandler={changePage} active={page} page="home" icon="bx bx-home" text="Home" />
            <SideLink onClickHandler={changePage} active={page} page="budget" icon="bx bx-money" text="Budget App" />
            <SideLink onClickHandler={changePage} active={page} page="transfer" icon="bx bx-transfer" text="Fund Transfer" />
            <SideLink onClickHandler={logoutHandler} active={page} icon="bx bx-log-out" text="Logout" />
        </ul>
    )
}
  
export const SideMenu = (props) => {
    const {changePage, logoutHandler, page} = props;
    return (
        <ul>
            <SideLink onClickHandler={changePage} active={page} page="home" icon="bx bx-home" text="Home" />
            <SideLink onClickHandler={changePage} active={page} page="create-account" icon="bx bx-user-pin" text="Create Account" />
            <SideLink onClickHandler={changePage} active={page} page="transfer" icon="bx bx-transfer" text="Fund Transfer" />
            <SideLink onClickHandler={changePage} active={page} page="deposit" icon="bx bx-money" text="Deposit" />
            <SideLink onClickHandler={changePage} active={page} page="withdraw" icon="bx bx-log-out-circle" text="Withdraw" />
            <SideLink onClickHandler={logoutHandler} active={page} icon="bx bx-log-out" text="Logout" />
        </ul>
    )
}
  
export const SideLink = (props) => {
    const {icon, text, page, active} = props;
    
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
        <li><a onClick={clickLink} className={ active === page ? 'active' : '' } href="#"><i className={icon} ></i> {text}</a></li>
    )
}
