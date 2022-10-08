

let chatpop,chatBox;
let chatBoxMin = false;



//const chatHook = document.querySelector('#bdy');

//CreateChatBox(chatHook);
//CreateChatPopup(chatHook);



function CreateChat(par)
{
    console.log("called");
    CreateChatBox(par);
    CreateChatPopup(par);
}   



function CreateChatPopup(par)
{
    const main = document.createElement('div');
    main.classList.add("expert-chat","--fnt-f14","--fnt-w","--f-row-align","cp")

    main.addEventListener("click", event =>{     
        HidePopUp(main);
    });

    
    const greenDot = document.createElement('div');
    greenDot.style.width = "6px";
    greenDot.style.height = "6px";
    greenDot.style.borderRadius = "3px";
    greenDot.style.backgroundColor = "#18D500";
    main.append(greenDot);

    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute('width', '14');
    icon.setAttribute('height', '14');
    icon.setAttribute('style', 'margin: 2px 8px 0');
    icon.setAttribute('viewBox', '0 0 14 14');
    main.append(icon);

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute('fill', 'none');
    g.setAttribute('fill-rule', 'evenodd');
    g.setAttribute('transform', 'translate(-1 -1)');
    icon.append(g);

    const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    poly.setAttribute('points','0 16 16 16 16 0 0 0');
    g.append(poly);

    const pth = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pth.setAttribute('fill','#FFF');
    pth.setAttribute('d','M1,1 L1,11.001 L4,11.001 L4,15 L7,11.001 L15,11.001 L15,1 L1,1 Z M2,2.001 L14,2.001 L14,10 L6.5,10 L6.2,10.4 L5,12.001 L5,10 L2,10 L2,2.001 Z');
    g.append(pth);

    const txt = document.createElement('p');
    txt.style.margin = "0";
    txt.innerHTML = "Chat with an expert";
    main.append(txt);

    par.append(main);
    chatpop = main;

}


function HidePopUp(inc)
{
    inc.style.visibility = "hidden";
    chatBox.style.visibility = "visible";
}

function HideChatBox()
{
    chatBox.style.visibility = "hidden";
}

function MinMaxChatBox()
{
    if(chatBoxMin == false)// open, minimize it
    {
        chatBox.style.transform = "translate(" + 0 + "px," + 368 + "px)";

        chatBoxMin = true;
        return;
    }
    if(chatBoxMin == true)// minimized, max it
    {
        chatBox.style.transform = "translate(" + 0 + "px," + 0 + "px)";

        chatBoxMin = false;
        return;
    }
}






function CreateChatBox(par)
{
    //this needs to attach to something

    const main = document.createElement('div');
    main.classList.add("chat-box","--brt-5");
    main.style.visibility = "hidden";

    const head = document.createElement('div');
    head.classList.add("-w100","--brt-5","--bg-blk","--f-centered","--hf40");
    main.append(head);

    const head_inner = document.createElement('div');
    head_inner.classList.add("--w90","--f-row-align","--f-jsb","--fnt-w");
    head.append(head_inner);

    const innerCopy = document.createElement('span');
    innerCopy.innerHTML = "Chat with us"
    head_inner.append(innerCopy);

    const minX_box = document.createElement('div');
    minX_box.classList.add("--f-row-align","--w20","--f-jsb");
    head_inner.append(minX_box);

    const minDiv = document.createElement('div');
    minDiv.classList.add("--f-centered","--w50","cp","hov-bg-gray");
    minX_box.append(minDiv);

    const minS = document.createElement('span');
    minS.innerHTML = "_"
    minDiv.append(minS);

    minS.addEventListener("click", event =>{     
        MinMaxChatBox();
    });


    const xDiv = document.createElement('div');
    xDiv.classList.add("--f-centered","--w50","cp","hov-bg-gray");
    minX_box.append(xDiv);

    const xS = document.createElement('span');
    xS.innerHTML = "X"
    xDiv.append(xS); 

    xS.addEventListener("click", event =>{     
        HideChatBox();
    });

    const titleS = document.createElement('span'); 
    titleS.classList.add("--fnt-f13","--f-centered","--mtb-r1")
    titleS.innerHTML= "Welcome to MOOX Live Chat";
    main.append(titleS);

    const lineDiv = document.createElement('div');
    lineDiv.classList.add("--f-centered");
    main.append(lineDiv);

    const line = document.createElement('div');
    line.classList.add("--w96","line-break");
    lineDiv.append(line);

    const chatMain = document.createElement('div');
    chatMain.classList.add("--f-col-centered");
    main.append(chatMain);

    const startChat = document.createElement('div');
    startChat.classList.add("--f-col-align")
    chatMain.append(startChat);

    const startS = document.createElement('span'); 
    startS.classList.add("--fnt-f13","--fnt-w600","--f-centered","--mtb-r1")
    startS.innerHTML = "To start a chat, enter your full name:*";
    startChat.append(startS);

    const startInp = document.createElement('input'); 
    startInp.classList.add("--f-centered");
    startInp.type = "text";
    startChat.append(startInp);

    const linebreak = document.createElement("br");
    startChat.append(linebreak);

    const emailChat = document.createElement('div');
    emailChat.classList.add("--f-col-align")
    chatMain.append(emailChat);

    const emailS = document.createElement('span'); 
    emailS.classList.add("--fnt-f13","--fnt-w600","--f-centered","--mtb-r1")
    emailS.innerHTML = "Please provide your email address:";
    emailChat.append(emailS);

    const emailInp = document.createElement('input'); 
    emailInp.classList.add("--f-centered");
    emailInp.type = "text";
    emailChat.append(emailInp);

    const linebreak2 = document.createElement("br");
    emailChat.append(linebreak2);

    const chatButtons = document.createElement('div');
    chatButtons.classList.add("--w80","--f-row-align","--mtb-r1","--f-jsb");
    chatMain.append(chatButtons);

    const cancelButton = document.createElement('button');
    cancelButton.classList.add("chat-button-c","cp","btn","--bg-w");
    cancelButton.innerHTML= "Cancel";
    chatButtons.append(cancelButton);

    const submitButton = document.createElement('button');
    submitButton.classList.add("chat-button","cp","--fnt-w","btn","--bg-blk");
    submitButton.innerHTML= "Submit";
    chatButtons.append(submitButton);   

    par.append(main) 
    chatBox = main;         

}










