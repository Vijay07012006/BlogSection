
let Title = document.getElementById("Title");
let Tags = document.getElementById("Tags");
let Blog = document.getElementById("Blog");

let isEdit;
let editID = null;

function save() {
    if (isEdit) {
        // alert("Blog Updated Successfully");
        let ar = JSON.parse(localStorage.getItem('blogs'));
        console.log(ar[editID]);
        ar[editID].Title = Title.value;
        ar[editID].Tags = Tags.value;
        ar[editID].Blog = Blog.value;
        ar[editID].date = Date.now();

        localStorage.setItem('blogs', JSON.stringify(ar));
        let al = `<div class="alert alert-success text-success mt-3 alert-dismissible fade show" role="alert">
            <strong>Success!</strong> Your blog has been saved.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
        document.getElementById("al").innerHTML = al;
        Title.value = "";
        Blog.value = "";
        Tags.value = "";
        isEdit = false;
        editID = null;
         setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
    else {

        const ar = JSON.parse(localStorage.getItem("blogs")) || [];

        const blogData = {
            Title: Title.value,
            Tags: Tags.value,
            Blog: Blog.value,
            Date: Date.now()
        };
        ar.push(blogData);
        localStorage.setItem("blogs", JSON.stringify(ar));
        Title.value = "";
        Tags.value = "";
        Blog.value = "";
        let al = `<div class="alert alert-success text-success mt-3 alert-dismissible fade show" role="alert">
        <strong>Success!</strong> Your blog has been saved.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
        document.getElementById("al").innerHTML = al;

        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
}


function show() {
    const ar = JSON.parse(localStorage.getItem("blogs")) || [];

    ar.forEach((blog, i) => {
        let a = `
        <div class="col-md-3 col-sm-6 mb-4">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${blog.Title}</h5>
                    <p class="card-text">${blog.Blog}</p>
                    <p class="card-text"><small class=" badge text-bg-primary">Tags: ${blog.Tags}</small></p>
                    <button class="btn btn-danger  btn-sm " onclick="del(${i})">delete</button>
                    <button class="btn btn-success  btn-sm " onclick="edit(${i})">Edit</button>

                </div>
            </div>
        </div>
        `;
        document.getElementById("post").innerHTML += a;
    });
}
show();

function del(index) {
    if (confirm("Are you sure you want to delete this blog?") === false) {
        return;
    }
    const ar = JSON.parse(localStorage.getItem("blogs")) || [];
    ar.splice(index, 1);
    localStorage.setItem("blogs", JSON.stringify(ar));
    window.location.reload();
}

function edit(index) {
    isEdit = true;
    const ar = JSON.parse(localStorage.getItem("blogs")) || [];
    let editButton = document.querySelector('.createBlog');
    editButton.click();
    Title.value = ar[index].Title;
    Tags.value = ar[index].Tags;
    Blog.value = ar[index].Blog;
    localStorage.setItem("blogs", JSON.stringify(ar));
    editID = index;
            
}
