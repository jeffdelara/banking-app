import React from "react";

export const ActionButtons = () => {
    return (
      <div id="actions">
        <ActionButton icon="bx bx-money" text="Deposit" />
        <ActionButton icon="bx bx-log-out-circle" text="Withdraw" />
        <ActionButton icon="bx bx-transfer" text="Transfer" />
      </div>
    )
  }
  
export const ActionButton = (props) => {
    const {icon, text} = props
    return (
      <button><i className={icon} ></i> {text}</button>
    )
  }
