let price=document.getElementById('price');
let title=document.getElementById('title');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let searchTitle=document.getElementById('searchTitle');
let searchCategory=document.getElementById('searchCategory');
let submit=document.getElementById('submit');

let mode = 'create';

let tmp;


// getTotal
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value)-discount.value ;
        total.innerHTML = result
        total.style.backgroundColor = '#040';
    }else{
        total.innerHTML = '';
        total.style.backgroundColor = 'rgb(145, 0, 0)';
    }
}


//create


let dataPro;
if(localStorage.prd != null) {
    dataPro = JSON.parse(localStorage.prd)
}else{
    dataPro = [];
}


submit.onclick=function(){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
        
    }
    
    if(title.value !=''&& price.value !=''&& category.value !=''&& newPro.count < 100){
        if(mode === 'create'){
            if(newPro.count > 1){
            for(let i = 0 ; i < newPro.count ; i++){
                dataPro.push(newPro);
            }
            }else{
            dataPro.push(newPro);
        }
        }else{
            dataPro[tmp] = newPro;
            mode = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
        }
        clr();
    }
    
    localStorage.setItem('prd',JSON.stringify(dataPro));
    console.log(dataPro);
    showData();
}

//clear

function clr(){
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = ''
    count.value = ''
    category.value = ''  
}


//read


function showData(){
    getTotal();
    let table = '';
    for(let i = 0 ; i < dataPro.length ; i++){
        table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="upData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr> 
                `
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('DeleteAll')
    if(dataPro.length > 0){
        btnDelete.innerHTML = `
        <button onclick="dltAll()" >Delete All  (  ${dataPro.length}  )</button>
        `
    }else{
        btnDelete.innerHTML = '' ;
    }
}
showData();

//delete

function deleteData(i){
    dataPro.splice(i,1);
    localStorage.prd = JSON.stringify(dataPro);
    showData();
}

//allDelete
function dltAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();

}

//count==>create

//update
function upData(i){
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'upDate';
    mode = 'upDate';
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}


//search

let mood = 'title';

function searchTC(id){
    let search =document.getElementById('search');
    if('searchTitle' == id){
        mood = 'title';
        search.placeholder = 'search by title';
        

    }else{
        mood = 'category';
        search.placeholder = 'search by category';
    }
    search.value = '';
    showData();
}

function dataSearch(value){
    let table = '';
    if(mood == 'title'){
        for(let i = 0 ; i < dataPro.length ; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="upData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr> 
                `
                
            }





        }








    }
    
    
    
    else{
        for(let i = 0 ; i < dataPro.length ; i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="upData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr> 
                `
                
            }





        }
    }
    document.getElementById('tbody').innerHTML = table;

}




