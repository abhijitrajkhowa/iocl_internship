const thisForm = document.getElementById('notificationForm');
const fileUpload = document.getElementById('icon');
const imagePreview = document.getElementById('img-preview');
let notificationIconUrl;
fileUpload.addEventListener('change', async(e)=>{
    const file = e.target.files[0];
    // console.log(file);
    // const data = new FormData();
    // data.append('file',file)
    // data.append('upload_preset',CLOUDINARY_UPLOAD_PRESET)
    fetch(`/icon-upload`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: file,
      }).then(res=> res.json())
      .then(data=>{
        console.log(data);
        imagePreview.src = data.secure_url;
        notificationIconUrl = data.secure_url;
      }).catch((e)=> console.log(e))
})
thisForm.addEventListener('submit', async(e)=>{
e.preventDefault();
const formData = new FormData(thisForm).entries();
let data = Object.fromEntries(formData)
data.icon = notificationIconUrl;
await fetch('/sendNotification',{
    method: 'POST',
    headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify(data)
})
// .then(res=> res.json())
// .then(res=> console.log(res))
.catch(err=> console.log(err,"error is happen"))
})