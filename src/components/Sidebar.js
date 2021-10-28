import React from 'react';
import { Logo } from './Logo';

export const Sidebar = (props) => {
    return(
        <section id="side-menu">
            <Logo />
            <SideMenu changePage={props.changePage} logoutHandler={props.logoutHandler} />          
        </section>
    )
}
  
export const SideMenu = (props) => {
    const clickHandler = () => {
        console.log("CLICK");
    }
    return (
        <ul>
            <SideLink onClickHandler={props.changePage} page="home" icon="bx bx-home" text="Home" />
            <SideLink onClickHandler={props.changePage} page="create-account" icon="bx bx-user-pin" text="Create Account" />
            <SideLink onClickHandler={props.changePage} page="transfer" icon="bx bx-transfer" text="Transfer/Withdraw" />
            <SideLink onClickHandler={props.logoutHandler} icon="bx bx-log-out" text="Logout" />
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
