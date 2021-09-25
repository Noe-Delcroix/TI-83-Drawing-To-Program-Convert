class Circle{
  constructor(x,y,r,c){
    this.del=false
    this.typ="Circle"
    this.pos=createVector(x,y)
    this.r=r
    this.col=c
  }
  render(){
    noFill()
    if (selected==this){
      noStroke()
      fill(255,0,0)
      circle(this.pos.x*f,this.pos.y*f,f*3)
    }
    noFill()
    stroke(colors[this.col])
    strokeWeight(f)
    circle(this.pos.x*f,this.pos.y*f,this.r*f*2)
  }
  update(){
    if (this==selected && mouseIsPressed && mouseX>0 && mouseY>0 && mouseX<width && mouseY<height){
      this.pos=createVector(mouseX,mouseY).div(f) 
    }
    this.pos.x=constrain(this.pos.x,0,264)
    this.pos.y=constrain(this.pos.y,0,164)
  }
  
}