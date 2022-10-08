

const popHook = document.querySelector('#bdy'); 

let searchBoxPopUp;

let searchOpen = false;

//CreateSalePop(popHook)

//CreateSearchPop(popHook);


function CreateSalePop(par)
{
    const main = document.createElement('div');
    main.classList.add("pop-up-sale");
    

    const cont = document.createElement('div');
    cont.classList.add("--full","--f-col");
    main.append(cont);

    const s1 = document.createElement('span');
    s1.classList.add("--fnt-f16","--fnt-w600","--mt-r1");
    s1.innerHTML = "15% OFF APP EXCLUSIVE";
    cont.append(s1);

    const s2 = document.createElement('span');
    s2.classList.add("--fnt-f13","--mt-r2");
    s2.innerHTML = "Shop on our app to enjoy a special discount on selected items in our edit with code APP15";
    cont.append(s2);

    const s3 = document.createElement('span');
    s3.classList.add("--fnt-f13","--mt-r2");
    s3.innerHTML = "T&Cs apply";
    cont.append(s3);

    const dlButton = document.createElement('button');
    dlButton.type = "button";
    dlButton.classList.add("pop-up-sale-btn","--mt-auto","--w100","cp","--fnt-w");
    dlButton.innerHTML= "Download now";
    cont.append(dlButton);

    const xDiv = document.createElement('div');
    xDiv.classList.add("pop-up-sale-x","--fnt-f16","--fnt-w700","cp");
    xDiv.innerHTML = "X";
    main.append(xDiv);

    xDiv.addEventListener("click", event =>{          
        main.style.visibility = "hidden";
    });

 
    par.append(main); 
}


function CreateSearchPop(par,trigger)
{    
    const main = document.createElement('div');
    main.classList.add("search-box-pop","--f-col-align","--pd-box-f10","--RB");
    main.style.visibility = "hidden";

    const inner = document.createElement('div');
    inner.classList.add("--w100","--f-col")
    main.append(inner);

    /*
    const sBox = document.createElement('div');
    sBox.classList.add("-w100","--f-row-align")*/
    

    

    const sImg =  document.createElement('img');
    sImg.classList.add("sBox-icon");
    sImg.src = "./assets/Icons/search.png";
    main.append(sImg);


    /*
    const s1 = document.createElement('span');
    s1.classList.add("--mt-r1","--fnt-mon-r","--fnt-f16")
    s1.innerHTML = "Search"*/
    

    const imp1 = document.createElement('input');
    imp1.classList.add("search-input-fld","--mt-f35")
    imp1.type = "text";
    imp1.placeholder="Search"
    main.append(imp1);


    const xDiv = document.createElement('div');
    xDiv.classList.add("search-box-x","--fnt-f16","--fnt-w700","cp");
    xDiv.innerHTML = "X";
    main.append(xDiv);

    xDiv.addEventListener("click", event =>{          
        ToggleSearchBox();
    });

    
    par.append(main);
    searchBoxPopUp = main; 


    trigger.addEventListener("click", event =>{          
        ToggleSearchBox();
    });
}



function ToggleSearchBox()
{
    if(searchOpen == false)
    {
        searchBoxPopUp.style.visibility = "visible";
        searchOpen = true;        
    }
    else
    {
        searchBoxPopUp.style.visibility = "hidden";
        searchOpen = false;  
    }

}


/*
function LoginPop(par,trigger)
{    
    const main = document.createElement('div');
    main.classList.add("login-pop-box","--f-col-align");
    //main.style.visibility = "hidden";

    const inner = document.createElement('div');
    inner.classList.add("--w70","--mt-f50");
    main.append(inner);

    const optBox = document.createElement('div');
    optBox.classList.add("--w100","--f-row-align","--f-jsb");
    inner.append(optBox);

    const optS1Box = document.createElement('div');
    optS1Box.classList.add("--f-col-align","--w50");
    optBox.append(optS1Box);


    const s1 = document.createElement('span');
    s1.innerHTML = "SIGN IN";
    optS1Box.append(s1);


    const s1Line = document.createElement('div');
    s1Line.classList.add("--w100","low-line-thick");
    optS1Box.append(s1Line);



    const optS2Box = document.createElement('div');
    optS2Box.classList.add("--f-col-align","--w50");
    optBox.append(optS2Box);



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


    par.append(main);

}*/


