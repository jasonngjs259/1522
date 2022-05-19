import React, { useState, useEffect } from "react";
import Bottle from "./Components/Bottle";
import countLiquidLayer from "./Constants";
import shuffle from "./Utils";

const Game = (props) => {
    const [bottles, setBottles] = useState([]);
    const [restartData, setRestartData] = useState([]);

    // const newTempColor = [];
    // setBottles(newBottles);

    useEffect(() => {
        const newBottles = [...props.elem.bottles];
        const tempColor = [];

        for (let i = 0; i < props.elem.colorCount; i++) {
            for (let j = 0; j < countLiquidLayer; j++) {
                tempColor.push(props.colors[i]);
            }
        }

        shuffle(tempColor);

        for (
            let n = 0;
            n < (newBottles.length - props.elem.colorCount) * countLiquidLayer;
            n++
        ) {
            tempColor.push("transparent");
        }

        for (let a = 0; a < newBottles.length; a++) {
            const colorArray = [];
            for (let b = 0; b < countLiquidLayer; b++) {
                colorArray.push(tempColor.shift());
            }
            newBottles[a] = { ...newBottles[a], color: colorArray };
        }

        setBottles(newBottles);
        setRestartData(newBottles);
    }, [props.elem, props.colors]);

    // useEffect(() => {
    //     console.log(restartData);
    // }, [restartData]);

    //restart button
    const handleRestart = () => {
        const newData = [...restartData];
        setBottles(newData);
    };

    //water sort logic
    let clicked = [];
    let transferColorArray = [];

    const replaceColorArray = (colorArray, newBottle) => {
        // console.log(newBottles);
        newBottle[colorArray[0]] = {
            ...newBottle[colorArray[0]],
            color: colorArray[1],
        };
        // newBottles.forEach((elem) => {
        //     if (colorArray[0] === elem.id) {
        //         elem.color = colorArray[1];
        //     }
        // });
        // if (colorArray[0] === data.id) {
        //     console.log(newBottles);

        // }
    };

    // const handleBottle1 = (array, holdColor) => {
    //     let countColor = 1;
    //     let color = null;
    //     let startPoint = null;
    //     const emptyBottle = [
    //         "transparent",
    //         "transparent",
    //         "transparent",
    //         "transparent",
    //     ];

    //     for (let n = 0; n < array.length; n++) {
    //         if (array[n] !== "transparent") {
    //             color = array[n];
    //         } else {
    //             continue;
    //         }

    //         if (startPoint === null && color !== "transparent") {
    //             startPoint = n;
    //         }

    //         if (array[n] === array[n + 1]) {
    //             countColor += 1;
    //         } else {
    //             array.splice(startPoint, countColor);

    //             for (let p = 0; p < countColor; p++) {
    //                 holdColor.push(color);
    //                 array.unshift("transparent");
    //             }
    //             break;
    //         }
    //     }
    // };

    // const handleBottle2 = (array, holdColor, tempColorArray) => {
    //     // console.log(holdColor);
    //     for (let i = array.length - 1; i >= 0; i--) {
    //         if (holdColor.length !== 0 && array[i] === "transparent") {
    //             tempColorArray.push(holdColor.shift());
    //         } else if (holdColor.length === 0 && array[i] === "transparent") {
    //             tempColorArray.push("transparent");
    //         } else {
    //             tempColorArray.push(array[i]);
    //         }
    //     }
    // };

    // const transferAnimation = (clicked) => {
    //     let selectedElement1 =
    //         document.getElementsByClassName("bottle")[clicked[0]];
    //     let selectedElement2 =
    //         document.getElementsByClassName("bottle")[clicked[1]];
    //     const tempTop = parseInt(selectedElement1.style.top);
    //     const tempLeft = parseInt(selectedElement1.style.left);

    //     console.log(selectedElement1.style.top);
    //     console.log(tempTop);

    //     setTimeout(() => {
    //         selectedElement1.style.zIndex = 100;
    //         selectedElement1.style.top = `${
    //             parseInt(selectedElement2.style.top) - 10
    //         }%`;

    //         console.log(selectedElement1.style.top);
    //         selectedElement1.style.left = `${
    //             parseInt(selectedElement2.style.left) - 5.5
    //         }%`;
    //     }, 0);

    //     setTimeout(() => {
    //         selectedElement1.style.transform = "rotate(75deg)";
    //     }, 1000);

    //     setTimeout(() => {
    //         selectedElement1.style.transform = "rotate(90deg)";
    //     }, 2000);

    //     setTimeout(() => {
    //         selectedElement1.style.top = `${tempTop}%`;
    //         selectedElement1.style.left = `${tempLeft}%`;
    //         selectedElement1.style.transform = "rotate(0deg)";
    //         selectedElement1.style.zIndex = 0;
    //     }, 3000);
    // };

    const validateTransfer = (transferColorArray, transfer) => {
        let countTransparent = 0;

        let countColor = 1;
        let color = null;
        let startPoint = null;

        for (let i = 0; i < transferColorArray[1].length; i++) {
            if (transferColorArray[1][i] === "transparent") {
                countTransparent += 1;
            }
        }

        for (let n = 0; n < transferColorArray[0].length; n++) {
            if (transferColorArray[0][n] !== "transparent") {
                color = transferColorArray[0][n];
            } else {
                continue;
            }

            if (startPoint === null && color !== "transparent") {
                startPoint = n;
            }

            if (transferColorArray[0][n] === transferColorArray[0][n + 1]) {
                countColor += 1;
            } else {
                break;
            }
        }

        if (countColor <= countTransparent) {
            transfer = true;
        } else if (countColor > countTransparent) {
            countColor = countTransparent;
            transfer = true;
        }

        console.log(transfer);
    };

    // const handleBottle = (transferColorArray, tempColorArray) => {
    //     const holdColor = [];
    //     let color = null;
    //     let countColor = 1;
    //     let startPoint = null;
    //     // const emptyBottle = [
    //     //     "transparent",
    //     //     "transparent",
    //     //     "transparent",
    //     //     "transparent",
    //     // ];

    //     for (let n = 0; n < transferColorArray[0].length; n++) {
    //         if (transferColorArray[0][n] !== "transparent") {
    //             color = transferColorArray[0][n];
    //         } else {
    //             continue;
    //         }

    //         if (startPoint === null && color !== "transparent") {
    //             startPoint = n;
    //         }

    //         if (transferColorArray[0][n] === transferColorArray[0][n + 1]) {
    //             countColor += 1;
    //         } else {
    //             transferColorArray[0].splice(startPoint, countColor);

    //             for (let p = 0; p < countColor; p++) {
    //                 holdColor.push(color);
    //                 transferColorArray[0].unshift("transparent");
    //             }
    //             break;
    //         }
    //     }

    //     console.log(transferColorArray[0]);

    //     console.log(holdColor);

    //     for (let i = transferColorArray[1].length - 1; i >= 0; i--) {
    //         if (
    //             holdColor.length !== 0 &&
    //             transferColorArray[1][i] === "transparent"
    //         ) {
    //             tempColorArray.push(holdColor.shift());
    //         } else if (
    //             holdColor.length === 0 &&
    //             transferColorArray[1][i] === "transparent"
    //         ) {
    //             tempColorArray.push("transparent");
    //         } else {
    //             tempColorArray.push(transferColorArray[1][i]);
    //         }
    //     }

    // for (let i = transferColorArray[1].length - 1; i >= 0; i--) {
    //     if (
    //         holdColor.length !== 0 &&
    //         transferColorArray[1] === "transparent"
    //     ) {
    //         tempColorArray.push(holdColor.shift());
    //     } else if (
    //         holdColor.length === 0 &&
    //         transferColorArray[1] === "transparent"
    //     ) {
    //         tempColorArray.push("transparent");
    //     } else {
    //         tempColorArray.push(transferColorArray[1][i]);
    //     }
    // }

    //     console.log(tempColorArray);
    // };

    const transferLiquid = (clicked, transferColorArray, newBottles) => {
        const tempColorArray = [];

        let transfer = false;

        // validateTransfer(transferColorArray, transfer);

        let countTransparent = 0;

        let countColor = 1;

        for (let i = 0; i < transferColorArray[1].length; i++) {
            if (transferColorArray[1][i] === "transparent") {
                countTransparent += 1;
            }
        }

        console.log(countTransparent);

        for (let n = 0; n < transferColorArray[0].length; n++) {
            if (
                transferColorArray[0][n] !== "transparent" &&
                transferColorArray[0][n] === transferColorArray[0][n + 1]
            ) {
                console.log(n);
                countColor += 1;
            } else if (transferColorArray[0][n] === "transparent") {
                continue;
            } else {
                break;
            }
        }

        console.log(countColor);

        if (countColor <= countTransparent) {
            transfer = true;
        } else if (countColor > countTransparent && countTransparent !== 0) {
            countColor = countTransparent;
            transfer = true;
        } else if (countTransparent === 0) {
            transfer = false;
        }

        console.log(transfer);

        if (transfer) {
            // handleBottle(transferColorArray, tempColorArray);
            // console.log(tempColorArray);
            const holdColor = [];
            let color = null;
            let startPoint = null;

            for (let n = 0; n < transferColorArray[0].length; n++) {
                if (
                    startPoint === null &&
                    transferColorArray[0][n] !== "transparent"
                ) {
                    color = transferColorArray[0][n];
                    startPoint = n;
                } else {
                    continue;
                }

                // if (startPoint === null && color !== "transparent") {
                //     startPoint = n;
                // }

                transferColorArray[0].splice(startPoint, countColor);

                for (let p = 0; p < countColor; p++) {
                    holdColor.push(color);
                    transferColorArray[0].unshift("transparent");
                }
                break;
            }

            console.log(holdColor);

            for (let i = transferColorArray[1].length - 1; i >= 0; i--) {
                if (
                    transferColorArray[1][i - 1] === "transparent" &&
                    transferColorArray[1][i] !== "transparent" &&
                    i - 1 !== 0
                ) {
                    if (holdColor[0] !== transferColorArray[1][i]) {
                        console.log(holdColor[0]);
                        transfer = false;
                        console.log(transfer);
                        break;
                    }
                }

                if (transfer) {
                    if (
                        holdColor.length !== 0 &&
                        transferColorArray[1][i] === "transparent"
                    ) {
                        tempColorArray.push(holdColor.shift());
                    } else if (
                        holdColor.length === 0 &&
                        transferColorArray[1][i] === "transparent"
                    ) {
                        tempColorArray.push("transparent");
                    } else {
                        tempColorArray.push(transferColorArray[1][i]);
                    }
                }
            }
            console.log(tempColorArray);

            if (transfer) {
                const newColorArray1 = [clicked[0], transferColorArray[0]];
                const newColorArray2 = [clicked[1], tempColorArray.reverse()];

                replaceColorArray(newColorArray1, newBottles);
                replaceColorArray(newColorArray2, newBottles);
            }
        }

        // handleBottle1(transferColorArray[0], holdColor);
        // const newColorArray1 = [clicked[0], transferColorArray[0]];

        // const tempColorArray = [];
        // handleBottle2(
        //     transfer,
        //     transferColorArray[1],
        //     holdColor,
        //     tempColorArray
        // );

        // const newColorArray2 = [clicked[1], tempColorArray.reverse()];

        // if (transfer) {
        //     replaceColorArray(newColorArray1, newBottles);
        //     replaceColorArray(newColorArray2, newBottles);
        // }
    };

    // const transferLiquid = (clicked, transferColorArray, newBottles) => {
    //     const holdColor = [];
    //     const transfer = false;

    //     handleBottle1(transferColorArray[0], holdColor);
    //     const newColorArray1 = [clicked[0], transferColorArray[0]];

    //     const tempColorArray = [];
    //     handleBottle2(transferColorArray[1], holdColor, tempColorArray);

    //     const newColorArray2 = [clicked[1], tempColorArray.reverse()];

    //     replaceColorArray(newColorArray1, newBottles);
    //     replaceColorArray(newColorArray2, newBottles);

    //     // if (transfer) {
    //     //     replaceColorArray(newColorArray1, newBottles);
    //     //     replaceColorArray(newColorArray2, newBottles);
    //     // }
    // };

    const clickBottle = (id, color) => {
        const newBottleArray = [...bottles];
        // console.log(data.color);
        if (clicked.length === 0) {
            clicked.push(id);
            transferColorArray.push([...color]);
            let selectedElement = document.getElementsByClassName("bottle")[id];
            selectedElement.style.transition = "0.2s linear";
            selectedElement.style.transform = "scale(1.08)";
        } else {
            clicked.push(id);
            transferColorArray.push([...color]);
            let selectedElement =
                document.getElementsByClassName("bottle")[clicked[0]];
            selectedElement.style.transform = "scale(1)";
            if (clicked[0] !== clicked[1]) {
                selectedElement.style.transition = "1s linear";
                // console.log(transferColorArray);
                // transferAnimation(clicked);
                transferLiquid(clicked, transferColorArray, newBottleArray);
                setBottles(newBottleArray);
            } else {
                selectedElement.style.transition = "0.2s linear";
            }

            clicked = [];
            transferColorArray = [];
        }
    };

    return (
        <>
            {bottles.map((data) => (
                <Bottle
                    key={data.id}
                    top={data.top}
                    left={data.left}
                    color={data.color}
                    clickBottle={() => clickBottle(data.id, data.color)}
                />
                // <Bottle
                //     key={data.id}
                //     top={data.top}
                //     left={data.left}
                //     color={data.color}
                // />
            ))}
            <div className="restart-area">
                <button onClick={handleRestart}>Restart</button>
            </div>
            <div className="count-move-area">
                <h4>Moves:</h4>
            </div>
        </>
    );
};

export default Game;
