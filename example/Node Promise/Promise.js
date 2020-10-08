

function doing() {
    return new Promise((r, j) => {
        var z = 0;
        for (let index = 0; index < 100000; index++) { z += 2; }
        r(" Z:" + z);
    });
}


async function X() {
    console.log(2)
    console.log(3)
    console.log("EXE:", await doing());
    console.log(4)
}


console.log(1);

X();

console.log(5)