import React from "react";

export const ActionButtons = () => {
    return (
      <div id="actions">
        <ActionButton icon="bx bx-transfer" text="Transfer Funds" />
        <ActionButton icon="bx bx-transfer" text="Withdraw Funds" />
      </div>
    )
  }
  
export const ActionButton = (props) => {
    const {icon, text} = props
    return (
      <button><i className={icon} ></i> {text}</button>
    )
  }
