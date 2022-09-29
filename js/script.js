

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

//global database
let dataBase;

//"a":"url('../assets/imgs/boot.jpg')",



///json structure
/*
{
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
}*/






/*
document.addEventListener('keydown', function(e){
    if(e.key === 'q')
    {    
        const newAdd = TestCreate();
      console.log(newAdd); 
    }  
});*/



/*
document.addEventListener('keydown', function(e){
    if(e.key === 'w')
    {          
       //GetDB((data) => console.log({ data }))  
      // GetDB((data) => {db = data})  
       getData();        
    }  
});*/

/*
document.addEventListener('keydown', function(e){
    if(e.key === 'e')
    { 
        TestLoad();
    }  
});*/





//working to fetch database
const getData = async () => {
    const response = await fetch('./myDB.json');
    const data = await response.json();
    dataBase = data; 
    //ProcessData();   
    //return db;
};

getData();


/*
function ProcessData()
{
    console.log(dataBase)
}*/


/*
function GetDB(cb){      
    fetch('./myDB.json')
    .then((response) => response.json())
    .then((parsed) => cb(parsed))    
    .catch((err) => console.log(err));     
}*/




function WriteToFile(){
    const text = JSON.stringify(db);
    
}



/*
function TestLoad()
{
    const img = document.querySelector('#timg');
    const lable = document.querySelector('#btxt');
    const oldp = document.querySelector('#bpriceold');    
    const price = document.querySelector('#bprice');

    console.log(db.boots[0].images);

    for(let i = 0;i<db.boots.length;i++)
    {
        if(db.boots[i].id == 100)
        {
            //background: url("../assets/imgs/boot.jpg"); 
            img.style.backgroundImage = db.boots[i].images.a;
            lable.innerHTML = db.boots[i].label;
            oldp.innerHTML = db.boots[i].oldprice;
            price.innerHTML = db.boots[i].price;

        }

    }
}
*/


//working to create now json object
function TestCreate(){
    const newAdd = AddObj;
    AddObj.id = 100;
    AddObj.label = "Armani";   
    return newAdd;
}

function TestAdd()
{
    let newAdd = TestCreate();
        
    db.boots.push(newAdd);
    console.log(db);

}