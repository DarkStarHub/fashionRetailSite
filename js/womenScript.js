

const AddObj = {
    "id": null,
    "label": null,
    "price": null,
    "oldprice": null,
    "type": null,
    "images":{
        "a":null,
        "b": null,
        "c":null,
        "d":null,
        "aL":null,
        "bL":null,
        "cL":null,
        "dL":null
    }
}



let dataBase;

let dept;


/*
let bagB = document.querySelector('#bagID');
let bagModal = document.querySelector('#bagModalID');
let modalInner = document.querySelector('#modalInnerID');
let bagtotalSpan = document.querySelector('#bagTotalID');

let bagOpen = false;
let bagTotal = 0;*/


//// carousel
const gsap = window.gsap;


let carPos = 0;
let carrItems;
let carrMax;

const fCarr = document.querySelector('#fb');
const bCarr = document.querySelector('#bb');
bCarr.style.visibility = "hidden";


const chatHook = document.querySelector('#bdy');
const searchButton = document.querySelector('#searchId');


const getData = async () => {
    const response = await fetch('./combDB.json');
    const data = await response.json();
    dataBase = data; 
    //ProcessData();   
    //return db;

    window.localStorage.setItem('department', 'women'); 
    dept = "women"; 

    BuildPage()
};

getData();

function BuildPage()
{
    
    const par = document.querySelector('#appPar');
    CreateCard(9901,"clothing",dept,'32.5%','100%',par);
    CreateCard(9200,"accessories",dept,'32.5%','100%',par);
    CreateCard(9104,"boots",dept,'32.5%','100%',par);

    const par2 = document.querySelector('#appPar2');
    CreateInsetLabel('72%','2%','25%','16%',par2,
    "Alexander Julian", "Fall Collection","Learn more"); 
    CreateCarousel(); 
    

    PopRecent()

       

    CreateSearchPop(popHook,searchButton);   

    setTimeout(function() {CreateChat(chatHook)}, 5000); 

}





document.addEventListener('keydown', function(e){
    if(e.key === '1')
    { 
        //TestLoad();
        console.log(localStorage);
    }  
});




// Create our number formatter.
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});






function CreateCard(id,type,department,wd,ht,parent)
{
    //let itemObj =  GetObjById(id,type)   
    //let itemObj =  GetObjByPureId(id);   

    let itemObj;

    if(department == null)
    {
        itemObj =  GetObjByPureId(id);
    }
    else
    {
        itemObj =  GetObjByIdDept(id);
    }


    if(itemObj == null)
    {
        return; //item not found
    }

    //create the card div
    const newDiv = document.createElement('div');
    newDiv.classList.add("--bg-w","--f-col","cp");
    newDiv.dataset.item = id;   
    newDiv.style.width = wd;
    newDiv.style.height = ht;   
    //newDiv.style.backgroundColor = 'white' 
    newDiv.style.justifyContent = 'space-between';

    newDiv.addEventListener("click", event =>{     
        //console.log(cCard1.c.getAttribute("data-item"));
        sessionStorage.setItem("itemId", newDiv.getAttribute("data-item"));
        window.location.href = "item.html";
    });
     

    const img = document.createElement('img');      
    img.src = itemObj.images.a;
    img.classList.add("--img-full-wid");
    newDiv.append(img);

    const copyBox = document.createElement('div');
    //copyBox.style.width = '100%';
    copyBox.style.height = '13vw';
    copyBox.style.position = 'relative';
    copyBox.style.alignSelf = 'flex-end';
    copyBox.classList.add("--w100","--f-col-align");
    copyBox.classList.backgroundColor = 'white';
    newDiv.append(copyBox);


    const s1 = document.createElement('span');
    s1.classList.add("--fnt-r16","--fnt-w700")
    s1.style.marginTop = '5%'
    //s1.style.fontSize = '2vw'
    s1.innerHTML = itemObj.label;
    copyBox.append(s1);

    const tp = document.createElement('span');
    tp.classList.add("--fnt-r12","--fnt-w500");
    tp.style.marginTop = '7%'
    //tp.style.fontSize = '1.6vw'
    tp.innerHTML = itemObj.type;
    copyBox.append(tp);

    if(itemObj.oldprice != null)
    {
        const oPDiv = document.createElement('div');
        oPDiv.classList.add("--f-row-align","--mt-r05");


        const sOp = document.createElement('span');
        sOp.classList.add("--fnt-r13","--fnt-st");
        //sOp.style.marginTop = '2%'
        //sOp.style.fontSize = '1.6vw'                
        sOp.innerHTML = formatter.format(itemObj.oldprice); 
        oPDiv.append(sOp);

        

        const oPPerc = document.createElement('span');
        oPPerc.classList.add("--ml-r1","--fnt-r13")
        let disc = (itemObj.oldprice-itemObj.price)/itemObj.oldprice;
        disc = Math.round(disc*100); 
        oPPerc.innerHTML = disc+"%"+"  OFF"; 
        oPDiv.append(oPPerc);


        copyBox.append(oPDiv);
    }

    const s2 = document.createElement('span');
    s2.classList.add("--mt-r05","--fnt-r13","--fnt-w700");
    //s2.style.marginTop = '2%'
    //s2.style.fontSize = '1.6vw'
    s2.innerHTML = formatter.format(itemObj.price);
    copyBox.append(s2);


    parent.append(newDiv); 
}



function CreateInsetLabel(t,l,w,h,par,m1,m2,m3)
{
    const newLbl = document.createElement('div');
    newLbl.style.position = 'absolute';
    newLbl.style.top = t;
    newLbl.style.left = l;
    newLbl.style.width = w;
    newLbl.style.height = h;   
    newLbl.style.backgroundColor = 'white' 
    newLbl.classList.add("--f-centered"); 

    const copyBox = document.createElement('div');
    copyBox.classList.add("lbl-text-box","--f-col-align");
    newLbl.append(copyBox);
    
    const s1 = document.createElement('span');
    s1.innerHTML = m1;
    s1.classList.add("--fnt-r18","--fnt-w500");
    copyBox.append(s1);

    const s2 = document.createElement('span');
    s2.innerHTML = m2;
    s2.classList.add("--fnt-r16");
    copyBox.append(s2);

    const s3 = document.createElement('span');
    s3.innerHTML = m3;
    s3.classList.add("--fnt-r14","--fnt-us");
    copyBox.append(s3);




    par.append(newLbl);

}





function GetObjByPureId(id)// disregards department
{
    for (var arr in dataBase) {        
        for (var i = 0; i < dataBase[arr].length; i++) {
            if(dataBase[arr][i].id == id)
            {               
                return dataBase[arr][i];               
            }
        }
    }    
    return null;
}



function GetObjByIdDept(id)
{
    for (var arr in dataBase) {        
        for (var i = 0; i < dataBase[arr].length; i++) {
            if(dataBase[arr][i].id == id)
            {                    
                if(dataBase[arr][i].department != dept) 
                {
                    continue;
                }       
                return dataBase[arr][i];               
            }
        }
    }    
    return null;
}







function CreateCarousel(){

    carrItems = dataBase["womenclothing"];    
    let carrMax = Math.ceil(carrItems.length/3)-1;

const cCard1 = {
    c: document.querySelector('#crd1'),
    i: document.querySelector('#cim1'),
    l: document.querySelector('#cl1')
}
const cCard2 = {
    c: document.querySelector('#crd2'),
    i: document.querySelector('#cim2'),
    l: document.querySelector('#cl2')
}
const cCard3 = {
    c: document.querySelector('#crd3'),
    i: document.querySelector('#cim3'),
    l: document.querySelector('#cl3')
}


cCard1.c.addEventListener("click", event =>{     
    //console.log(cCard1.c.getAttribute("data-item"));
    sessionStorage.setItem("itemId", cCard1.c.getAttribute("data-item"));
    window.location.href = "item.html";
});
cCard2.c.addEventListener("click", event =>{     
    //console.log(cCard2.c.getAttribute("data-item"));
    sessionStorage.setItem("itemId", cCard2.c.getAttribute("data-item"));
    window.location.href = "item.html";
});
cCard3.c.addEventListener("click", event =>{     
    //console.log(cCard3.c.getAttribute("data-item"));
    sessionStorage.setItem("itemId", cCard3.c.getAttribute("data-item"));
    window.location.href = "item.html";
});



fCarr.addEventListener("click", event =>{     
    //ForwardCarousel(card_1,card_2,card_3);
    ForwardCarousel(cCard1,cCard2,cCard3,carrMax);
});

bCarr.addEventListener("click", event =>{     
    //BackCarousel(card_1,card_2,card_3);
    BackCarousel(cCard1,cCard2,cCard3);
});



//PopCarousel(104,102,109,cCard1,cCard2,cCard3);
PopCarousel(carrItems[0],carrItems[1],carrItems[2],cCard1,cCard2,cCard3);
}



function ForwardCarousel(inc1,inc2,inc3,max){
    carPos++
    if(carPos > max)
    {
        carPos = max;
    }
    if(carPos == max)
    {
        fCarr.style.visibility = "hidden"
    }
    else{
        fCarr.style.visibility = "visible"
        bCarr.style.visibility = "visible"
    }

    setTimeout(function() { PopCarousel(carrItems[0+carPos*3],
        carrItems[1+carPos*3],
        carrItems[2+carPos*3],inc1,inc2,inc3)}, 300);  
    

    let xPos1 = inc1.c.getBoundingClientRect().x;
    let xPos2 = inc2.c.getBoundingClientRect().x;
    let xPos3 = inc3.c.getBoundingClientRect().x;    
    
    //fade out
    gsap.to(inc1.c, {duration: .3,autoAlpha: 0});
    gsap.to(inc2.c, {duration: .3,autoAlpha: 0});
    gsap.to(inc3.c, {duration: .3,autoAlpha: 0});
    
    //move to hidden
    gsap.to(inc1.c, {x: window.innerWidth *.6, duration: 0,delay:.3});   
    gsap.to(inc2.c, {x: window.innerWidth *.6 + (xPos1 -xPos2), duration: 0,delay:.3}); 
    gsap.to(inc3.c, {x: window.innerWidth *.6 + (xPos1-xPos3), duration: 0,delay:.3});

    //fade in
    gsap.to(inc1.c, {duration: .3,autoAlpha: 1,delay:.4});
    gsap.to(inc2.c, {duration: .3,autoAlpha: 1,delay:.45});
    gsap.to(inc3.c, {duration: .3,autoAlpha: 1,delay:.5});    

    //move back to carousel
    gsap.to(inc1.c, {x: 0, duration: .3,delay:.3});   
    gsap.to(inc2.c, {x: 0, duration: .3,delay:.35}); 
    gsap.to(inc3.c, {x: 0, duration: .3,delay:.4}); 
}

/*
function ForwardCarouselOld(card1,card2,card3){
    carPos++
    if(carPos > carrMax)
    {
        carPos = carrMax;
    }
    if(carPos == carrMax)
    {
        fCarr.style.visibility = "hidden"
    }
    else{
        fCarr.style.visibility = "visible"
        bCarr.style.visibility = "visible"
    }

    setTimeout(function() { PopCarousel(carrItems[0+carPos*3],
        carrItems[1+carPos*3],
        carrItems[2+carPos*3] )}, 300);  
    

    let xPos1 = card1.getBoundingClientRect().x;
    let xPos2 = card2.getBoundingClientRect().x;
    let xPos3 = card3.getBoundingClientRect().x;   
    
    //fade out
    gsap.to(card1, {duration: .3,autoAlpha: 0});
    gsap.to(card2, {duration: .3,autoAlpha: 0});
    gsap.to(card3, {duration: .3,autoAlpha: 0});
    
    //move to hidden
    gsap.to(card1, {x: window.innerWidth *.6, duration: 0,delay:.3});   
    gsap.to(card2, {x: window.innerWidth *.6 + (xPos1 -xPos2), duration: 0,delay:.3}); 
    gsap.to(card3, {x: window.innerWidth *.6 + (xPos1-xPos3), duration: 0,delay:.3});

    //fade in
    gsap.to(card1, {duration: .3,autoAlpha: 1,delay:.4});
    gsap.to(card2, {duration: .3,autoAlpha: 1,delay:.45});
    gsap.to(card3, {duration: .3,autoAlpha: 1,delay:.5});    

    //move back to carousel
    gsap.to(card1, {x: 0, duration: .3,delay:.3});   
    gsap.to(card2, {x: 0, duration: .3,delay:.35}); 
    gsap.to(card3, {x: 0, duration: .3,delay:.4});  

}
*/

function BackCarousel(inc1,inc2,inc3){
    carPos--
        if(carPos < 0)
        {
            carPos = 0;
        }
        if(carPos == 0)
        {
            bCarr.style.visibility = "hidden"
        }
        else{
            fCarr.style.visibility = "visible"
            bCarr.style.visibility = "visible"
        }
    
        setTimeout(function() { PopCarousel(carrItems[0+carPos*3],
            carrItems[1+carPos*3],
            carrItems[2+carPos*3],inc1,inc2,inc3)}, 300); 
    
    
            let xPos1 = inc1.c.getBoundingClientRect().x;
            let xPos2 = inc2.c.getBoundingClientRect().x;
            let xPos3 = inc3.c.getBoundingClientRect().x;  
    
        
    
      
        gsap.to(inc1.c, {duration: .3,autoAlpha: 0});
        gsap.to(inc2.c, {duration: .3,autoAlpha: 0});
        gsap.to(inc3.c, {duration: .3,autoAlpha: 0});
    
    
        gsap.to(inc1.c, {x: (window.innerWidth *.4)*-1, duration: 0,delay:.3});   
        gsap.to(inc2.c, {x: (window.innerWidth *.4)*-1 + (xPos1 -xPos2), duration: 0,delay:.3}); 
        gsap.to(inc3.c, {x: (window.innerWidth *.4)*-1 +(xPos1-xPos3), duration: 0,delay:.3});
    
    
        
        gsap.to(inc3.c, {duration: .3,autoAlpha: 1,delay:.4});
        gsap.to(inc2.c, {duration: .3,autoAlpha: 1,delay:.45});
        gsap.to(inc1.c, {duration: .3,autoAlpha: 1,delay:.5});
    
        
        gsap.to(inc3.c, {x: 0, duration: .3,delay:.3});   
        gsap.to(inc2.c, {x: 0, duration: .3,delay:.35}); 
        gsap.to(inc1.c, {x: 0, duration: .3,delay:.4});
    
}
    
/*
function BackCarouselOld(card1,card2,card3){
carPos--
    if(carPos < 0)
    {
        carPos = 0;
    }
    if(carPos == 0)
    {
        bCarr.style.visibility = "hidden"
    }
    else{
        fCarr.style.visibility = "visible"
        bCarr.style.visibility = "visible"
    }

    setTimeout(function() { PopCarousel(carrItems[0+carPos*3],
        carrItems[1+carPos*3],
        carrItems[2+carPos*3] )}, 300); 


    let xPos1 = card1.getBoundingClientRect().x;
    let xPos2 = card2.getBoundingClientRect().x;
    let xPos3 = card3.getBoundingClientRect().x;

    

  
    gsap.to(card1, {duration: .3,autoAlpha: 0});
    gsap.to(card2, {duration: .3,autoAlpha: 0});
    gsap.to(card3, {duration: .3,autoAlpha: 0});


    gsap.to(card1, {x: (window.innerWidth *.4)*-1, duration: 0,delay:.3});   
    gsap.to(card2, {x: (window.innerWidth *.4)*-1 + (xPos1 -xPos2), duration: 0,delay:.3}); 
    gsap.to(card3, {x: (window.innerWidth *.4)*-1 +(xPos1-xPos3), duration: 0,delay:.3});


    
    gsap.to(card3, {duration: .3,autoAlpha: 1,delay:.4});
    gsap.to(card2, {duration: .3,autoAlpha: 1,delay:.45});
    gsap.to(card1, {duration: .3,autoAlpha: 1,delay:.5});

    
    gsap.to(card3, {x: 0, duration: .3,delay:.3});   
    gsap.to(card2, {x: 0, duration: .3,delay:.35}); 
    gsap.to(card1, {x: 0, duration: .3,delay:.4});

}
*/




function PopCarousel(inc1,inc2,inc3,c1,c2,c3){       
    
    if(inc1 != null)
    {
        c1.c.dataset.item = inc1.id;        
        c1.i.src = inc1.images.a;
        c1.l.innerHTML = inc1.label;        
    }
    else{
        c1.c.dataset.item = null;
        c1.i.src = null;
        c1.l.innerHTML = null;       
    }

    
    if(inc2 != null)
    {
        c2.c.dataset.item = inc2.id;
        c2.i.src = inc2.images.a;
        c2.l.innerHTML = inc2.label        
    }
    else{
        c2.c.dataset.item = null;
        c2.i.src = null;
        c2.l.innerHTML = null;       
    }
    

    
    if(inc3 != null)
    {
        c3.c.dataset.item = inc3.id;
        c3.i.src = inc3.images.a;
        c3.l.innerHTML = inc3.label        
    } 
    else{        
        c3.c.dataset.item = null;
        c3.i.src = null;
        c3.l.innerHTML = null;        
    }
}





//recently viewed


/*
function PopRecent()
{
    // get the recently veiwed array
    let recArray;
    recArray = JSON.parse(localStorage.getItem('recViewed')); 

    // if it doesn't exist, pop default //latest arrivals perhaps
    if(recArray == null)
    {         
        recArray = [];   
        const Add1 = {
            "id": 300,
            "label": null,
            "price": null,
            "oldprice": null,
            "type": "clothing",
            "images":{
                "a":null,
                "b": null,
                "c":null,
                "d":null,
                "aL":null,
                "bL":null,
                "cL":null,
                "dL":null
            }
        };        
        recArray.push(JSON.stringify(Add1));
        const Add2 = {
            "id": 200,
            "label": null,
            "price": null,
            "oldprice": null,
            "type": "accessories",
            "images":{
                "a":null,
                "b": null,
                "c":null,
                "d":null,
                "aL":null,
                "bL":null,
                "cL":null,
                "dL":null
            }
        };
        recArray.push(JSON.stringify(Add2));
        const Add3 = {
            "id": 100,
            "label": null,
            "price": null,
            "oldprice": null,
            "type": "boots",
            "images":{
                "a":null,
                "b": null,
                "c":null,
                "d":null,
                "aL":null,
                "bL":null,
                "cL":null,
                "dL":null
            }
        };
        recArray.push(JSON.stringify(Add3));
        localStorage.setItem('recViewed', JSON.stringify(recArray));
    }

    //

    const par3 = document.querySelector('#appPar3');

    for(let i =0;i<3;i++)
    {               
        curRecObj = JSON.parse(recArray[i]);        
        CreateCard(curRecObj.id,curRecObj.type,'32.5%','100%',par3);
    }
    
    
}*/




function PopRecent()
{
    // get the recently veiwed array
    let recArray;
    recArray = JSON.parse(localStorage.getItem('recViewed')); 

    // if it doesn't exist, pop default //latest arrivals perhaps
    if(recArray == null)
    {         
        recArray = [];   
        const Add1 = {
            "id": 9901,
            "label": null,
            "price": null,
            "oldprice": null,
            "type": "clothing",
            "images":{
                "a":null,
                "b": null,
                "c":null,
                "d":null,
                "aL":null,
                "bL":null,
                "cL":null,
                "dL":null
            }
        };        
        recArray.push(JSON.stringify(Add1));
        const Add2 = {
            "id": 9200,
            "label": null,
            "price": null,
            "oldprice": null,
            "type": "accessories",
            "images":{
                "a":null,
                "b": null,
                "c":null,
                "d":null,
                "aL":null,
                "bL":null,
                "cL":null,
                "dL":null
            }
        };
        recArray.push(JSON.stringify(Add2));
        const Add3 = {
            "id": 9104,
            "label": null,
            "price": null,
            "oldprice": null,
            "type": "boots",
            "images":{
                "a":null,
                "b": null,
                "c":null,
                "d":null,
                "aL":null,
                "bL":null,
                "cL":null,
                "dL":null
            }
        };
        recArray.push(JSON.stringify(Add3));
        localStorage.setItem('recViewed', JSON.stringify(recArray));
    }

    //

    const par3 = document.querySelector('#appPar3');

    for(let i =0;i<3;i++)
    {               
        curRecObj = JSON.parse(recArray[i]);        
        CreateCard(curRecObj.id,curRecObj.type,null,'32.5%','100%',par3);
    }
    
    
}