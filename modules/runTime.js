function runTime(func, args) { 
    console.time('Execution time');
    try {
        const res = func(...args); 
        console.log(res);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        console.timeEnd('Execution time');
    }
}

runTime(lottery,[1000 ,30])
runTime(primes,[1000])


function primes(n=1000) {
    let primes = [];
    for (let i = 2; i < n; i++) {
        let isPrime = true;
        for (let j = 2; j < i; j++) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(i);
        }
    }
    return primes;
}


function lottery(maxNumber=100, count=6) {
    if (count <= 0 || maxNumber <= 0) {
        return [];
    }
    
    let randomNumbers = [];
    for (let i = 0; i < count; i++) {
        randomNumbers.push(Math.floor(Math.random() * (maxNumber + 1)));
    }
    
    return randomNumbers.sort((a, b) => a - b);
}


