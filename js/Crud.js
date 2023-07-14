let nameInput = document.getElementById("productInputName");
let priceInput = document.getElementById("productInputPrice");
let taxesInput = document.getElementById("productInputTaxes");
let adsCountInput = document.getElementById("productInputPrAds");
let discountInput = document.getElementById("productInputDiscount");
let totalInput = document.getElementById("totalInput");
let categoryInput = document.getElementById("productInputCategory");
let discInput = document.getElementById("productInputDes");
let countInput = document.getElementById("productInputCount");
let inCountMount = document.getElementById("in-count");
let outCountMount = document.getElementById("out-count");

let addBtn = document.getElementById("addProduct");
let clearBtn = document.getElementById("clearForm");
let updateProduct = document.getElementById("updateProduct");
let deleteAll = document.getElementById("delete-all")
let countProductStar = document.getElementById("count-product");
let CountStar = document.getElementById("Count-star");
let totalSpan = document.getElementById("total-span");




let moodUpdate = "create";
let tmp;


if (localStorage.getItem("product") !== null) {
  productData = JSON.parse(localStorage.getItem("product"));
}
else {
  productData = [];
}


//==== Btn create Product ====
addBtn.onclick = function () {

  getTotal();

  let ProductItem = {
    productName: nameInput.value,
    productPrice: priceInput.value,
    productTaxes: taxesInput.value,
    productAds: adsCountInput.value,
    productDiscount: discountInput.value,
    productTotal: totalInput.innerHTML,
    productCategory: categoryInput.value,
    productDisc: discInput.value,
    productsInCountMount: inCountMount.value,
    productsOutCountMount: outCountMount.value,
    productCountInput: countInput.value,
  }

  console.log(ProductItem.productTotal);

  putBorder();

  if (nameInput.value !== "" && priceInput.value !== "" && categoryInput.value !== "" && countInput.value !== "" && discInput.value !== "") {

    if (moodUpdate === "create") {

      if (countInput.value > 1) {
        productData.push(ProductItem);
      }
      else {
        productData.push(ProductItem);
      }
    }
    else {

      if (ProductItem.productsOutCountMount != "") {

        ProductItem.productCountInput = (+ProductItem.productCountInput) - (+ProductItem.productsOutCountMount)
      }
      if (ProductItem.productsInCountMount != "") {
        ProductItem.productCountInput = (+ProductItem.productCountInput) + (+ProductItem.productsInCountMount)
      }

      productData[tmp] = ProductItem;

      addBtn.innerHTML = "Add Product";

      moodUpdate = "create";


    }

    clearInp();

    clearBorder()

  }

  localStorage.setItem("product", JSON.stringify(productData))

  showData();

}


// ============== Put Border In Input Empty  ==========
function putBorder() {
  if (nameInput.value === "") {
    nameInput.style.border = "1.5px solid red"
  }
  else {
    nameInput.style.border = "1px solid green"
  }
  if (priceInput.value === "") {
    priceInput.style.border = "1.5px solid red"
  }
  else {
    priceInput.style.border = "1px solid green"
  }
  if (categoryInput.value === "") {
    categoryInput.style.border = "1.5px solid red"
  }
  else {
    categoryInput.style.border = "1px solid green"
  }
  if (countInput.value === "") {
    countInput.style.border = "1.5px solid red"
  }
  else {
    countInput.style.border = "1px solid green"
  }
  if (discInput.value === "") {
    discInput.style.border = "1.5px solid red"
  }
  else {
    discInput.style.border = "1px solid green"
  }
}


// ======== Clear Border From Input After Fill It ========
function clearBorder() {
  nameInput.style.border = "";
  priceInput.style.border = "";
  categoryInput.style.border = "";
  countInput.style.border = "";
  discInput.style.border = "";
}


// =========  Get Total Function =========
function getTotal() {

  if (priceInput.value != "") {

    let total = (+priceInput.value + +taxesInput.value + +adsCountInput.value) - +discountInput.value;

    totalSpan.innerHTML = total;


    totalInput.style.backgroundColor = "green"
  }
  else {

    totalSpan.innerHTML = "";

    totalInput.style.backgroundColor = "#dc3545"
  }
}


let totalDeleteSpan = document.getElementById("total-delete-span")
// ======== Show Data Function =======
function showData() {
  
  getTotal()

  let table = '';

  for (let i = 0; i < productData.length; i++) {

    console.log(productData[i].productTotal);

    table += `<tr>
                    <td>${i + 1} </td>
                    <td style="min-width : 150px;"> ${productData[i].productName} </td>
                    <td style="min-width : 150px;">${productData[i].productCategory}</td>
                    <td style="min-width : 100px;">${productData[i].productTotal }</td>
                    <td style="min-width : 100px;">${productData[i].productDiscount}</td>
                    <td style="min-width : 400px;">${productData[i].productDisc}</td>
                    <td>${productData[i].productCountInput}</td>
                    <td> <button onclick="deleteItem( ${productData[i].productCountInput} , ${i} )" class="btn btn-primary bg-danger border-0" id="btn-delete"> Delete </button> </td>
                    <td> <button onclick="updateBtn(${i})" class="btn btn-primary" id="btn-update"> Update </button> </td>
                </tr> `
  }

  document.getElementById("tbody").innerHTML = table;

  if (productData.length > 0) {

    document.getElementById("delete-all").innerHTML = `Total : ${productData.length}`

    deleteAll.style.cssText = "background-Color :#0d6efd; color : #fff;"
  }
  else {
    deleteAll.style.cssText = "background-Color : ; color :;"
  }

}
showData();


// =========== clear Inputs =======
document.getElementById("clearForm").onclick = function () {
  clearInp()
};


// ======== clear Data  ==========
function clearInp() {

  nameInput.value = "";
  priceInput.value = '';
  taxesInput.value = "";
  discountInput.value = '';
  totalInput.innerHTML = `Total : `;
  countInput.value = "";
  categoryInput.value = "";
  discInput.value = "";
  adsCountInput.value = "";
  inCountMount.value = "";
  outCountMount.value = "";
}


//  ========= Delete Item Function ==========
function deleteItem(count, index) {

  console.log(count);
  console.log(index);

  if (count > 0) {
    count--;
    productData[index].productCountInput = count;
  }
  else {
    productData.splice(index, 1);
  }


  localStorage.product = JSON.stringify(productData)

  showData()

  tmp = index;
}


// ========== Delete All Item Function  ========
document.getElementById("delete-icon").onclick = function () {

  localStorage.clear();

  productData.splice(0);

  showData();
}


// ========= Update Btn  ============
function updateBtn(i) {

  nameInput.value = productData[i].productName;
  priceInput.value = productData[i].productPrice;
  taxesInput.value = productData[i].productTaxes;
  discountInput.value = productData[i].productDiscount;
  totalInput.innerHTML = productData[i].productTotal;
  categoryInput.value = productData[i].productCategory;
  discInput.value = productData[i].productDisc;
  adsCountInput.value = productData[i].productAds;
  countInput.value = productData[i].productCountInput;

  getTotal();

  addBtn.innerHTML = 'Update Product';
  moodUpdate = "update"
  tmp = i;

  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  })

}


// ========= search Function ==========
function searchData(value) {

  let table = '';

  for (let i = 0; i < productData.length; i++) {

    if (productData[i].productName.includes(value) || productData[i].productCategory.includes(value)) {

      table += `
                     <tr>
                     <td>${i + 1} </td>
                     <td style="min-width : 150px;">${productData[i].productName} </td>
                     <td style="min-width : 150px;">${productData[i].productCategory}</td>
                     <td style="min-width : 100px;">${productData[i].productTotal}</td>
                      <td style="min-width : 100px;">${productData[i].productDiscount}</td>
                     <td style="min-width : 200px;">${productData[i].productDisc}</td>
                     <td style="min-width : 100px;">${productData[i].productCountInput}</td>
                     <td> <button onclick="deleteItem(${i})" class="btn btn-primary" id="btn-delete"> Delete </button> </td>
                     <td> <button onclick="updateBtn(${i})" class="btn btn-primary" id="btn-update"> Update </button> </td>
                     </tr>
                  `
    }

  }

  document.getElementById("tbody").innerHTML = table;

}



