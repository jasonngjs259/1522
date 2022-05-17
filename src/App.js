import { useEffect, useState } from "react";
import "./App.scss";
import Bottle from "./Components/Bottle";

const App = () => {
    const colors = ["red", "orange", "blue", "limegreen", "purple"];
    const countLiquidLayer = 4;

    const tempColor = [];
    const newTempColor = [];

    const levelData = [
        {
            id: 0,
            difficulty: "easy",
            colorCount: 3,
            bottles: [
                { id: 0, left: "40%", top: "30%", color: [] },
                { id: 1, left: "50%", top: "30%", color: [] },
                { id: 2, left: "60%", top: "30%", color: [] },
                { id: 3, left: "45%", top: "50%", color: [] },
                { id: 4, left: "55%", top: "50%", color: [] },
            ],
        },
        {
            id: 1,
            difficulty: "medium",
            colorCount: 4,
            bottles: [
                { id: 0, left: "30%", top: "25%", color: [] },
                { id: 1, left: "40%", top: "25%", color: [] },
                { id: 2, left: "50%", top: "25%", color: [] },
                { id: 3, left: "65%", top: "25%", color: [] },
                { id: 4, left: "35%", top: "50%", color: [] },
                { id: 5, left: "45%", top: "50%", color: [] },
                { id: 6, left: "55%", top: "50%", color: [] },
            ],
        },
    ];

    const [level, setLevel] = useState();
    const newLevelData = [...levelData];
    // const [newBottles, setNewBottles] = useState([]);
    // const [newColor, setNewColor] = useState([]);

    // const bottles = [
    //     { id: 0, left: "40%", top: "30%" },
    //     { id: 1, left: "50%", top: "30%" },
    //     { id: 2, left: "60%", top: "30%" },
    //     { id: 3, left: "45%", top: "50%" },
    //     { id: 4, left: "55%", top: "50%" },
    // ];

    useEffect(() => {
        setLevel("easy");
    }, [setLevel]);

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

    const replaceColorArray = (data, colorArray) => {
        const tempColorArray = {};
    };

    const replaceBottles = (elem, id, colorArray) => {
        elem.bottles.forEach((data) => {
            if (id === data.id) {
                replaceColorArray(data, colorArray);
            }
        });
    };

    // const storeBottleData = (newColorArray, element, newLevelData) => {
    //     const newBottles = [];

    //     for (let c = 0; c < element.bottles.length; c++) {
    //         newBottles.push({ ...element.bottles[c], color: newColorArray[c] });
    //     }

    //     newLevelData.push({ ...element, bottles: newBottles });
    // };

    levelData.forEach((elem) => {
        if (level === elem.difficulty) {
            for (let i = 0; i < elem.colorCount; i++) {
                for (let j = 0; j < countLiquidLayer; j++) {
                    tempColor.push(colors[i]);
                }
            }

            shuffle(tempColor, newTempColor);

            for (
                let n = 0;
                n < (elem.bottles.length - elem.colorCount) * countLiquidLayer;
                n++
            ) {
                newTempColor.push("transparent");
            }

            console.log(newTempColor);

            const arrayA = [];

            for (let a = 0; a < elem.bottles.length; a++) {
                const arrayB = [];
                for (let b = 0; b < countLiquidLayer; b++) {
                    arrayB.push(newTempColor.shift());
                }
                // setNewColor({ ...elem.bottles[a], color: arrayA });
                arrayA.push(arrayB);
            }

            // setNewBottles({ ...elem, bottles: newColor });

            // for (let c = 0; c < elem.bottles.length; c++) {
            //     newBottles.push({ ...elem.bottles[c], color: arrayA[c] });
            // }
            // setNewBottles({ ...elem.bottles[c], color: arrayA[c] });

            const newBottles = [];

            for (let c = 0; c < elem.bottles.length; c++) {
                newBottles.push({ ...elem.bottles[c], color: arrayA[c] });
            }

            // setNewLevelData({ ...elem, bottles: newBottles });
            newLevelData.push({ ...elem, bottles: newBottles });
            console.log(newLevelData);
        }
    });

    //water sort logic
    let clicked = [];
    let transferColorArray = [];

    const transferLiquid = (data, transferColorArray) => {
        const holdColor = [];
        let countColor = 1;
        let color = null;
        for (let n = 0; n < transferColorArray[0].length; n++) {
            // if (transferColorArray[0][n] === "transparent") {
            //     continue;
            // }

            if (
                (transferColorArray[0][n] === "transparent" &&
                    transferColorArray[0][n + 1] !== "transparent") ||
                transferColorArray[0][0] !== "transparent"
            ) {
                color = transferColorArray[0][n];
            }

            if (transferColorArray[0][n] === transferColorArray[0][n + 1]) {
                countColor += 1;
            } else {
                transferColorArray[0].splice(0, countColor);

                for (let p = 0; p < countColor; p++) {
                    holdColor.push(color);
                    transferColorArray[0].unshift("transparent");
                }
                console.log(transferColorArray[0]);
                break;
            }
        }

        const tempColorArray = [];

        for (let i = transferColorArray[1].length - 1; i >= 0; i--) {
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

        // const newBottle = [];
        const newColorArray = tempColorArray.reverse();
        console.log(newColorArray);

        // newBottle.push({ ...data, color: newColorArray });
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
                transferLiquid(data, transferColorArray);
            } else {
                selectedElement.style.transition = "0.2s linear";
            }

            clicked = [];
            transferColorArray = [];
        }
    };

    return (
        <div className="body">
            <div className="justify-content-center">
                {newLevelData.map((elem) => (
                    <div>
                        {level === elem.difficulty &&
                            elem.bottles.map((data) => (
                                <Bottle
                                    key={data.id}
                                    top={data.top}
                                    left={data.left}
                                    color={data.color}
                                    clickBottle={() => clickBottle(data)}
                                />
                            ))}
                    </div>
                ))}

                {/* {newBottles.map((data) => (
                    <Bottle
                        key={data.id}
                        top={data.top}
                        left={data.left}
                        color={data.color}
                        clickBottle={() => clickBottle(data)}
                    />
                ))} */}
            </div>
        </div>
    );
};

export default App;
