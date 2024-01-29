import React, { useEffect, useState } from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Box({ children, times, baseColor }) {
  const childs = new Array(times).fill(-1);

  return (
    <>
      {childs.map((index) => (
        <div
          style={{
            border: `1px solid ${baseColor}`,
            borderRadius: "10px",
            display: "block",
            lineHeight: 2,
            padding: "1rem",
            marginBottom: "0.5rem",
            width: "25%",
            marginRight: "0.5rem",
            marginLeft: "0.5rem",
          }}
          key={index}
        >
          {children}
        </div>
      ))}
    </>
  );
}

function ProfileSkeleton() {
  const [baseColor, setBaseColor] = useState("");
  const [highLightColor, setHighLightColor] = useState("");

  useEffect(() => {
    const userState = JSON.parse(window.localStorage.getItem("state"));
    if (userState?.checked) {
      setBaseColor("#202020");
      setHighLightColor("#444");
    } else {
      setBaseColor("");
      setHighLightColor("");
    }
  }, []);

  return (
    <section style={{ margin: "15px" }}>
      <SkeletonTheme baseColor={baseColor} highlightColor={highLightColor}>
        <div style={{ display: "flex", gap: 20 }}>
          <div style={{ width: "180px" }}>
            <Skeleton circle height="180px" width="180px" />
          </div>
          <div style={{ width: "180px", position: "relative", top: "100px" }}>
            <Skeleton />
            <Skeleton width="150px" />
            <Skeleton width="100px" />
          </div>
        </div>
        <p style={{ marginTop: "10px" }}>
          <Skeleton />
        </p>
        <p style={{ marginTop: "20px" }}>
          <div style={{ display: "flex" }}>
            <Box times={4} baseColor={baseColor || "#EBEBEB"}>
              <Skeleton />
            </Box>
          </div>
        </p>
        <Skeleton count={3} />
      </SkeletonTheme>
    </section>
  );
}

export default ProfileSkeleton;
