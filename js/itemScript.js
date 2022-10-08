
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
let curItemObj;

let dept;

/*
let bagB = document.querySelector('#bagID');
let bagModal = document.querySelector('#bagModalID');
let modalInner = document.querySelector('#modalInnerID');
let bagtotalSpan = document.querySelector('#bagTotalID');

let bagOpen = false;

let bagTotal = 0;*/



const mainImg = document.querySelector('#mainImg');
const fImg = document.querySelector('#fsimg');
const rImg = document.querySelector('#rsimg');
const lbl = document.querySelector('#labelId');
const iType = document.querySelector('#itemType');
//const oPrice = document.querySelector('#oldPId');            
const price = document.querySelector('#priceId');

const priceBox = document.querySelector('#priceBox');

const addButton = document.querySelector('#addButtonID');

const mLink = document.querySelector('#mId');
const wLink = document.querySelector('#wId');


const chatHook = document.querySelector('#bdy');
const searchButton = document.querySelector('#searchId');


const getData = async () => {

    let response = await fetch('./combDB.json');
    
    
    
    const data = await response.json();
    dataBase = data; 
    //ProcessData();   
    //return db;
    dept = localStorage.getItem('department'); 

    SetLinks();


    BuildPage()
};

getData();

function BuildPage()
{
    /*
    const par = document.querySelector('#appPar');
    CreateCard(300,"clothing",'32.5%','100%',par);
    CreateCard(200,"accessories",'32.5%','100%',par);
    CreateCard(100,"boots",'32.5%','100%',par);

    const par2 = document.querySelector('#appPar2');
    CreateInsetLabel('72%','2%','25%','16%',par2,
    "Alexander Julian", "Fall Collection","Learn more"); 
    CreateCarousel(); */

    
        
    
    //curItemObj = GetObjByPureId(sessionStorage.getItem("itemId"));
    PopPage();

    PopRecent();
    
    //const par3 = document.querySelector('#appPar3');
    //CreateCard(300,"clothing",'32.5%','100%',par3);
    //CreateCard(200,"accessories",'32.5%','100%',par3);
    //CreateCard(100,"boots",'32.5%','100%',par3);   
    

    addButton.addEventListener("click", event =>{     
        //AddItem();

        
        newAdd = JSON.parse(JSON.stringify(curItemObj));
        newAdd.quantity = 1;
        DupeCheck(newAdd);        
     }); 
         
     CreateSearchPop(chatHook,searchButton);   
}


function SetLinks()
{
    if(localStorage.getItem('department') == "men")
    {
        mLink.className = '';
        mLink.classList.add("--fnt-mon-b","--fnt-us","cp");
        wLink.className = '';
    }
    else
    {
        mLink.className = '';
         wLink.className = '';
        wLink.classList.add("--fnt-mon-b","--fnt-us","cp");
    }

}



/*
document.addEventListener('keydown', function(e){
    if(e.key === '1')
    { 
        //TestLoad();
       window.localStorage.clear();
    }  
});


document.addEventListener('keydown', function(e){
    if(e.key === 'e')
    { 
        //console.log(dataBase.items[0]);
        ClearbagDOM();
    }  
});*/


// Create our number formatter.
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});





function PopPage()
{
    curItemObj = GetObjByPureId(sessionStorage.getItem("itemId"));

    mainImg.src = curItemObj.images.a;
    fImg.src = curItemObj.images.a;
    rImg.src = curItemObj.images.b;
    lbl.innerHTML = curItemObj.label;
    iType.innerHTML = curItemObj.type;

    if(curItemObj.oldprice != null)
    {
        const oPBox = document.createElement('div');
        oPBox.classList.add("--f-row-align");

        const oP = document.createElement('span');
        oP.classList.add("--fnt-f13");
        oP.innerHTML = formatter.format(curItemObj.oldprice);
        oP.classList.add("--fnt-st","--mr-r05");
        oPBox.append(oP);

        const discP = document.createElement('span');
        discP.classList.add("--fnt-f13");
        let disc = (curItemObj.oldprice-curItemObj.price)/curItemObj.oldprice;
        disc = Math.round(disc*100);
        discP.innerHTML = disc+ "% OFF";  
        oPBox.append(discP);
        
        
        //priceBox.append(oPBox);
        priceBox.insertBefore(oPBox, priceBox.children[0]);
    }

    

    let disc = (curItemObj.oldprice-curItemObj.price)/curItemObj.oldprice;
    disc = Math.round(disc*100); 
    

    price.innerHTML = formatter.format(curItemObj.price);


    //update recently viewed
    UpdateRecView();

}











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
    s1.classList.add("--rsp-font");
    copyBox.append(s1);

    const s2 = document.createElement('span');
    s2.innerHTML = m2;
    s2.classList.add("--rsp-font-smaller");
    copyBox.append(s2);

    const s3 = document.createElement('span');
    s3.innerHTML = m3;
    s3.classList.add("--rsp-font-underscore");
    copyBox.append(s3);

    par.append(newLbl);
}





/*
function GetObjById(id,type)
{
    if(dataBase[type] == null)
    {
        return null;
    }    
    for(let i =0;i<dataBase[type].length;i++)
    {        
        if(dataBase[type][i].id == id)
        {            
            return dataBase[type][i];
            break;
        }
    }
    return null;
}*/


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





//// image select





fImg.addEventListener("click", event =>{     
    //ChangeCurItem(fImg.getAttribute("data-item"));
    rImg.classList.remove("--BB");
    fImg.classList.add("--BB");
    mainImg.src = fImg.getAttribute('src');
    //console.log(fImg.getAttribute('src'));
});

rImg.addEventListener("click", event =>{     
    //ChangeCurItem(fImg.getAttribute("data-item"));
    fImg.classList.remove("--BB");
    rImg.classList.add("--BB");
    mainImg.src = rImg.getAttribute('src');
    //console.log(fImg.getAttribute('src'));
});


function UpdateRecView()
{
    let recArray;
    recArray = JSON.parse(localStorage.getItem('recViewed')); 

    // if it doesn't exist, pop default //latest arrivals perhaps
    if(recArray == null)
    {         
        recArray = [];   
        const Add1 = curItemObj;
        console.log(Add1)  ;
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

    //shuffle the new item into the array

    console.log(curItemObj,JSON.parse(recArray[0]))

    if(curItemObj.id != JSON.parse(recArray[0]).id)
    {
        recArray[2] = recArray[1];
        recArray[1] = recArray[0]
        recArray[0] = JSON.stringify(curItemObj);
        localStorage.setItem('recViewed', JSON.stringify(recArray));
    }
    
}




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
        CreateCard(curRecObj.id,curRecObj.type,null,'32.5%','100%',par3);
    }
    
    
}








