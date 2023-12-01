function tsp_ls(distances){
	var previousFirstIndex=-1
	var previousSecondIndex=-1
	var firstIndex=0
	var secondIndex=0
	var repeatCounter=0
	var buffer=0;
	var bufferRoute=[]
	var length=distances.length;
	var shortestLength=Infinity
	var currentLength=-1
	var firstIteration=true
	if (length < 2){
		return 0
	}
	var route = Object.keys(distances)
	var numOfIterations=length*length

	for (var i = 0; i < numOfIterations; i++){
		if (firstIteration==false){
			previousFirstIndex=firstIndex
			previousSecondIndex=secondIndex
		}
		firstIndex = Math.floor(Math.random() * length);
		secondIndex = Math.floor(Math.random() * length);
		while ((firstIndex==secondIndex || (firstIndex==previousFirstIndex && secondIndex==previousSecondIndex)) && repeatCounter <= 10){
			secondIndex = Math.floor(Math.random() * length);
			//console.log("repeating value")
			repeatCounter=repeatCounter+1
		}
		
		if (firstIndex > secondIndex){
		        buffer=firstIndex
			firstIndex=secondIndex
			secondIndex=buffer
		}
		//console.log(route)
		//console.log(firstIndex)
		//console.log(secondIndex)
		bufferRoute=optSwap(route, firstIndex, secondIndex)
		currentLength=0
		for (var j = 0; j < bufferRoute.length-1; j++){
			currentLength = currentLength + distances[bufferRoute[j]][bufferRoute[j+1]]
		}
		if (currentLength < shortestLength){
			//console.log("SHORTEST IS:")
			//console.log(currentLength)
			shortestLength=currentLength
		}
		route=bufferRoute
		firstIteration=false
	}
	return shortestLength
	
}

function optSwap(route, i, k){
	var newRoute=route

	var firstThird=newRoute.slice(0,i)
	var secondThird=newRoute.slice(i,k+1)
	var finalThird=newRoute.slice(k+1,newRoute.length)
	newRoute=firstThird.concat(secondThird.reverse())
	newRoute=newRoute.concat(finalThird)
	return newRoute

}
