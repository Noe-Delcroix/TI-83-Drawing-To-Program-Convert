class Text{
  constructor(x,y,c,t){
    this.del=false
    this.typ="Text"
    this.pos=createVector(x,y)
    this.col=c
    this.txt=t
  }
  render(){
    textFont(font)
    textAlign(LEFT,TOP)
    textSize(f*25/2.5)
    
    if (this.txt.length==0){
     var r=font.textBounds('0', this.pos.x*f, this.pos.y*f, f*25/2.5);
    }else{
     var r=font.textBounds(this.txt, this.pos.x*f, this.pos.y*f, f*25/2.5);
    }
    if (this.col>=9 && this.col<=11){
      fill(color(150,150,150))
    }else{
      fill(255)
    }
    if (selected==this){
      stroke(colors[this.col])
      strokeWeight(f)
      
    }else{
      noStroke()
    }
    rect(r.x,r.y,r.w,12*f)
    
    fill(colors[this.col])
    noStroke()
    text(this.txt,this.pos.x*f,this.pos.y*f-(r.h-12*f)/2)
  }
  update(){
    if (this==selected && mouseIsPressed && mouseX>0 && mouseY>0 && mouseX<width && mouseY<height){
      this.pos=createVector(mouseX-textWidth(this.txt)/2,mouseY-12*f/2).div(f) 
    }
    
    this.pos.x=constrain(this.pos.x,0,264-textWidth(this.txt)/f)
    this.pos.y=constrain(this.pos.y,0,164-12)
  }
}