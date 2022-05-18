import { useEffect, useState } from "react";
import "./App.scss";
import Game from "./Game";

const App = () => {
    const colors = ["red", "orange", "blue", "limegreen", "purple"];
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

    useEffect(() => {
        setLevel("easy");
    }, [setLevel]);

    return (
        <div className="body">
            <div className="justify-content-center">
                {levelData.map((elem) => (
                    <div key={elem.id}>
                        {level === elem.difficulty && (
                            <Game elem={elem} colors={colors} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
