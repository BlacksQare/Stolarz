function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function normalize(...args){
  var target=args[0]
  args.splice(0,1)
  var highest=0;
  var dimensions=[];
  args.forEach(element => {
    if(highest<element){
      highest=element
    }
  });
  args.forEach(element => {
    dimensions.push(element/highest*target)
  });
  return dimensions
}