let margin=3

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

class houseFront{
  constructor(dom){
    // console.log(dom)
    this.dom=dom

    this.container=SVG().addTo("#"+dom).size(200,200)
    this.rect=this.container.rect(0, 0).attr({"stroke": "white", "stroke-width": 3, "fill": "none"})

    this.highlight_path=this.container.line(0,0,0,0).attr({"stroke": "var(--accent-color)", "stroke-width": 10})
  }
  
  delete(){
    this.dom_elem.removeChild(this.dom_elem.querySelector("svg"))
  }

  updateTag(...args){
    try{
      document.getElementById(this.dom).querySelectorAll("p")[1].innerHTML=args[0]+"m x <br>"+args[1]+"m"
    }catch{}finally{}
  }

  update(time=300){
    [this.x, this.y]=normalize(80, x, y)
    this.rect.animate(time).size(this.x, this.y)
    this.container.animate(time).size(this.x+margin*2, this.y+margin*2)
    this.rect.move(margin,margin)
    // this.tag.innerHTML=x+"m x <br>"+y+"m"
    this.updateTag(x, y)
    // this.tag=x+"m x "+y+"m"
    this.drawHighlight()
  }

  drawHighlight(){
    switch (highlight) {
      case 1:
        this.highlight_path.plot(margin,margin,this.x,0)
        break;
      case 2:
        this.highlight_path.plot(margin,margin,0,this.y)
        break;
      default:
        this.highlight_path.plot(0,0,0,0)
        break;
    }
  }
}

class houseSide extends houseFront{
  constructor(dom){
    super(dom)
    // this.rect.attr({"stroke": "#FFF", "stroke-widthS": 3})
    this.top_triangle=[]
    this.top_triangle[0]=this.container.line(0,0,0,0).attr({"stroke": "white", "stroke-width": 3})
    this.top_triangle[1]=this.container.line(0,0,0,0).attr({"stroke": "white", "stroke-width": 3})
  }

  update(time){
    // console.log(x,y,z)
    [this.y, this.y1, this.z]=normalize(80, y, y1, z)
    this.rect.animate(time).size(this.z,this.y)
    this.rect.move(margin,this.y1+margin)
    this.container.animate(time).size(this.z+margin*2,this.y+this.y1+margin*2)

    this.top_triangle[0].animate().plot(margin,margin,margin,this.y1+margin)
    this.top_triangle[1].animate().plot(margin,margin,this.z+margin,this.y1+margin)

    this.updateTag(z, y)
    this.drawHighlight()
  }

  drawHighlight(){
    switch (highlight) {
      case 2:
        this.highlight_path.plot(margin,margin,0,this.y)
        break;
      case 3:
        this.highlight_path.plot(margin,margin,this.z,0)
        break;
      default:
        this.highlight_path.plot(0,0,0,0)
        break;
    }
  }
}