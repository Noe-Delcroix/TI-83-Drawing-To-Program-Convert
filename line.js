class Line{
  constructor(x1,y1,x2,y2,s,c){
    this.del=false
    this.typ="Line"
    this.pos1=createVector(x1,y1) 
    this.pos2=createVector(x2,y2)
    this.si=s
    this.col=c
    
  }
  render(){
    noFill()
    stroke(colors[this.col])
    strokeWeight(this.si*f)
    line(this.pos1.x*f,this.pos1.y*f,this.pos2.x*f,this.pos2.y*f)
    fill(255,0,0)
    noStroke()
    if (this==selected){
      if (selectedPoint==1){
        circle(this.pos1.x*f,this.pos1.y*f,f*this.si*3) 
      }if (selectedPoint==2){
        circle(this.pos2.x*f,this.pos2.y*f,f*this.si*3) 
      }
    }
  }
  update(){
    if (this==selected && mouseIsPressed && mouseX>0 && mouseY>0 && mouseX<width && mouseY<height){
      if (selectedPoint==1){
        this.pos1=createVector(mouseX,mouseY).div(f)
      }if (selectedPoint==2){
        this.pos2=createVector(mouseX,mouseY).div(f)
      }
    }
    
    this.pos1.x=constrain(this.pos1.x,0,264)
    this.pos1.y=constrain(this.pos1.y,0,164)
    this.pos2.x=constrain(this.pos2.x,0,264)
    this.pos2.y=constrain(this.pos2.y,0,164)
  }
}