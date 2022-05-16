import React from "react";
import Color from "./Color";

const Bottle = (props) => {
    const initTop = 2.5;
    const height = 2.5;

    return (
        <div className="bottle" style={{ top: props.top, left: props.left }}>
            <div className="bottleCap" />
            <div className="bottleBody">
                {props.color.map((elem, i) => {
                    return (
                        <Color
                            key={i}
                            color={elem}
                            top={initTop + i * height}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Bottle;
