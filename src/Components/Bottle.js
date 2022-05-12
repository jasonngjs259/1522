import React from "react";

const Bottle = (props) => {
    // const colors = [
    //     { id: 1, color: "red" },
    //     { id: 2, color: "orange" },
    //     { id: 3, color: "blue" },
    //     { id: 4, color: "purple" },
    //     { id: 5, color: "limegreen" },
    // ];

    return (
        <div className="bottle" style={{ top: props.top, left: props.left }}>
            <div className="bottleCap" />
            <div className="bottleBody">
                <div
                    className="color"
                    style={{ backgroundColor: props.color[0], top: "2.5vh" }}
                />
                <div
                    className="color"
                    style={{ backgroundColor: props.color[1], top: "5vh" }}
                />
                <div
                    className="color"
                    style={{ backgroundColor: props.color[2], top: "7.5vh" }}
                />
                <div
                    className="color"
                    style={{ backgroundColor: props.color[3], top: "10vh" }}
                />
            </div>
        </div>
    );
};

export default Bottle;
