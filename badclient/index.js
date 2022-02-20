let button1 = document.getElementById('submit');


button1.addEventListener('click', async function(event){
    let choice = document.getElementById('choice').value
    await fetch("http://127.0.0.1:8000/frequency", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({frequency: choice, person: "Mark"})
      });

    let timevalue = document.getElementById("timeinput").value;
    console.log(timevalue)
    await fetch("http://127.0.0.1:8000/timeinput", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({time: timevalue, person: "Mark"})
    });
    })

let ratings = document.getElementsByName('rating');
console.log(ratings)
ratings.forEach(item => {
    item.addEventListener('click', async function(event){
    let val = item.value
    await fetch("http://127.0.0.1:8000/ratings", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ratings: val, person: "Mark"})
      });
})})
    