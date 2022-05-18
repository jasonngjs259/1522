import React, { useState, useEffect } from "react";
import Bottle from "./Components/Bottle";
import countLiquidLayer from "./Constants";
import shuffle from "./Utils";

const Game = (props) => {
    const [bottles, setBottles] = useState([]);

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

        console.log(tempColor);

        for (let a = 0; a < newBottles.length; a++) {
            const colorArray = [];
            for (let b = 0; b < countLiquidLayer; b++) {
                colorArray.push(tempColor.shift());
            }
            newBottles[a] = { ...newBottles[a], color: colorArray };
        }

        setBottles(newBottles);
    }, [props.elem, props.colors]);

    // const shuffle = (array) => {
    //     const newArray = [];
    //     let currentIndex = array.length;
    //     let randomIndex = null;

    //     while (currentIndex !== 0) {
    //         randomIndex = Math.floor(Math.random() * currentIndex);
    //         currentIndex -= 1;

    //         newArray.push(array[randomIndex]);

    //         array.splice(randomIndex, 1);
    //     }

    //     for (let i = 0; i < newArray.length; i++) {
    //         array.push(newArray[i]);
    //     }

    //     // console.log(array);

    //     return array;
    // };

    //water sort logic
    let clicked = [];
    let transferColorArray = [];

    const replaceColorArray = (colorArray, newBottles) => {
        console.log(newBottles);
        newBottles[colorArray[0]] = {
            ...newBottles[colorArray[0]],
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

    const handleBottle1 = (array, holdColor) => {
        let countColor = 1;
        let color = null;
        let startPoint = null;
        const emptyBottle = [
            "transparent",
            "transparent",
            "transparent",
            "transparent",
        ];

        for (let n = 0; n < array.length; n++) {
            if (array[n] !== "transparent" || array !== emptyBottle) {
                color = array[n];
            } else {
                continue;
            }

            if (startPoint === null && color !== "transparent") {
                startPoint = n;
            }

            if (array[n] === array[n + 1]) {
                countColor += 1;
            } else {
                array.splice(startPoint, countColor);

                for (let p = 0; p < countColor; p++) {
                    holdColor.push(color);
                    array.unshift("transparent");
                }
                break;
            }
        }
    };

    const handleBottle2 = (transfer, array, holdColor, tempColorArray) => {
        console.log(holdColor);
        for (let i = array.length - 1; i >= 0; i--) {
            if (holdColor.length !== 0 && array[i] === "transparent") {
                tempColorArray.push(holdColor.shift());
            } else if (holdColor.length === 0 && array[i] === "transparent") {
                tempColorArray.push("transparent");
            } else {
                tempColorArray.push(array[i]);
            }
        }
    };

    const liquidIncrease = () => {};

    const transferAnimation = (clicked) => {
        let selectedElement1 =
            document.getElementsByClassName("bottle")[clicked[0]];
        let selectedElement2 =
            document.getElementsByClassName("bottle")[clicked[1]];
        const tempTop = parseInt(selectedElement1.style.top);
        const tempLeft = parseInt(selectedElement1.style.left);

        setTimeout(() => {
            selectedElement1.style.zIndex = 10;
            selectedElement1.style.top = `${
                parseInt(selectedElement2.style.top) - 10
            }%`;
            selectedElement1.style.left = `${
                parseInt(selectedElement2.style.left) - 5.5
            }%`;
        }, 0);

        setTimeout(() => {
            selectedElement1.style.transform = "rotate(75deg)";
        }, 1000);

        setTimeout(() => {
            selectedElement1.style.transform = "rotate(90deg)";
        }, 2000);

        setTimeout(() => {
            selectedElement1.style.top = `${tempTop}%`;
            selectedElement1.style.left = `${tempLeft}%`;
            selectedElement1.style.transform = "rotate(0deg)";
            selectedElement1.style.zIndex = 0;
        }, 3000);
    };

    const transferLiquid = (clicked, transferColorArray, newBottles) => {
        const holdColor = [];
        const transfer = false;

        handleBottle1(transferColorArray[0], holdColor);
        const newColorArray1 = [clicked[0], transferColorArray[0]];

        const tempColorArray = [];
        handleBottle2(
            transfer,
            transferColorArray[1],
            holdColor,
            tempColorArray
        );

        const newColorArray2 = [clicked[1], tempColorArray.reverse()];

        replaceColorArray(newColorArray1, newBottles);
        replaceColorArray(newColorArray2, newBottles);

        // if (transfer) {
        //     replaceColorArray(newColorArray1, newBottles);
        //     replaceColorArray(newColorArray2, newBottles);
        // }
    };

    const clickBottle = (data) => {
        const newBottles = [...bottles];
        console.log(data.color);
        if (clicked.length === 0) {
            clicked.push(data.id);
            transferColorArray.push(data.color);
            let selectedElement =
                document.getElementsByClassName("bottle")[data.id];
            selectedElement.style.transition = "0.2s linear";
            selectedElement.style.transform = "scale(1.08)";
        } else {
            clicked.push(data.id);
            transferColorArray.push(data.color);
            let selectedElement =
                document.getElementsByClassName("bottle")[clicked[0]];
            selectedElement.style.transform = "scale(1)";
            if (clicked[0] !== clicked[1]) {
                selectedElement.style.transition = "1s linear";
                // transferAnimation(clicked);
                transferLiquid(clicked, transferColorArray, newBottles);
                setBottles(newBottles);
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
                    clickBottle={() => clickBottle(data)}
                />
                // <Bottle
                //     key={data.id}
                //     top={data.top}
                //     left={data.left}
                //     color={data.color}
                // />
            ))}
        </>
    );
};

export default Game;
