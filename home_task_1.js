//==================FIRST TASK ==========================

function fibonacci(n) {
    let sequence = [1, 1];
    if (n > 0) {
        for (let i = 2; i < n; i++) {
            sequence[i] = sequence[i - 1] + sequence[i - 2];
        }
    }else if(n == 1) {
        return n;
    }else{
        return 'The argument is not a correct';
    }
    return sequence;
}

fibonacci(-1);
fibonacci(0);
fibonacci(1);
fibonacci(8);
fibonacci(15);



//===================SECOND TASK=========================

let arr1 = ["Vasya", "Petya", "Olena", "Anton", "Ivan", "John", "Carlos", "Dmutro"];
let arr2 = ["Banana", "Strawberry", "Lemon", "Orange", "Coconut", "Nut", "Lime", "Apple"];
let arr3 = ["London", "Paris", "Dubai", "New York", "Sidney", "Minsk"]

function shuffleArray(name) {
    var newArray = [];
    var iteration = name.length;

    for (var i = 0; i < iteration; i++) {
        var randomItem = Math.floor(Math.random() * name.length);
        var newItem = name.splice(randomItem, 1);
        newArray.push(newItem[0]);
    }
    return newArray;
}


console.log(shuffleArray(arr1));
console.log(shuffleArray(arr2));
console.log(shuffleArray(arr3));
