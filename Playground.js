function solution(number) {
  let theString = "";
  const roman = {
    M: parseInt(number / 1000),
    D: parseInt((number % 1000) / 500),
    C: parseInt(((number % 1000) % 500) / 100),
    L: parseInt((((number % 1000) % 500) % 100) / 50),
    X: parseInt(((((number % 1000) % 500) % 100) % 50) / 10),
    V: parseInt((((((number % 1000) % 500) % 100) % 50) % 10) / 5),
    I: parseInt((((((number % 1000) % 500) % 100) % 50) % 10) % 5),
  };

  for(const symbol in roman) { 
    if(roman[symbol]>3){
        
    }
  }

  for (const symbol in roman) {
    for(i=0;i<roman[symbol];i++){
        theString += symbol
    }
  }

  console.log(theString)
  return theString
}