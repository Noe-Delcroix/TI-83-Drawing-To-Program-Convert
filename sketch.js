//Screen size : 264*164
var font 

const offset=10
const f=2
const colorCodes=["BLEU","ROUGE","NOIR","MAGENTA","VERT","ORANGE","MARRON","BLEU MRN","BLEU CLR","JAUNE","BLANC","GRIS CLR","GRIS MOY","GRIS","GRIS FON"]
var colors
var objects=[]

var boxOutput

var selected=null
var selectedPoint=1

function preload(){
  font=loadFont("ti83_plus.ttf") 
  
}

function setup() {
  
  createCanvas(264*f, 164*f);
  boxOutput = createElement("textarea", "")
  boxOutput.style('background-color', color(255,200,200))
  boxOutput.position(width+80,0)
  div=createDiv('HOW TO USE :<br\>- Click on a object to select it<br\>- Drag the mouse to move selected object<br\>- Mouse wheel to change the size of the selected object<br\>- Double Click to create new object')
  div.position(width+80,height/2+10)
  div.style('width','400px')
  delButton=createButton('Delete object')
  delButton.mousePressed(delSelectedObject)
  delButton.hide()
  topButton=createButton('Go on top')
  topButton.mousePressed(goToTop)
  topButton.hide()
  bottomButton=createButton('Go at the bottom')
  bottomButton.mousePressed(goToBottom)
  bottomButton.hide()
  sel=createSelect()
  for (let cc of colorCodes){
    sel.option(cc) 
  }
  sel.hide()
  sel.changed(changeColor)
  inp=createInput()
  inp.hide()
  inp.input(changeText)
  radio=createRadio()
  radio.option("Line",1)
  radio.option("Circle",2)
  radio.option("Text",3)
  radio.position(width,0)
  radio.style('width','70px')
  radio.value('1')
  
  colors=[color(0,0,255),color(255,0,0),color(0,0,0),color(255,0,255),color(0,158,0),color(255,142,33),color(181,32,0),color(0,0,132),color(0,146,255),color(255,255,0),color(255,255,255),color(231,227,231),color(198,195,198),color(140,138,140),color(82,85,82)]
}
  
function draw() {
  boxOutput.size(400, height/2)
  background(0);
  for (let obj=objects.length-1;obj>=0;obj--){
    objects[obj].render()
    objects[obj].update()
    if (objects[obj].del){
      objects.splice(obj,1) 
    }
  }
  
  outputText()
}

function outputText(){
  let finalTxt='' 
  finalTxt+='EffDess\nFoncNAff \nXmin→A\nXmax→B\nYmin→C\nYmax→D\n'+offset+'→Xmin\n'+offset+'→Ymin\n'+(264+offset)+'→Xmax\n'+(164+offset)+'→Ymax\n'
  var lastTxtColor=null
  for (let obj=0; obj<objects.length; obj++){
    if (objects[obj].typ=="Line"){
      let p1=createVector(objects[obj].pos1.x+offset,map(objects[obj].pos1.y,0,164,164,0)+offset)
      let p2=createVector(objects[obj].pos2.x+offset,map(objects[obj].pos2.y,0,164,164,0)+offset)
      finalTxt+='Ligne('+p1.x.toFixed(1)+','+p1.y.toFixed(1)+','+p2.x.toFixed(1)+','+p2.y.toFixed(1)+','+colorCodes[objects[obj].col]+','+objects[obj].si+')\n'
    }else if (objects[obj].typ=="Circle"){
      let p=createVector(objects[obj].pos.x+offset,map(objects[obj].pos.y,0,164,164,0)+offset)
      finalTxt+='Cercle('+p.x.toFixed(1)+','+p.y.toFixed(1)+','+objects[obj].r.toFixed(1)+','+colorCodes[objects[obj].col]+')\n'
    }else if(objects[obj].typ=="Text"){
      if (lastTxtColor!=objects[obj].col){
        finalTxt+='CouleurTexte('+colorCodes[objects[obj].col]+')\n'
      }
      lastTxtColor=objects[obj].col
      finalTxt+='Texte('+objects[obj].pos.y.toFixed(0)+','+objects[obj].pos.x.toFixed(0)+',"'+objects[obj].txt+'")\n'
    }
  }
  finalTxt+='Pause :\nA→Xmin\nB→Xmax\nC→Ymin\nD→Ymax\nFoncAff '
  boxOutput.value(finalTxt)
}

function mousePressed(){
  for (let obj of objects){
    if (obj.typ=="Circle"){
       if (dist(obj.pos.x*f,obj.pos.y*f,mouseX,mouseY)<obj.r*f){
         selected=obj
         sel.show()
         delButton.show()
         topButton.show()
         bottomButton.show()
         sel.value(colorCodes[obj.col])
         return
       }
    }
    else if (obj.typ=="Line"){
      if (dist(obj.pos1.x*f,obj.pos1.y*f,mouseX,mouseY)<f*obj.si*3){
        selected=obj
        selectedPoint=1
        sel.show()
        delButton.show()
        topButton.show()
        bottomButton.show()
        sel.value(colorCodes[obj.col])
        return
      }if (dist(obj.pos2.x*f,obj.pos2.y*f,mouseX,mouseY)<f*obj.si*3){
        selected=obj
        selectedPoint=2
        sel.show()
        delButton.show()
        topButton.show()
        bottomButton.show()
        sel.value(colorCodes[obj.col])
        return
      }
    }else if (obj.typ=="Text"){
      if (obj.txt.length==0){
     var r=font.textBounds('0', obj.pos.x*f, obj.pos.y*f, f*25/2.5);
    }else{
     var r=font.textBounds(obj.txt, obj.pos.x*f, obj.pos.y*f, f*25/2.5);
    }
      
      if (mouseX>r.x && mouseY>r.y && mouseY<r.y+12*f && mouseX<r.x+r.w){
        selected=obj
        sel.show()
        sel.value(colorCodes[obj.col])
        inp.show()
        delButton.show()
        topButton.show()
        bottomButton.show()
        inp.value(obj.txt)
        return
      }
    }
    
  }
  if (mouseX>0 && mouseY>0 && mouseX<width && mouseY<height){
    selected=null
    sel.hide()
    delButton.hide()
    topButton.hide()
    bottomButton.hide()
    inp.hide()
  }
}
function mouseWheel(event){
  if (mouseX>0 && mouseY>0 && mouseX<width && mouseY<height){
    if (selected!=null){
      if (selected.typ=="Circle"){
        selected.r-=event.delta/50
        selected.r=constrain(selected.r,5,82)
      }
      if (selected.typ=="Line"){
        if (event.delta<0){
          selected.si=2 
        }else{
          selected.si=1 
        }
      }
    }
  }
}
function doubleClicked(){
  if (mouseX>0 && mouseY>0 && mouseX<width && mouseY<height){
    if (radio.value()=='1'){
      objects.push(new Line(mouseX/f,mouseY/f,mouseX/f+10*f,mouseY/f,1,colorCodes.indexOf(sel.value())))
    }else if (radio.value()=='2'){
      objects.push(new Circle(mouseX/f,mouseY/f,10,colorCodes.indexOf(sel.value())))
    }else if(radio.value()=='3'){
      objects.push(new Text(mouseX/f,mouseY/f,colorCodes.indexOf(sel.value()),""))       
    }
  }
  
}
      
function changeColor(){
  selected.col=colorCodes.indexOf(sel.value())
}
      
function changeText(){
  selected.txt=inp.value()
}
      
function delSelectedObject(){
  selected.del=true 
  selected=null
  sel.hide()
  delButton.hide()
  topButton.hide()
  bottomButton.hide()
  inp.hide()
}
      
function goToBottom(){
  if (objects.indexOf(selected)!=objects.length-1){
    let temp=objects[objects.indexOf(selected)]
    objects[objects.indexOf(selected)]=objects[objects.length-1]
    objects[objects.length-1]=temp
  }
}
      
function goToTop(){
  if (objects.indexOf(selected)!=0){
    let temp=objects[objects.indexOf(selected)]
    objects[objects.indexOf(selected)]=objects[0]
    objects[0]=temp
  }
}