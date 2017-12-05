function multiply(a, b) {
    if(arguments.length == 1){
        return function(b) {
            return a * b;
        }
    }
    return a * b;
}


console.log(multiply(10)(4));
console.log(multiply(10, 4));