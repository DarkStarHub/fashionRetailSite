

let dataBase;

let dept;

let itemArr = [];

let sortMode = 0;
const sortSelect = document.querySelector('#sortSelID');



const itemView = document.querySelector('#itemViewID');
const buildRow = document.querySelector('#buildRowID');

const mLink = document.querySelector('#mId');
const wLink = document.querySelector('#wId');

const catTitle = document.querySelector('#catId');
const sideTitle = document.querySelector('#sideId');


const chatHook = document.querySelector('#bdy');
const searchButton = document.querySelector('#searchId');


var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

sortSelect.onchange = function() {
    //document.getElementById('mytext').value = myselect.value; 
      
    BuildPageWrap(sortSelect.value);
    //console.log(sortSelect.value);
}


const getData = async () => {

    //let response;

    let response = await fetch('./combDB.json');
    
    /*
    if(localStorage['department'] == 'women')
    {        
        dept = "women";
        response = await fetch('./combDB.json');
    }
    else
    {        
        dept = "men";
        response = await fetch('./combDB.json');
    }*/

   
    const data = await response.json();
    dataBase = data; 
    //ProcessData();   
    //return db;
    
    dept = localStorage.getItem('department'); 


    SetLinks();

    

    //BuildPage()
    BuildPageWrap("0");

    //CreateModal();
};


getData();


/*
function BuildPage()
{
    // should build an array of the items here, so they can be sorted


    let count = dataBase["clothing"].length;
    
    let loopIter = Math.round(count/3);

    let rem = count % 3;

    console.log(count,loopIter,rem);

    if(loopIter>0)
    {
        for(let i=0;i<loopIter;i++)
        {
            BuildItemRow(dataBase["clothing"][(i*3)+0].id,
            dataBase["clothing"][(i*3)+1].id, 
            dataBase["clothing"][(i*3)+2].id,
            itemView)            
        }
    } 
}*/


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

    switch(sessionStorage.getItem('category'))
    {    

        case "1": 
        catTitle.innerHTML = "Clothing"; 
        sideTitle.innerHTML = "Clothes";       
        break;
        case "2": 
        catTitle.innerHTML = "Boots";      
        sideTitle.innerHTML = "Footwear";               
        break;
        case "3": 
        catTitle.innerHTML = "Accessories";
        sideTitle.innerHTML = "Accessories";             
        break;        
    }

}




document.addEventListener('keydown', function(e){
    if(e.key === '1')
    { 
        console.log(sessionStorage);
    }  
});



function GetCategory()
{
    let retCat;   

    switch(sessionStorage.getItem('category'))
    {    

        case "1":    
        if(dept == "men")
        {
            retCat = "clothing"
        }
        else
        {
            retCat = "womenclothing"
        }
        break;
        case "2": 
        if(dept == "men")
        {
            retCat = "boots"
        }
        else
        {
            retCat = "womenboots"
        }              
        break;
        case "3": 
        if(dept == "men")
        {
            retCat = "accessories"
        }
        else
        {
            retCat = "womenaccessories"
        }                
        break;        
    }
   
    return retCat;
}






function BuildPageWrap(inc)
{
    //get what category of item it is from session storage
    //itemCategory = sessionStorage.getItem("category");
    itemCategory = GetCategory();
    if(itemCategory == null)
    {

        if(dept == "women")
        {
            itemCategory = "womenclothing";
        }
        else
        {
            itemCategory = "clothing";
        }
        
    }   



    ClearPageWrap();

    

    // should build an array of the items here, so they can be sorted

    //itemArr = ArrayShuffle(dataBase["clothing"]);
    //itemArr = LowToHighSort(dataBase["clothing"]);
    //itemArr = HighToLowSort(dataBase["clothing"]);
    
    //let itemArr;

    switch(inc)
    {        
        case "0":        
        itemArr = AlphaLabelSort(dataBase[itemCategory]);         
        break;       
        case "1":          
        itemArr = LowToHighSort(dataBase[itemCategory]);        
        break;    
        case "2":          
        itemArr = HighToLowSort(dataBase[itemCategory]);         
        break;
    }


     
    

    //let count = dataBase["clothing"].length; 
    const count = itemArr.length

    let rem = count % 3;

    if(rem>0)
    {
        rem = 3-rem;
    }
       

    
    for(let i=0;i<itemArr.length;i++)
    {
        BuildItemCardWrap(itemArr[i], buildRow) ;           
    }


    if(rem>0)
    {
        for(let i = 0;i<rem;i++)
        {
            BuildSpacer(buildRow);
        }
    }

    CreateSearchPop(chatHook,searchButton);  
}


function ClearPageWrap()
{
    while (buildRow.firstChild) {
        buildRow.removeChild(buildRow.firstChild);
    }

}


function RefreshPage(inc)
{
    while (buildRow.firstChild) {
        buildRow.removeChild(buildRow.firstChild);
    }

    BuildPageWrap(inc);
}



/*
function BuildItemRow(id1,id2,id3,par)
{    
    const newDiv = document.createElement('div');
    newDiv.classList.add("--w100","--f-row-align","--mtb-r1","--f-jsb");

    BuildItemCard(id1,newDiv);
    BuildItemCard(id2,newDiv);
    BuildItemCard(id3,newDiv);


    
    //for(let i =0;i<3;i++)
    //{
       // BuildItemCard(102,newDiv);
    //}

    par.append(newDiv);
}
*/




function BuildItemCardWrap(inc,par)
{
    //const itemObj = inc;
    

    
    const newDiv = document.createElement('div');
    newDiv.classList.add("clothing-card","--f-col","--mb-r4","--bg-w","cp");
    newDiv.dataset.item = inc.id; 

    const img = document.createElement('img');   
    img.src = inc.images.a;
    img.classList.add("--w100");
    newDiv.append(img);

    const lineDiv = document.createElement('div');
    lineDiv.classList.add("--w100","--mtb-r1","--f-centered")
    const line = document.createElement('div');
    line.classList.add("--w90","line-break")
    lineDiv.append(line);
    newDiv.append(lineDiv);

    const copyDiv = document.createElement('div');
    copyDiv.classList.add("--fg1","--f-col-align");
    newDiv.append(copyDiv);


    const s1 = document.createElement('span');
    s1.innerHTML = inc.label;
    s1.classList.add("--fnt-r13","--fnt-w700","--mb-r1");
    copyDiv.append(s1);

    const s2 = document.createElement('span');
    s2.classList.add("--fnt-r13","--mb-r1");
    s2.innerHTML = inc.type;
    copyDiv.append(s2);

    const s3 = document.createElement('span');
    s3.innerHTML = formatter.format(inc.price);
    s3.classList.add("--fnt-r14","--fnt-w600","--mb-r1");
    copyDiv.append(s3);


    newDiv.addEventListener("click", event =>{     
        //console.log(cCard1.c.getAttribute("data-item"));        
        sessionStorage.setItem("itemId", newDiv.getAttribute("data-item"));
        window.location.href = "item.html";
    });


    par.append(newDiv);
}


function BuildSpacer(par)
{
    const newDiv = document.createElement('div');
    newDiv.classList.add("clothing-card","--f-col","--mb-r4");

    par.append(newDiv);
}





/*
function BuildItemCard(inc,par)
{
    const itemObj = GetObjByPureId(inc);
    

    
    const newDiv = document.createElement('div');
    newDiv.classList.add("--w30","--f-col");

    const img = document.createElement('img');   
    img.src = itemObj.images.a;
    img.classList.add("--w100");
    newDiv.append(img);

    const lineDiv = document.createElement('div');
    lineDiv.classList.add("--w100","--mtb-r1","--f-centered")
    const line = document.createElement('div');
    line.classList.add("--w100","line-break")
    lineDiv.append(line);
    newDiv.append(lineDiv);

    const s1 = document.createElement('span');
    s1.innerHTML = itemObj.label;
    newDiv.append(s1);

    const s2 = document.createElement('span');
    s2.innerHTML = itemObj.type;
    newDiv.append(s2);

    const s3 = document.createElement('span');
    s3.innerHTML = formatter.format(itemObj.price);
    newDiv.append(s3);


    par.append(newDiv);
}
*/




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


function GetSortedArray(array, inc)
{    
    switch(inc)
    {    
        case 0:    
        return AlphaLabelSort(array);           
        case 1:     
        return LowToHighSort(array);               
        case 2:
        return HighToLowSort(array); 
    }
}




function ArrayShuffle(array)
{
    var copy = [], n = array.length, i;
  
    // While there remain elements to shuffle…
    while (n) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * array.length);
  
      // If not already shuffled, move it to the new array.
      if (i in array) {
        copy.push(array[i]);
        delete array[i];
        n--;
      }
    }
  
    return copy;
}

function LowToHighSort(array)
{    
    array.sort(function(a, b) {
        return parseFloat(a.price) - parseFloat(b.price);
    });
    
    return array;
}

function HighToLowSort(array)
{
    array.sort(function(a, b) {
        return parseFloat(b.price) - parseFloat(a.price);
    });

    return array;
}


function AlphaLabelSort(array)
{
    array.sort(function(a, b){
        if(a.label < b.label) { return -1; }
        if(a.label > b.label) { return 1; }
        return 0;
    })

    return array;
}








var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) 
{
  acc[i].addEventListener("click", function() 
  {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") 
    {
      panel.style.display = "none";
    } else 
    {
      panel.style.display = "block";
    }
  });
}
