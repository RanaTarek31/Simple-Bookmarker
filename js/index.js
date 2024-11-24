var bookmarkNameInput = document.getElementById('bookmarkName');
var bookmarkURLInput = document.getElementById('bookmarkURL');
var bookmarkTable = document.getElementById('bookmarkTable');
var searchInput = document.getElementById('search');
var urlRules = document.getElementById('urlRules');



var bookmarks = [];

// validate URL 
function isValidURL() {
    var regex = /^(http)/;
    return regex.test(bookmarkURLInput.value);
}


if (localStorage.getItem("bookmarksList")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
    displayBookmarks();
}


// add bookmark

function addBookMark() {

    if (isValidURL()) {
        var bookMark = {
            name : bookmarkNameInput.value,
            url : bookmarkURLInput.value,
        }
    
    
        bookmarks.push(bookMark);
        localStorage.setItem('bookmarksList', JSON.stringify(bookmarks));
    
        clearInputs();
        displayBookmarks();
    } else {
        alert("please enter valid URL , must start wih http")
    }

}


// clear inputs

function clearInputs() {
    bookmarkNameInput.value = "";
    bookmarkURLInput.value = "";
}

// display bookmarks

function displayBookmarks() {

    var container ="";

    for (var i = 0 ; i<bookmarks.length ; i++) {
        container = container + `<tr>
                        <td>${i}</td>
                        <td>${bookmarks[i].name}</td>
                        <td><a href="${bookmarks[i].url}" class="btn btn-outline-warning" target="_blank">
                            <i class="fa-regular fa-eye"></i>Visit
                        </a></td>
                        <td><button onclick="deleteBookmark(${i})" class="btn btn-outline-danger">
                            <i class="fa-solid fa-trash"></i>Delete
                        </button></td>
                    </tr>`;      
    }


    document.getElementById('bookmarkTable').innerHTML = container;
}

// delete bookmark

function deleteBookmark(idx) {
    bookmarks.splice(idx,1)


    displayBookmarks();

    localStorage.setItem('bookmarksList' , JSON.stringify(bookmarks));


}

// search bookmark

function searchBookmark(term) {

    var container = "";


    for (var i = 0 ; i<bookmarks.length ; i++) {
        

        if (bookmarks[i].name.toLowerCase().includes(term.toLowerCase())) {

            container = container + `<tr>
                        <td>${i}</td>
                        <td>${bookmarks[i].name}</td>
                        <td><a href="${bookmarks[i].url}" class="btn btn-outline-warning" target="_blank">
                            <i class="fa-regular fa-eye"></i>Visit
                        </a></td>
                        <td><button onclick="deleteBookmark(${i})" class="btn btn-outline-danger">
                            <i class="fa-solid fa-trash"></i>Delete
                        </button></td>
                    </tr>`;      

        }
    }

    document.getElementById('bookmarkTable').innerHTML = container;


}