import React from "react";
import Color from "./Color";

const Bottle = (props) => {
    const initTop = 20;
    const height = 20;

    return (
        <div
            className="bottle"
            style={{ top: props.top, left: props.left }}
            onClick={props.clickBottle}
        >
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
