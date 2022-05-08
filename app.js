const currencies=[{
    id:'USD', name:'US Dollars'
},
{
    id:'GBP', name:'Great Britain Pound'
},
{
    id:'BRL', name:'Brazillian Real'
},
{
    id:'UGX', name:'Uganda Shillings'
},
{
    id:'AUD', name:'Australian Dollar'
},
{
    id:'CAD', name:'Canadian Dollar'
},
{
    id:'EUR', name:'Euro'
},
{
    id:'KRW', name:'South Korean Won'
},
{
    id:'KES', name:'Kenyan Shillings'
},
{
    id:'CHF', name:'Swiss Franc'
},
{
    id:'GHS', name:'Ghanian Cedi'
},
{
    id:'INR', name:'Indian Rupee'
},
{
    id:'ZAR', name:'South African Rand'
},
{
    id:'ILS', name:'Israeli Shekel'
},
{
    id:'JPY', name:'Japanese Yen'
},
{
    id:'NGN', name:'Nigerian Naira'
},
{
    id:'CNY', name:'Chinese Yuan'
},
{
    id:'RUB', name:'RussianRuble'
}];
const apiBase='http://free.currconv.com/api/v7/';
const api=(currency,currency2)=>`${apiBase}convert?q=${currency}_${currency2}&compact=utra&apiKey=cf6fe74d0bee2be2694c`;
const toast=(msg)=>{
    const toastr=document.querySelector('.messages');
    if(!toastr) return;

    toastr.textContent=msg;
    if(!toastr.classList.contains('on')){
        toastr.classList.add('on');
    }
};
const doneToasting=()=>{
    const toastr=document.querySelector('.messages');
    if(!toastr) return;

    toastr.textContent='';
    toastr.classList.remove('on');
};

const conversionSucceeded=(apiResponse)=>{
if(!apiResponse){
    toast('Nothing to display...');
    return;
}
const [value]= Object.values(apiResponse) //if response is true return value showing the exchange rate

const btn=document.querySelector('button');
btn.removeAttribute('disabled');

const display=document.querySelector('.conversion');
const formatter=new Intl.NumberFormat(
    'en-NG', { style:'currency',currency2:`${getSelectedCurrency2()}`}
);

let amount=document.getElementById("Amount").value;
amount=amount==0?1:amount;
display.textContent=formatter.format(value*amount); // command to convert currency in user given amount
doneToasting() //this is going to show the convert rate set to be doneToasting
};

const createNode=(element)=>{
    return document.createElement(element);

}
const append=(parent,el)=>{
    return parent.appendChild(el);
}
const populatedCurrencies=()=>{
    currencies.map(c=>{
        let opt=createNode("option");
        opt.setAttribute('value',c.id);
        let text=document.createTextNode(`${c.name}`)
        append(opt,text);
        let sel=document.getElementsByClassName("select-text")[0];
        append(sel,opt);
    });
}
const populatedCurrencies2=()=>{
    currencies.map(c=>{
        let opt=createNode("option");
        opt.setAttribute('value',c.id);
        let text=document.createTextNode(`${c.name}`)
        append(opt,text);
        let sel=document.getElementsByClassName("select-text")[1];
        append(sel,opt);
    });
}
const getSelectedCurrency=()=>{
    //here determines and return the selected value
    //of the SELECT element.
    return document.getElementsByClassName("select-text")[0].value;
};
const getSelectedCurrency2=()=>{
    //here determines also and then return the selected value
    //of the select element.
    return document.getElementsByClassName("select-text")[1].value;
};
//this function converts the currency
const convert=(event)=>{
toast('ready to convert...');

const btn=event ?
event.target : document.querySelector('button');

const selected=getSelectedCurrency();

if(!selected||selected.trim()===''||!currencies.map(c=>c.id).includes(selected)) return;

const selected2=getSelectedCurrency2();

if(!selected2||selected2.trim()===''||!currencies.map(c=>c.id).includes(selected2)) return;

btn.setAttribute('disabled','disabled');
toast(`converting...`);

const endpoint=api(selected, selected2);
//make a fetch call to the endpoint variable above
// and convert the response to JSON,
//then call conversionSucceeded and pass the JSON.
fetch(endpoint)  //call the fetch function passing the url of the API as a parameter
.then((resp)=>resp.json())
.then((data)=>{
    conversionSucceeded(data);
})
.catch((error)=>{
    console.log(error);
});
};

const startApp=()=>{
    //call populateCurrencies here
    populatedCurrencies();
    populatedCurrencies2();
    //adding a clickListenner to the buttton
    let draw=document.getElementsByClassName("btn")[0];
    draw.addEventListener("click",()=>{
     document.getElementsByClassName("conversion")[0].style.display="block";
     convert(event);
    });
}
startApp(); //i have called the function and the app can run now