import { FC } from "react";

import TopMenu from "../../components/TopMenu/TopMenu";

const Empty: FC = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ maxWidth: "20vw" }}>
        <TopMenu />
      </div>
    </div>
  );
};

export default Empty;
