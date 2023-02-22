let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;
//get totale
function getTotal(){
    if(price.value != ''){
        let result = ( +price.value + +taxes.value + +ads.value ) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }  else{
        total.innerHTML = '';
        total.style.background = '#a00d';
    }
}

//creat produc
let dataPro;
    if(localStorage.porduct != null) {
        dataPro = JSON.parse(localStorage.porduct)
    }else{
        dataPro = [];
    }
submit.onclick = function() {
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
//count
if(title.value != ''&&price.value != ''&&category.value !=''
&& newPro.count < 1000){
    if(mood === 'create'){
        if(newPro.count > 1){
            for( let i = 0; i < newPro.count;i++){
                dataPro.push(newPro);
            }
        }else{
            dataPro.push(newPro);
        }
     }else {
    dataPro[tmp] = newPro;
    mood = 'create';
    submit.innerHTML = 'create';
    count.style.display = 'block';
     }
     claerData()
     }
      
    
 
  
//save localstorage
    localStorage.setItem ('porduct',    JSON.stringify(dataPro) )
    showData()
}

//claer inputs

function claerData(){
    title.value = '' ;
    price.value = '' ;
    taxes.value = '' ;
    ads.value = '' ;
    discount.value= '' ;
    total.innerHTML = '' ;
    count.value = '' ;
    category.value = '' ;
}

//read
function showData(){
    getTotal()
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
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
                <td><button id="update" onclick="updateData(${i})">update</button></td>
                <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
           </tr>
        `;
    }
    document.getElementById('tbody').innerHTML=table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
        `
    }else{
        btnDelete.innerHTML = ``;
    }
}
showData()
//delete
 function deleteData(i){
     dataPro.splice(i,1);
     localStorage.porduct = JSON.stringify(dataPro);
     showData()
  }
//deleteall
function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}

//update
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal()
    count.style.display = 'none';
    submit.innerHTML = 'update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth',
    })
}
//search
let searchMood = 'title';

function getsearchMood(id){
    let search = document.getElementById('search');
    if( id == 'searchTitle'){
        searchMood = 'title';
    }else{
        searchMood = 'category';
    }
    search.placeholder = 'search by '+searchMood;
    search.focus()
    search.value = '';
    showData()
}
function searchData(value){
    let table = '';
    for(let  i = 0; i < dataPro.length; i++ ){
        if(searchMood == "title"){
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
                        <td><button id="update" onclick="updateData(${i})">update</button></td>
                        <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
                </tr>
                `;
                }
        }else{
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
                        <td><button id="update" onclick="updateData(${i})">update</button></td>
                        <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
                </tr>
                `;
                }
        }
    }
    document.getElementById('tbody').innerHTML=table;
}
//clean data
