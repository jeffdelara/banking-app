import React from 'react';
import { Logo } from './Logo';

export const Sidebar = (props) => {
    return(
        <section id="side-menu">
            <Logo />
            <SideMenu logoutHandler={props.logoutHandler} />          
        </section>
    )
}
  
export const SideMenu = (props) => {
    return (
        <ul>
            <SideLink icon="bx bx-home" text="Home" />
            <SideLink icon="bx bx-user-pin" text="Create Account" />
            <SideLink icon="bx bx-transfer" text="Transfer/Withdraw" />
            <SideLink logoutHandler={props.logoutHandler} icon="bx bx-log-out" text="Logout" />
        </ul>
    )
}
  
export const SideLink = (props) => {
    const {icon, text} = props;
    return (
        <li><a onClick={props.logoutHandler} href="#"><i className={icon} ></i> {text}</a></li>
    )
}
