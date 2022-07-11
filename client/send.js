const thisForm = document.getElementById('notificationForm');
thisForm.addEventListener('submit', async(e)=>{
e.preventDefault();
const formData = new FormData(thisForm).entries();
await fetch('/sendNotification',{
    method: 'POST',
    headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify(Object.fromEntries(formData))
})
// .then(res=> res.json())
// .then(res=> console.log(res))
.catch(err=> console.log(err,"error is happen"))
})