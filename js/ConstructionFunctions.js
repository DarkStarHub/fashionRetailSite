

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
    const par = document.querySelector('#appPar');
        CreateCard(300,"clothing",'32.5%','100%',par);
        CreateCard(200,"accessories",'32.5%','100%',par);
        CreateCard(100,"boots",'32.5%','100%',par);

        const par2 = document.querySelector('#appPar2');
        CreateInsetLabel('72%','2%','25%','16%',par2,
        "Alexander Julian", "Fall Collection","Learn more");
}





document.addEventListener('keydown', function(e){
    if(e.key === '1')
    { 
        //TestLoad();
        BuildPage();
    }  
});


document.addEventListener('keydown', function(e){
    if(e.key === 'e')
    { 
        //console.log(dataBase.items[0]);
        console.log(dataBase);
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
        console.log(disc);        
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











