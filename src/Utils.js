const shuffle = (array) => {
    const newArray = [];
    let currentIndex = array.length;
    let randomIndex = null;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        newArray.push(array[randomIndex]);

        array.splice(randomIndex, 1);
    }

    for (let i = 0; i < newArray.length; i++) {
        array.push(newArray[i]);
    }

    // console.log(array);

    return array;
};

export default shuffle;
