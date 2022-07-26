const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/biki52/iocl_internship/upload';
const CLOUDINARY_UPLOAD_PRESET = 'iocl_noti_icon';

const thisForm = document.getElementById('notificationForm');
const fileUpload = document.getElementById('icon');
const imagePreview = document.getElementById('img-preview');
let notificationIconUrl;
fileUpload.addEventListener('change', async(e)=>{
    const file = e.target.files[0];
    // console.log(file);
    const data = new FormData();
    data.append('file',file)
    data.append('upload_preset',CLOUDINARY_UPLOAD_PRESET)
    fetch(`${CLOUDINARY_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data,
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