
/*
const bagObj = 
{
    "id": null,
    "label": null,
    "price": null,
    "oldprice": null,
    "type": null,
    "images":
    {
        "a":null,
        "b": null,     
    },
    "quantity":null
}*/





let bagB = document.querySelector('#bagID');
let hook = document.querySelector('#bagModalHook');

/*
let bagModal = document.querySelector('#bagModalID');
let modalInner = document.querySelector('#modalInnerID');
let bagtotalSpan = document.querySelector('#bagTotalID');*/


let bagModal,modalInner,bagtotalSpan;


let bagOpen = false;
let bagTotal = 0;


bagB.addEventListener("click", event =>{      
    ToggleBag();
 }); 


/*
 document.addEventListener('keydown', function(e){
    if(e.key === '1')
    { 
        //TestLoad();
       console.log(window.localStorage['bagData']);
    }  
});

document.addEventListener('keydown', function(e){
    if(e.key === '2')
    { 
        //TestLoad();
       console.log(window.localStorage.clear());
    }  
});


document.addEventListener('keydown', function(e){
    if(e.key === '3')
    { 
        injItemObj = 
        {
            "id": 104,
            "label": "DOLCE & GABBANA",
            "price": 4301.00,
            "oldprice": 6277.00,
            "type": "Jacket",
            "images":{
                "a":"./assets/imgs/coats/104f.jpg",
                "b":"./assets/imgs/coats/104r.jpg",
                "c":null,
                "d":null,
                "aL":"./assets/imgs/coats/104fb.jpg",
                "bL":"./assets/imgs/coats/104rb.jpg",
                "cL":null,
                "dL":null
            },
            "quantity":1
        }

        //const index = window.localStorage.length;

        //window.localStorage.setItem(index, JSON.stringify(injItemObj));
        

        DupeCheck(injItemObj);
    }  
});
*/



/*
document.addEventListener('keydown', function(e){
    if(e.key === '1')
    { 
        //TestLoad();
       window.localStorage.clear();
    }  
});

document.addEventListener('keydown', function(e){
    if(e.key === '2')
    { 
        injItemObj = 
        {
            "id": 104,
            "label": "DOLCE & GABBANA",
            "price": 4301.00,
            "oldprice": 6277.00,
            "type": "Jacket",
            "images":{
                "a":"./assets/imgs/coats/104f.jpg",
                "b":"./assets/imgs/coats/104r.jpg",
                "c":null,
                "d":null,
                "aL":"./assets/imgs/coats/104fb.jpg",
                "bL":"./assets/imgs/coats/104rb.jpg",
                "cL":null,
                "dL":null
            },
            "quantity":1
        }

        //const index = window.localStorage.length;

        //window.localStorage.setItem(index, JSON.stringify(injItemObj));
        

        DupeCheck(injItemObj);
    }  
});

document.addEventListener('keydown', function(e){
    if(e.key === '3')
    { 
        //TestLoad();    
       console.log("local storage",window.localStorage);
       //console.log(JSON.parse(window.localStorage[0]).id);
    }  
});


document.addEventListener('keydown', function(e){
    if(e.key === 'e')
    { 
        //console.log(dataBase.items[0]);
        ClearbagDOM();
    }  
});
*/

CreateModal();

function CreateModal(){

    const modDiv = document.createElement('div');
    modDiv.classList.add("bag-modal","--pd-box-f10");
    modDiv.setAttribute('id', 'bagModalID');
    bagModal = modDiv;

    const innerDiv = document.createElement('div');
    innerDiv.classList.add("--full","--bg-lr","--f-col");
    modDiv.append(innerDiv);

    const s1 = document.createElement('span');
    s1.innerHTML = "SHOPPING BAG";
    s1.classList.add("--fnt-bcal-r","--fnt-f14","--fnt-w700","--mt-f20","--mb-f5","--txt-cent");
    innerDiv.append(s1);

    const lineDiv = document.createElement('div');
    lineDiv.classList.add("--w100","--mt-f10","--f-centered")
    const line = document.createElement('div');
    line.classList.add("--w100","line-break")
    lineDiv.append(line);
    innerDiv.append(lineDiv);

    const scrollDiv = document.createElement('div');
    scrollDiv.classList.add("--w100","--hf260","modal_scroll");
    innerDiv.append(scrollDiv);


    const scroll = document.createElement('div');
    scroll.classList.add("--w100");
    scrollDiv.append(scroll);

    const scrollInner = document.createElement('div');
    scrollInner.classList.add("--w100","--f-col","--bg-w");
    scrollInner.setAttribute('id','modalInnerID');
    scroll.append(scrollInner);
    modalInner = scrollInner;

    /*
    const lineDiv2 = document.createElement('div');
    lineDiv2.classList.add("--w100","--f-centered")
    const line2 = document.createElement('div');
    line2.classList.add("--w100","line-break")
    lineDiv2.append(line2);
    innerDiv.append(lineDiv2);*/


    const totDivWrap = document.createElement('div');
    totDivWrap.classList.add("--W100","--f-col-centered");
    innerDiv.append(totDivWrap);


    const totDiv = document.createElement('div');
    totDiv.classList.add("--W90","--f-row","--f-jsb","--mtb-f10");
    totDivWrap.append(totDiv);

    const sTot = document.createElement('span');
    sTot.classList.add("--fnt-f14","--fnt-w600");
    sTot.innerHTML = "Total";
    totDiv.append(sTot);

    const sTId = document.createElement('span');
    //sTId.innerHTML = "Total";
    sTId.classList.add("--fnt-f12","--fnt-w600");
    sTId.setAttribute('id', 'bagTotalID');
    totDiv.append(sTId);
    bagtotalSpan = sTId;


    const butAnc = document.createElement('a');
    butAnc.href = "cart.html"
    innerDiv.append(butAnc);

    const cBut = document.createElement('button');
    cBut.classList.add("btn","modal-bag-btn","--fnt-w","cp");
    cBut.innerHTML = "GO TO SHOPPING BAG";
    butAnc.append(cBut);

    hook.append(modDiv);

}






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

/*
function PopBagModalOld()
{    
    
    ClearbagDOM();

    const iter = window.localStorage.length;     
    
    
    if(iter >0)
    {
        bagTotal = 0;
        for(let i = 0;i<iter;i++)
        {            
            const itemObj = JSON.parse(window.localStorage[i]); 
            PopModalItem(itemObj);
            bagTotal+=itemObj.price*itemObj.quantity            
        }
    }
    bagtotalSpan.innerHTML = formatter.format(bagTotal);
}*/

function PopBagModal()
{    
    let bagDataObj2;
    
    ClearbagDOM();

    //const iter = localStorage.getItem('bagData').length; 
    bagDataObj2 = JSON.parse(localStorage.getItem('bagData')); 

    if(bagDataObj2 == null)// nothing in the localstorage
    {
        return;
    }
    
    
    if(bagDataObj2.length >0)
    {
        bagTotal = 0;
        for(let i = 0;i<bagDataObj2.length;i++)
        {            
            const itemObj = JSON.parse(bagDataObj2[i]); 
            PopModalItem(itemObj);
            bagTotal+=itemObj.price*itemObj.quantity                      
        }
    }
    bagtotalSpan.innerHTML = formatter.format(bagTotal);
}




function PopModalItem(inc)
{       
    //console.log("popModalItem",JSON.stringify(inc))
    const newDiv = document.createElement('div');
    newDiv.classList.add("--w100","--f-col","--mt-f10");
    newDiv.setAttribute('id', 'bagItem');

    const itemRow = document.createElement('div');
    itemRow.classList.add("--w100","--f-row","--f-jsb");
    newDiv.append(itemRow);

    const itemLeft = document.createElement('div');
    itemLeft.classList.add("--w25");
    itemRow.append(itemLeft);

    const img = document.createElement('img');   
    img.src = inc.images.a
    img.classList.add("--w100","--GB");
    itemLeft.append(img);

    const itemRight = document.createElement('div');
    itemRight.classList.add("--w73","--f-col")
    itemRow.append(itemRight);

    const s1 = document.createElement('span');
    s1.classList.add("--fnt-f11","--fnt-w600");
    s1.innerHTML = inc.label;
    itemRight.append(s1);

    const s2 = document.createElement('span');
    s2.classList.add("--fnt-f11","--mt-f5");
    s2.innerHTML = inc.type;
    itemRight.append(s2);


    spanDiv = document.createElement('div');
    spanDiv.classList.add("--w90","--f-row-align","--f-jsb","--mt-f5");
    itemRight.append(spanDiv);


    const s3 = document.createElement('span');
    s3.classList.add("--fnt-f11","--fnt-w600");
    s3.innerHTML = formatter.format(inc.price);
    spanDiv.append(s3);

    const sQnt = document.createElement('span');
    sQnt.classList.add("--fnt-f11");
    sQnt.innerHTML = "Qty " + inc.quantity;
    spanDiv.append(sQnt);




    const lineDiv = document.createElement('div');
    lineDiv.classList.add("--w100","--mt-f10","--f-centered")
    const line = document.createElement('div');
    line.classList.add("--w100","line-break")
    lineDiv.append(line);
    newDiv.append(lineDiv);

    modalInner.append(newDiv);
}




function ClearbagDOM()
{
    const collection = document.querySelectorAll('#bagItem');
    //console.log(allItems);
    
    for (let i = 0; i < collection.length; i++) {
        const elem = collection[i];
        elem.parentNode.removeChild(elem);
    }
}


//need to check the incoming against every item in local storage

// if the id's don't match, skip

//if the id's match, check for dupe

//if not a dupe, check next items for dupe

// if no dupes found in any item, add it as new


/*
function DupeCheckOld(inc) // true if a dupe
{    
    if(window.localStorage.length>0)
    {
        for(let i=0;i<window.localStorage.length;i++)
        {
            const storedItem = JSON.parse(window.localStorage[i]);            

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

            //if it gets here, it's a dupe. update the quantity
            storedItem.quantity = storedItem.quantity+1;              
            window.localStorage.setItem(i, JSON.stringify(storedItem)); 
            PopBagModal();
            return;           
        }
    }

    //didn't match id's with anything in storage
    const index = window.localStorage.length;            
    window.localStorage.setItem(index, JSON.stringify(inc)); 
    PopBagModal();    
}
*/





function DupeCheck(inc) // true if a dupe
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
        storedItem.quantity = storedItem.quantity+1; 
        bagDataObj[i]= JSON.stringify(storedItem);

        window.localStorage.removeItem('bagData');
        window.localStorage.setItem('bagData', JSON.stringify(bagDataObj)); 
        PopBagModal();
        return;           
    }
    //}

    //didn't match id's with anything in storage
    //console.log("wasn't a dupe",inc)
    bagDataObj.push(JSON.stringify(inc));

    //const index = window.localStorage.length;            
    window.localStorage.setItem('bagData', JSON.stringify(bagDataObj)); 
    PopBagModal();    
}





/*
function SetStorage(ind,inc)
{
    let dataObject;    

    if (localStorage.getItem('bagData') && localStorage.getItem('bagData').length > 0)
    {
        dataObject = JSON.parse(localStorage.getItem('bagData')); 

        if(ind == null)// no index provided, push onto array
        {           
            dataObject.push(inc);           
        }
        else// splice at index
        {
            dataObject.splice(ind, 0, inc);
        }

        
    }
    else// no bag data yet
    {
        dataObject = [];
        dataObject.push(JSON.stringify(inc));
    }


    localStorage.setItem('bagData', JSON.stringify(dataObject));
}*/





