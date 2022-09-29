
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




const getData = async () => {
    const response = await fetch('./myDB.json');
    const data = await response.json();
    dataBase = data; 
    //ProcessData();   
    //return db;
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


    
    const par3 = document.querySelector('#appPar3');
    CreateCard(300,"clothing",'32.5%','100%',par3);
    CreateCard(200,"accessories",'32.5%','100%',par3);
    CreateCard(100,"boots",'32.5%','100%',par3);   
    

    addButton.addEventListener("click", event =>{     
        //AddItem();

        
        newAdd = JSON.parse(JSON.stringify(curItemObj));
        newAdd.quantity = 1;
        DupeCheck(newAdd);        
     }); 
    
     /*
    bagB.addEventListener("click", event =>{     
        ToggleBag();
     });*/   
     
     
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








function CreateCard(id,type,wd,ht,parent)
{
    let itemObj =  GetObjById(id,type)    
    if(itemObj == null)
    {
        return; //item not found
    }

    //create the card div
    const newDiv = document.createElement('div');
    newDiv.style.width = wd;
    newDiv.style.height = ht;   
    newDiv.style.backgroundColor = 'white' 
    newDiv.style.justifyContent = 'space-between';
    newDiv.classList.add("--f-col");  

    const img = document.createElement('img');      
    img.src = itemObj.images.a;
    img.classList.add("--img-full-wid");
    newDiv.append(img);

    const copyBox = document.createElement('div');
    copyBox.style.width = '100%';
    copyBox.style.height = '13vw';
    copyBox.style.position = 'relative';
    copyBox.style.alignSelf = 'flex-end';
    copyBox.classList.add("--f-col-align");
    copyBox.classList.backgroundColor = 'white';
    newDiv.append(copyBox);


    const s1 = document.createElement('span');
    s1.style.marginTop = '5%'
    s1.style.fontSize = '2vw'
    s1.innerHTML = itemObj.label;
    copyBox.append(s1);

    const tp = document.createElement('span');
    tp.style.marginTop = '7%'
    tp.style.fontSize = '1.6vw'
    tp.innerHTML = itemObj.type;
    copyBox.append(tp);

    if(itemObj.oldprice != null)
    {
        const sOp = document.createElement('span');
        sOp.style.marginTop = '2%'
        sOp.style.fontSize = '1.6vw'
        let disc = (itemObj.oldprice-itemObj.price)/itemObj.oldprice;
        disc = Math.round(disc*100);         
        sOp.innerHTML = formatter.format(itemObj.oldprice);
        sOp.classList.add("--fnt-st")
        copyBox.append(sOp);
    }

    const s2 = document.createElement('span');
    s2.style.marginTop = '2%'
    s2.style.fontSize = '1.6vw'
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
}


function GetObjByPureId(id)
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

    recArray[2] = recArray[1];
    recArray[1] = recArray[0]
    recArray[0] = JSON.stringify(curItemObj);

    localStorage.setItem('recViewed', JSON.stringify(recArray));
}















/*
function ChangeCurItem(inc){
    curItemId = inc;
};*/






//// carousel
//const gsap = window.gsap;








/*
function ToggleBag(){
    if(!bagOpen)
    {         
        PopBagModal();
        bagModal.style.visibility = "visible"
        bagOpen = true;        
    }
    else{
        //ClearbagDOM();
        bagModal.style.visibility = "hidden"
        bagOpen = false;  
    }
}


function PopBagModal()
{
    // get the local storage

    //console.log(JSON.parse(window.localStorage[0]).id); 
    
    ClearbagDOM();

    const iter = window.localStorage.length;
    //PopModalItem(JSON.parse(window.localStorage[0]));
    
    
    if(iter >0)
    {
        bagTotal = 0;
        for(let i = 0;i<iter;i++)
        {
            const itemObj = JSON.parse(window.localStorage[i]);            
            PopModalItem(itemObj);
            bagTotal+=itemObj.price
        }
    }
    bagtotalSpan.innerHTML = bagTotal;

}


function PopModalItem(inc)
{    
    const newDiv = document.createElement('div');
    newDiv.classList.add("--w100","--f-col");
    newDiv.setAttribute('id', 'bagItem');

    const itemRow = document.createElement('div');
    itemRow.classList.add("--w100","--f-row","--RB");
    newDiv.append(itemRow);

    const itemLeft = document.createElement('div');
    itemLeft.classList.add("--w25","--RB");
    itemRow.append(itemLeft);

    const img = document.createElement('img');   
    img.src = inc.images.a
    img.classList.add("--w100");
    itemLeft.append(img);

    const itemRight = document.createElement('div');
    itemRight.classList.add("--w75","--f-col")
    itemRow.append(itemRight);

    const s1 = document.createElement('span');
    s1.innerHTML = inc.label;
    itemRight.append(s1);

    const s2 = document.createElement('span');
    s2.innerHTML = inc.type;
    itemRight.append(s2);

    const s3 = document.createElement('span');
    s3.innerHTML = formatter.format(inc.price);
    itemRight.append(s3);


    const lineDiv = document.createElement('div');
    lineDiv.classList.add("--w100","--mtb-r1","--f-centered")
    const line = document.createElement('div');
    line.classList.add("--w100","line-break")
    lineDiv.append(line);
    newDiv.append(lineDiv);

    modalInner.append(newDiv);
}


function AddItem()
{
    const index = window.localStorage.length;
    
    window.localStorage.setItem(index, JSON.stringify(curItemObj));
    //console.log(window.localStorage);
    PopBagModal();
}


function ClearbagDOM()
{
    const collection = document.querySelectorAll('#bagItem');
    //console.log(allItems);
    
    for (let i = 0; i < collection.length; i++) {
        const elem = collection[i];
        elem.parentNode.removeChild(elem);
    }

}*/








