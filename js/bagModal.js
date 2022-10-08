
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

let logB = document.querySelector('#logID');


/*
let bagModal = document.querySelector('#bagModalID');
let modalInner = document.querySelector('#modalInnerID');
let bagtotalSpan = document.querySelector('#bagTotalID');*/


let bagModal,modalInner,bagtotalSpan,logModal,logModalInner;


let bagOpen = false;
let logOpen = false;

let logMode = true;

let bagTotal = 0;


bagB.addEventListener("click", event =>{      
    ToggleBag();
}); 

logB.addEventListener("click", event =>{      
    ToggleLog();
}); 


CreateModal();
CreateLoginModal();

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
        logModal.style.visibility = "hidden"
        logOpen = false;  
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







function CreateLoginModal()
{  
    const main = document.createElement('div');
    main.classList.add("login-pop-box","--f-col-align");
    logModal = main;
    //main.style.visibility = "hidden";

    const inner = document.createElement('div');
    inner.classList.add("--w70","--mt-f50");
    main.append(inner);
    logModalInner = inner;

    const optBox = document.createElement('div');
    optBox.classList.add("--w100","--f-row-align","--f-jsb");
    inner.append(optBox);

    const optS1Box = document.createElement('div');
    optS1Box.classList.add("--f-col-align","--w50","cp");
    optBox.append(optS1Box);

    optS1Box.addEventListener("click", event =>{     
        ToggleLogMode(0);
    });

    const s1 = document.createElement('span');
    s1.innerHTML = "SIGN IN";
    optS1Box.append(s1);    


    const s1Line = document.createElement('div');
    s1Line.classList.add("--w100","low-line-thick");
    optS1Box.append(s1Line);



    const optS2Box = document.createElement('div');
    optS2Box.classList.add("--f-col-align","--w50","cp");
    optBox.append(optS2Box);

    optS2Box.addEventListener("click", event =>{     
        ToggleLogMode(1);
    });

    const s2 = document.createElement('span');
    s2.innerHTML = "REGISTER";
    optS2Box.append(s2);


    const s2Line = document.createElement('div');
    s2Line.classList.add("--w100","low-line");
    optS2Box.append(s2Line);




    const imp1 = document.createElement('input');
    imp1.classList.add("--w100","log-input-fld","--mt-f35");
    imp1.type = "text";
    imp1.placeholder="Email"
    inner.append(imp1);


    const imp2 = document.createElement('input');
    imp2.classList.add("--w100","log-input-fld","--mt-f20");
    imp2.type = "text";
    imp2.placeholder="Password"
    inner.append(imp2);


    const s3 = document.createElement('div');
    s3.classList.add("--w100","--fnt-w700","--fnt-us","--fnt-f12","--mt-f10","--txt-r");
    s3.innerHTML = "Forgot Password"
    inner.append(s3);


    const signButton = document.createElement('button');
    signButton.classList.add("login-btn","btn","--mt-f20","--fnt-w");
    signButton.innerHTML = "SIGN IN"
    inner.append(signButton);


    const checkWrap = document.createElement('div');
    checkWrap.classList.add("--w100","--f-row-align","--mt-f10");
    inner.append(checkWrap);

    const checkBox = document.createElement('input');    
    checkBox.type = "checkbox";
    checkWrap.append(checkBox);

    
    const checkS1 = document.createElement('span');
    checkS1.classList.add("--ml-f10","--fnt-f12");
    checkS1.innerHTML = "Keep me signed in";
    checkWrap.append(checkS1);


    const termSpan = document.createElement('div');
    termSpan.classList.add("--w100","--fnt-f10","--mt-f10","--txt-cent");
    termSpan.innerHTML = "By continuing, you agree to our terms and condition & privacy policy"
    inner.append(termSpan);


    hook.append(main);

}


function ToggleLog(){      
    if(!logOpen)
    {           
        bagModal.style.visibility = "hidden"
        bagOpen = false; 
        logModal.style.visibility = "visible"
        logOpen = true;        
    }
    else{
        //ClearbagDOM();
        logModal.style.visibility = "hidden"
        logOpen = false;  
    }
}



function ToggleLogMode(inc)
{
    if(inc == 0)// sign in
    {
        if(logMode == true)
        {
            return;
        }
        else
        {
            logMode = true;
            BuildLogInner();
        }
    }
    else//register
    {
        if(logMode == false)
        {
            return;
        }
        else
        {
            logMode = false;
            BuildRegisterInner();
        }
    }
}

function BuildLogInner()
{
    logModal.className = '';
    logModal.classList.add("login-pop-box","--f-col-align");

    logModalInner.remove();


    const inner = document.createElement('div');
    inner.classList.add("--w70","--mt-f50");
    logModal.append(inner);
    logModalInner = inner;

    const optBox = document.createElement('div');
    optBox.classList.add("--w100","--f-row-align","--f-jsb");
    inner.append(optBox);

    const optS1Box = document.createElement('div');
    optS1Box.classList.add("--f-col-align","--w50","cp");
    optBox.append(optS1Box);

    optS1Box.addEventListener("click", event =>{     
        ToggleLogMode(0);
    });

    const s1 = document.createElement('span');
    s1.innerHTML = "SIGN IN";
    optS1Box.append(s1);


    const s1Line = document.createElement('div');
    s1Line.classList.add("--w100","low-line-thick");
    optS1Box.append(s1Line);

    const optS2Box = document.createElement('div');
    optS2Box.classList.add("--f-col-align","--w50","cp");
    optBox.append(optS2Box);

    optS2Box.addEventListener("click", event =>{     
        ToggleLogMode(1);
    });

    const s2 = document.createElement('span');
    s2.innerHTML = "REGISTER";
    optS2Box.append(s2);

    const s2Line = document.createElement('div');
    s2Line.classList.add("--w100","low-line");
    optS2Box.append(s2Line);

    const imp1 = document.createElement('input');
    imp1.classList.add("--w100","log-input-fld","--mt-f35");
    imp1.type = "text";
    imp1.placeholder="Email"
    inner.append(imp1);

    const imp2 = document.createElement('input');
    imp2.classList.add("--w100","log-input-fld","--mt-f20");
    imp2.type = "text";
    imp2.placeholder="Password"
    inner.append(imp2);
    

    const s3 = document.createElement('div');
    s3.classList.add("--w100","--fnt-w700","--fnt-us","--fnt-f12","--mt-f10","--txt-r");
    s3.innerHTML = "Forgot Password"
    inner.append(s3);

    const signButton = document.createElement('button');
    signButton.classList.add("login-btn","btn","--mt-f20","--fnt-w");
    signButton.innerHTML = "SIGN IN"
    inner.append(signButton);

    const checkWrap = document.createElement('div');
    checkWrap.classList.add("--w100","--f-row-align","--mt-f10");
    inner.append(checkWrap);

    const checkBox = document.createElement('input');    
    checkBox.type = "checkbox";
    checkWrap.append(checkBox);
    
    const checkS1 = document.createElement('span');
    checkS1.classList.add("--ml-f10","--fnt-f12");
    checkS1.innerHTML = "Keep me signed in";
    checkWrap.append(checkS1);

    const termSpan = document.createElement('div');
    termSpan.classList.add("--w100","--fnt-f10","--mt-f10","--txt-cent");
    termSpan.innerHTML = "By continuing, you agree to our terms and condition & privacy policy"
    inner.append(termSpan);

}


function BuildRegisterInner()
{
    logModal.className = '';
    logModal.classList.add("register-pop-box","--f-col-align");


    logModalInner.remove();

    const inner = document.createElement('div');
    inner.classList.add("--w70","--mt-f50");
    logModal.append(inner);
    logModalInner = inner;

    const optBox = document.createElement('div');
    optBox.classList.add("--w100","--f-row-align","--f-jsb");
    inner.append(optBox);

    const optS1Box = document.createElement('div');
    optS1Box.classList.add("--f-col-align","--w50","cp");
    optBox.append(optS1Box);

    optS1Box.addEventListener("click", event =>{     
        ToggleLogMode(0);
    });


    const s1 = document.createElement('span');
    s1.innerHTML = "SIGN IN";
    optS1Box.append(s1);


    const s1Line = document.createElement('div');
    s1Line.classList.add("--w100","low-line");
    optS1Box.append(s1Line);

    const optS2Box = document.createElement('div');
    optS2Box.classList.add("--f-col-align","--w50","cp");
    optBox.append(optS2Box);

    optS2Box.addEventListener("click", event =>{     
        ToggleLogMode(1);
    });

    const s2 = document.createElement('span');
    s2.innerHTML = "REGISTER";
    optS2Box.append(s2);

    const s2Line = document.createElement('div');
    s2Line.classList.add("--w100","low-line-thick");
    optS2Box.append(s2Line);


    const impFirst = document.createElement('input');
    impFirst.classList.add("--w100","log-input-fld","--mt-f35");
    impFirst.type = "text";
    impFirst.placeholder="First name"
    inner.append(impFirst);

    const impLast = document.createElement('input');
    impLast.classList.add("--w100","log-input-fld","--mt-f20");
    impLast.type = "text";
    impLast.placeholder="Last name"
    inner.append(impLast);


    const imp1 = document.createElement('input');
    imp1.classList.add("--w100","log-input-fld","--mt-f20");
    imp1.type = "text";
    imp1.placeholder="Email"
    inner.append(imp1);

    const imp2 = document.createElement('input');
    imp2.classList.add("--w100","log-input-fld","--mt-f20");
    imp2.type = "text";
    imp2.placeholder="Password"
    inner.append(imp2);

    const imp3 = document.createElement('input');
    imp3.classList.add("--w100","log-input-fld","--mt-f20");
    imp3.type = "text";
    imp3.placeholder="Confirm Password"
    inner.append(imp3);

    /*
    const s3 = document.createElement('div');
    s3.classList.add("--w100","--fnt-w700","--fnt-us","--fnt-f12","--mt-f10","--txt-r");
    s3.innerHTML = "Forgot Password"
    inner.append(s3);*/

    const signButton = document.createElement('button');
    signButton.classList.add("login-btn","btn","--mt-f20","--fnt-w");
    signButton.innerHTML = "REGISTER"
    inner.append(signButton);

    /*
    const checkWrap = document.createElement('div');
    checkWrap.classList.add("--w100","--f-row-align","--mt-f10");
    inner.append(checkWrap);

    const checkBox = document.createElement('input');    
    checkBox.type = "checkbox";
    checkWrap.append(checkBox);
    
    const checkS1 = document.createElement('span');
    checkS1.classList.add("--ml-f10","--fnt-f12");
    checkS1.innerHTML = "Keep me signed in";
    checkWrap.append(checkS1);*/

    const termSpan = document.createElement('div');
    termSpan.classList.add("--w100","--fnt-f10","--mt-f10","--txt-cent");
    termSpan.innerHTML = "By continuing, you agree to our terms and condition & privacy policy"
    inner.append(termSpan);

}