import React from "react"
import "./loader.css"

export default function Loader() {
  return (
    <div className="text-center" style={{ marginTop: 100 }}>
        <div className="lds-spinner">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
    </div>
  );
}
