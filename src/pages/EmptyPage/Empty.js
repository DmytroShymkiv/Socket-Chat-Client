import React from "react";
import TopMenu from "../../components/TopMenu/TopMenu";

export default function Empty() {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ maxWidth: "20vw" }}>
        <TopMenu />
      </div>
    </div>
  );
}
