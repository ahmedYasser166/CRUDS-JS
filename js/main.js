// ============>vars
var NameInput = document.getElementById("namebook");
var UrlInput = document.getElementById("urlbook");
var btnSubmit = document.getElementById("btnSubmit");
var btnVisit = document.getElementById("btnVisit");
var booksList = [];
var mycontent;

// =========>localStorage
if (localStorage.getItem("Books") == null) {
  booksList = [];
} else {
  booksList = JSON.parse(localStorage.getItem("Books"));
  display();
}

// =========>add
function Addbook() {
  if (
    NameInput.classList.contains("is-valid") &&
    UrlInput.classList.contains("is-valid")
  ) {
    var isDuplicate = booksList.some((book) => book.code === NameInput.value);
    if (isDuplicate) {
      Swal.fire({
        title: "Error!",
        text: "This name already exists. Please enter a unique name.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    var Books = {
      code: NameInput.value,
      url: UrlInput.value,
    };
    booksList.push(Books);
    localStorage.setItem("Books", JSON.stringify(booksList));
    display();
    clear();
  } else {
    Swal.fire({
      title: "Error!",
      text: "Data is not valid",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}
// ============>display
function display() {
  var cartona = "";
  for (var i = 0; i < booksList.length; i++) {
    cartona += `<tbody class="text-center">
      <tr>
        <td class="fw-bold">${i + 1}</td>
        <td class="fw-bold">${booksList[i].code}</td>
        <td class="py-2">
          <a target="_blank" href="${booksList[i].url}">
            <button id="btnVisit" onclick="visitbook(${i})" class="btn btn-success text-white btn-submit">
              <i class="fa-solid fa-eye"></i>Visit
            </button>
          </a>
        </td>
        <td class="py-2">
          <button onclick="deletebook(${i})" class="btn btn-danger btn-submit">
            <i class="fa-solid fa-trash"></i> Delete
          </button>
        </td>
      </tr>
    </tbody>`;
  }
  document.getElementById("mycontent").innerHTML = cartona;
}

//===============>delete
function deletebook(deletedIndex) {
  booksList.splice(deletedIndex, 1);
  display();
  localStorage.setItem("Books", JSON.stringify(booksList));
}

//===============>clear
function clear() {
  NameInput.value = null;
  UrlInput.value = null;
}

//===============>validatinputs
function validatinputs(element) {
  var regex = {
    namebook: /^[a-zA-Z0-9-_.]{1,63}$/,
    urlbook: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,
  };
  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.remove("d-none");
  }
}
