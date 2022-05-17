import React from "react";

const Color = (props) => {
    return (
        <div
            className="color"
            style={{ backgroundColor: props.color, top: `${props.top}%` }}
        />
    );
};

export default Color;
