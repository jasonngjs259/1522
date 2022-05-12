import "./App.scss";
import Bottle from "./Components/Bottle";

const App = () => {
    const colors = ["red", "orange", "blue"];
    const tempColor = [];

    const bottles = [
        { id: 0, left: "40%", top: "30%" },
        { id: 1, left: "50%", top: "30%" },
        { id: 2, left: "60%", top: "30%" },
        { id: 3, left: "45%", top: "50%" },
        { id: 4, left: "55%", top: "50%" },
    ];

    for (let i = 0; i < colors.length; i++) {
        for (let j = 0; j < 4; j++) {
            tempColor.push(colors[i]);
        }
    }

    const shuffle = (array) => {
        let currentIndex = array.length;
        let randomIndex = null;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }

        return array;
    };

    shuffle(tempColor);

    for (let n = 0; n < 8; n++) {
        tempColor.push("transparent");
    }

    console.log(tempColor);

    const arrayA = [];

    for (let a = 0; a < bottles.length; a++) {
        const arrayB = [];
        for (let b = 0; b < 4; b++) {
            arrayB.push(tempColor.shift());
        }
        arrayA.push(arrayB);
    }

    console.log(arrayA);

    let arrayC = [];

    for (let c = 0; c < bottles.length; c++) {
        arrayC.push({ ...bottles[c], color: arrayA[c] });
    }

    console.log(arrayC);

    return (
        <div className="body">
            <div className="justify-content-center">
                {/* {showBottles(bottleCount)} */}
                {arrayC.map((elem) => {
                    return (
                        <Bottle
                            key={elem.id}
                            top={elem.top}
                            left={elem.left}
                            color={elem.color}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default App;
