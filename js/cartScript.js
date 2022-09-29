

let dataBase;



const bagDisp = document.querySelector('#bagDispID'); 
const shipTotalDisp = document.querySelector('#shipTotalID'); 
const subTotalDisp = document.querySelector('#subTID');  
const totalDisp = document.querySelector('#totalID');     

let bagTotalSum = 0;
let shippingTotal = 0;


const shipGroupForm = document.querySelector('#shipGID'); 
shipGroupForm.addEventListener('change', function(e){
    var btn = valButton(shipGroupForm.shipGroup);
    localStorage.setItem('shipOption', btn);
    BuildCheckOutDisp()
    //console.log(localStorage);
});


const standard = document.querySelector('#standard');
const express = document.querySelector('#express');
const overnight = document.querySelector('#overnight');






const getData = async () => {
    const response = await fetch('./myDB.json');
    const data = await response.json();
    dataBase = data; 
    //ProcessData();   
    //return db;
    BuildPage();
};

getData();

function BuildPage()
{   
    BuildCheckOutDisp();    
}



document.addEventListener('keydown', function(e){
    if(e.key === '1')
    { 
        //TestLoad();
        console.log(localStorage['bagData']);
    }  
});

/*
document.addEventListener('keydown', function(e){
    if(e.key === '2')
    { 
        //TestLoad();
        localStorage.setItem('shipOption', 9.99);
    }  
});

document.addEventListener('keydown', function(e){
    if(e.key === '3')
    { 
        //TestLoad();
        localStorage.removeItem('shipOption');
    }  
});*/






var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});






function BuildCheckOutDisp()
{
    ClearCheckOutDOM();

    

    if(localStorage.getItem('shipOption') == null)
    {
        standard.checked =  true;
        var btn = valButton(shipGroupForm.shipGroup);
        localStorage.setItem('shipOption', btn);             
    }
    else
    {
        if(localStorage.getItem('shipOption') == 9.99)
        {
            express.checked =  true;
        }
        else
        {
            overnight.checked = true;
        }

    }

    shippingTotal = localStorage.getItem('shipOption');    


    //const iter = window.localStorage.length;
    const bagArray = JSON.parse(localStorage.getItem('bagData')); 
    //console.log(iter)
    //PopModalItem(JSON.parse(window.localStorage[0]));

    bagTotalSum = 0;
    
    
    //if(iter >0)
    if(bagArray.length >0)
    {
        //bagTotalSum = 0;
        for(let i = 0;i<bagArray.length;i++)
        {
            const itemObj = JSON.parse(bagArray[i]);            
            AddCheckOutItem(itemObj,i);
            bagTotalSum+=itemObj.price*itemObj.quantity
        }
    }

    
    subTotalDisp.innerHTML = formatter.format(bagTotalSum);

    if(shippingTotal == 0)
    {
        shipTotalDisp.innerHTML = "FREE";
    }   
    else
    {
        shipTotalDisp.innerHTML = formatter.format(shippingTotal);
    }

    
    totalDisp.innerHTML = formatter.format((bagTotalSum+ Number(shippingTotal)));    

}



function AddCheckOutItem(inc, index)
{
    const newDiv = document.createElement('div');
    newDiv.classList.add("--pd-box","--bg-lr","--w96:","--mb-r1");
    newDiv.setAttribute('id', 'checkoutItemID');
    newDiv.dataset.index = index;

    const inner = document.createElement('div');
    inner.classList.add("--w100","--f-row")
    newDiv.append(inner);

    const img = document.createElement('img');   
    img.src = inc.images.a;
    img.classList.add("--hr18");
    inner.append(img);

    const textDiv = document.createElement('div');
    textDiv.classList.add("--ml-r2","--w100","--hp100","--f-col");
    inner.append(textDiv);

    const s1 = document.createElement('span');
    s1.classList.add("--fnt-r20","--fnt-w600");
    s1.innerHTML = inc.label;
    textDiv.append(s1);

    const s2 = document.createElement('span');
    s2.classList.add("--fnt-r18","--mt-r05");
    s2.innerHTML = inc.type;
    textDiv.append(s2);

    const s3 = document.createElement('span');
    s3.classList.add("--fnt-r20","--fnt-w500","--mt-r1")
    s3.innerHTML = "size,color, ect";
    textDiv.append(s3);    

    const priceDiv = document.createElement('div');
    priceDiv.classList.add("--w100","--f-row-align","--f-jsb","--mt-r2");
    textDiv.append(priceDiv);


    const s4 = document.createElement('span');
    s4.classList.add("--fnt-r16","--fnt-w600");
    s4.innerHTML = formatter.format(inc.price);
    priceDiv.append(s4);

    /*
    const subTDiv = document.createElement('div');
    subTDiv.classList.add("--f-row","--f-jsb")
    price.append(subTDiv);*/

    const sQnt = document.createElement('span'); 
    sQnt.classList.add("--fnt-r20")
    sQnt.innerHTML = "Qty "+ inc.quantity;
    priceDiv.append(sQnt);

    const subT = document.createElement('span');   
    subT.classList.add("--fnt-r16","--fnt-w600");
    subT.innerHTML = formatter.format(inc.price*inc.quantity);
    priceDiv.append(subT);




    
    const sR = document.createElement('span');
    sR.classList.add("cp","--fnt-r14","--fnt-w600","--mt-r4");
    sR.innerHTML = "Remove from bag";
    textDiv.append(sR);
    sR.addEventListener('click', function(e){
         RemoveFromStorage(inc);
    });



    /*
    const qDiv = document.createElement('div');
    qDiv.classList.add("--ml-r2","--fg1","--hp100","--f-col","--RB");
    inner.append(qDiv);*/


    

    
    


    /*
    const remDiv = document.createElement('div');    
    remDiv.classList.add("--f-row")
    qDiv.append(remDiv);*/

    

    /*
    const sW = document.createElement('span');
    sW.innerHTML = "move to wishlist";
    remDiv.append(sW); */  


    bagDisp.append(newDiv);
}




function RemoveFromStorage(inc)
{
    
    bagArray2 = JSON.parse(localStorage.getItem('bagData')); 

    const ind = GetIndexByObj(inc);
    
    
    // if it has a quantity of 1, remove it
    //if((JSON.parse(window.localStorage[ind]).quantity) == 1)
    if((JSON.parse(bagArray2[ind])).quantity == 1)
    {
        //window.localStorage.removeItem(ind);
        bagArray2.splice(ind,1);        
        localStorage.setItem('bagData', JSON.stringify(bagArray2));
        BuildCheckOutDisp();
        return;
    }
      
    if((JSON.parse(bagArray2[ind])).quantity > 1)
    {
        console.log("this");
        const modObj = JSON.parse(bagArray2[ind]);
        modObj.quantity = modObj.quantity-1;
        bagArray2[ind] = JSON.stringify(modObj);
        localStorage.setItem('bagData', JSON.stringify(bagArray2));
        BuildCheckOutDisp();
        return;
    }   
  
}




function GetIndexByObj(inc)
{
     //console.log("inc dupeCheckNew",inc)
     let bagDataObj;
     if (localStorage.getItem('bagData') && localStorage.getItem('bagData').length > 0)
     {        
         bagDataObj = JSON.parse(localStorage.getItem('bagData')); 
         //console.log("existing", bagDataObj);
     }
     else// bagData is 0 or doesn't exist yet
     {
         //console.log("0 or not existing")
         bagDataObj = [];
         bagDataObj.push(JSON.stringify(inc));
         localStorage.setItem('bagData', JSON.stringify(bagDataObj));
         return
     }
 
     //bag data was found
     //console.log("data found   length",bagDataObj.length)
 
     //if(window.localStorage.length>0)
     //{
     for(let i=0;i<bagDataObj.length;i++)
     {
         const storedItem = JSON.parse(bagDataObj[i]);  
         //console.log(storedItem);         
 
         if(inc.id != storedItem.id)
         {
             continue;
         }
 
         //matched id's with something
         if(inc.label != storedItem.label)
         {
             // not dupe, continue
             continue;                          
         }
         if(inc.type != storedItem.type)
         {
             // not dupe, continue
             continue;    
         }
         if(inc.price != storedItem.price)
         {
             // not dupe, continue
             continue;    
         }
 
         //console.log("found a dupe");
         //if it gets here, it's a dupe. update the quantity
        
         return i;           
     }
     //}
 
     //didn't match id's with anything in storage
     return null;
}







function RemoveFromBag(inc)
{
    console.log(inc);
    inc.parentNode.removeChild(inc);
}



function ClearCheckOutDOM()
{
    const collection = document.querySelectorAll('#checkOutItemID');
    //console.log(allItems);
    
    for (let i = 0; i < collection.length; i++) {
        const elem = collection[i];
        elem.parentNode.removeChild(elem);
    }
}





//radio buttons




function valButton(btn) {
    var cnt = -1;
    for (var i=btn.length-1; i > -1; i--) {
        if (btn[i].checked) {cnt = i; i = -1;}
    }
    if (cnt > -1) return btn[cnt].value;
    else return null;
}








 /*
var btn = valButton(shipGroupForm.shipGroup);
if (btn == null) alert('No radio button selected');
else alert('Button value ' + btn + ' selected');*/


