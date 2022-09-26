
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
    s1.innerHTML = "Shopping bag";
    //s1.classList.add("--fnt-r13","--fnt-w700","--mb-r1");
    innerDiv.append(s1);

    const lineDiv = document.createElement('div');
    lineDiv.classList.add("--w100","--mtb-r1","--f-centered")
    const line = document.createElement('div');
    line.classList.add("--w100","line-break")
    lineDiv.append(line);
    innerDiv.append(lineDiv);

    const scroll = document.createElement('div');
    scroll.classList.add("scrollable","--w100","--hp60");
    innerDiv.append(scroll);

    const scrollInner = document.createElement('div');
    scrollInner.classList.add("--w100","--f-col","--hr40","--bg-w");
    scrollInner.setAttribute('id','modalInnerID');
    scroll.append(scrollInner);
    modalInner = scrollInner;

    const totDiv = document.createElement('div');
    totDiv.classList.add("--f-row","--f-jsb");
    innerDiv.append(totDiv);

    const sTot = document.createElement('span');
    sTot.innerHTML = "Total";
    totDiv.append(sTot);

    const sTId = document.createElement('span');
    //sTId.innerHTML = "Total";
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


function PopBagModal()
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


    spanDiv = document.createElement('div');
    spanDiv.classList.add("--w100","--f-row-align","--f-jfe");
    itemRight.append(spanDiv);


    const s3 = document.createElement('span');
    s3.innerHTML = formatter.format(inc.price);
    spanDiv.append(s3);

    const sQnt = document.createElement('span');
    sQnt.innerHTML = "Quantity " + inc.quantity;
    spanDiv.append(sQnt);




    const lineDiv = document.createElement('div');
    lineDiv.classList.add("--w100","--mtb-r1","--f-centered")
    const line = document.createElement('div');
    line.classList.add("--w100","line-break")
    lineDiv.append(line);
    newDiv.append(lineDiv);

    modalInner.append(newDiv);
}


/*
function AddItem()
{
    const index = window.localStorage.length;
    
    window.localStorage.setItem(index, JSON.stringify(curItemObj));
    


    //console.log(window.localStorage);
    PopBagModal();
}*/

/*
function AddNewItem(inc)
{
    const index = window.localStorage.length;    
    window.localStorage.setItem(index, JSON.stringify(inc));
    PopBagModal();
}*/



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


function DupeCheck(inc) // true if a dupe
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










