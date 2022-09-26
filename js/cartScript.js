

let dataBase;



const bagDisp = document.querySelector('#bagDispID'); 
const shipTotalDisp = document.querySelector('#shipTotalID'); 
const subTotalDisp = document.querySelector('#subTID');  
const totalDisp = document.querySelector('#totalID');     

let bagTotalSum = 0;
let shippingTotal = 0;







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
    if(e.key === '5')
    { 
        //TestLoad();
       ClearCheckOutDOM();
    }  
});



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

    const iter = window.localStorage.length;
    console.log(iter)
    //PopModalItem(JSON.parse(window.localStorage[0]));
    
    
    if(iter >0)
    {
        bagTotalSum = 0;
        for(let i = 0;i<iter;i++)
        {
            const itemObj = JSON.parse(window.localStorage[i]);            
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

    totalDisp.innerHTML = formatter.format(bagTotalSum+shippingTotal);    

}



function AddCheckOutItem(inc, index)
{
    const newDiv = document.createElement('div');
    newDiv.classList.add("--pd-box","--bg-lr","--w96:","--mb-r1");
    newDiv.setAttribute('id', 'checkoutItemID');
    newDiv.dataset.index = index;

    const inner = document.createElement('div');
    inner.classList.add("--w100","--hr15","--f-row-align")
    newDiv.append(inner);

    const img = document.createElement('img');   
    img.src = inc.images.a;
    img.classList.add("--hp100");
    inner.append(img);

    const textDiv = document.createElement('div');
    textDiv.classList.add("--ml-r2","--fg1","--hp100","--f-col");
    inner.append(textDiv);

    const s1 = document.createElement('span');
    s1.innerHTML = inc.label;
    textDiv.append(s1);

    const s2 = document.createElement('span');
    s2.innerHTML = inc.type;
    textDiv.append(s2);

    const s3 = document.createElement('span');
    s3.innerHTML = "size,color, ect";
    textDiv.append(s3);

    const sQnt = document.createElement('span');
    sQnt.innerHTML = "Quantity "+ inc.quantity;
    textDiv.append(sQnt);


    const s4 = document.createElement('span');
    s4.innerHTML = formatter.format(inc.price);
    textDiv.append(s4);

    const remDiv = document.createElement('div');
    remDiv.classList.add("--f-row")
    textDiv.append(remDiv);

    const sR = document.createElement('span');
    sR.classList.add("cp");
    sR.innerHTML = "Remove from bag";
    remDiv.append(sR);
    sR.addEventListener('click', function(e){
         RemoveFromStorage(index);
    });

    const sW = document.createElement('span');
    sW.innerHTML = "move to wishlist";
    remDiv.append(sW);   


    bagDisp.append(newDiv);
}



function removeItem(inc)
{
    //compare inc to every item in local storage
    // if match found, remove it or reduce quantity


}






function RemoveFromStorage(ind)
{
    
    // if it has a quantity of 1, remove it
    if((JSON.parse(window.localStorage[ind]).quantity) == 1)
    {
        window.localStorage.removeItem(ind);
        //window.localStorage.splice(ind,1);
        BuildCheckOutDisp();
        return;
    }
      
    if((JSON.parse(window.localStorage[ind]).quantity) > 1)
    {
        const modObj = JSON.parse(window.localStorage[ind]);
        modObj.quantity = modObj.quantity-1;
        window.localStorage.setItem(ind, JSON.stringify(modObj));
        BuildCheckOutDisp();
        return;
    }
    

    
    
    /*
    if(window.localStorage.length >0)
    {
        bagTotalSum = 0;
        for(let i = 0;i<window.localStorage.length;i++)
        {
            console.log(JSON.parse(window.localStorage[i]).id);

            
            //const itemObj = JSON.parse(window.localStorage[i]);            
            //PopModalItem(itemObj);
            //bagTotal+=itemObj.price
        }
    }*/

    //BuildCheckOutDisp();
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