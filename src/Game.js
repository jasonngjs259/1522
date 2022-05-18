import React from "react";
import Bottle from "./Components/Bottle";

const Game = (props) => {
    const colors = ["red", "orange", "blue", "limegreen", "purple"];
    // const [newBottles, setNewBottles] = useState();
    const countLiquidLayer = 4;
    const tempColor = [];
    const newTempColor = [];
    const newBottles = [];

    //water sort logic
    let clicked = [];
    let transferColorArray = [];

    // useEffect(() => {
    //     setNewBottles(props.elem.bottles);
    // }, [setNewBottles, props.elem.bottles]);

    const shuffle = (array, newArray) => {
        let currentIndex = array.length;
        let randomIndex = null;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            newArray.push(array[randomIndex]);

            array.splice(randomIndex, 1);
        }

        return newArray;
    };

    // const replaceColorArray = (data, colorArray) => {
    //     const tempColorArray = [];
    // };

    const replaceColorArray = (data, colorArray, newBottles) => {
        console.log(newBottles);
        newBottles.forEach((elem) => {
            if (colorArray[0] === elem.id) {
                console.log(newBottles.color);
            }
        });
        // if (colorArray[0] === data.id) {
        //     console.log(newBottles);

        // }
    };

    const handleBottle1 = (array, holdColor) => {
        let countColor = 1;
        let color = null;

        for (let n = 0; n < array.length; n++) {
            if (
                (array[n] === "transparent" &&
                    array[n + 1] !== "transparent") ||
                array[0] !== "transparent"
            ) {
                color = array[n];
            }

            if (array[n] === array[n + 1]) {
                countColor += 1;
            } else {
                array.splice(0, countColor);

                for (let p = 0; p < countColor; p++) {
                    holdColor.push(color);
                    array.unshift("transparent");
                }
                break;
            }
        }
    };

    const handleBottle2 = (array, holdColor, tempColorArray) => {
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

    const transferLiquid = (data, clicked, transferColorArray) => {
        const holdColor = [];

        handleBottle1(transferColorArray[0], holdColor);
        const newColorArray1 = [clicked[0], transferColorArray[0]];
        console.log(newColorArray1);

        replaceColorArray(data, newColorArray1, newBottles);

        const tempColorArray = [];
        handleBottle2(transferColorArray[1], holdColor, tempColorArray);

        const newColorArray2 = [clicked[1], tempColorArray.reverse()];
        console.log(newColorArray2);

        replaceColorArray(data, newColorArray2, newBottles);
    };

    const clickBottle = (data) => {
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
                transferLiquid(data, clicked, transferColorArray);
            } else {
                selectedElement.style.transition = "0.2s linear";
            }

            clicked = [];
            transferColorArray = [];
        }
    };

    for (let i = 0; i < props.elem.colorCount; i++) {
        for (let j = 0; j < countLiquidLayer; j++) {
            tempColor.push(colors[i]);
        }
    }

    shuffle(tempColor, newTempColor);

    for (
        let n = 0;
        n <
        (props.elem.bottles.length - props.elem.colorCount) * countLiquidLayer;
        n++
    ) {
        newTempColor.push("transparent");
    }

    for (let a = 0; a < props.elem.bottles.length; a++) {
        const arrayB = [];
        for (let b = 0; b < countLiquidLayer; b++) {
            arrayB.push(newTempColor.shift());
        }
        newBottles.push({ ...props.elem.bottles[a], color: [...arrayB] });
        // setNewBottles({ ...props.elem.bottles[a], color: arrayB });
    }

    return (
        <>
            {newBottles.map((data) => (
                <Bottle
                    key={data.id}
                    top={data.top}
                    left={data.left}
                    color={data.color}
                    clickBottle={() => clickBottle(data)}
                />
            ))}
        </>
    );
};

export default Game;
