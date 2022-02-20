// DOM elements
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
    if (user) {
      // account info
      db.collection('users').doc(user.uid).get().then(doc => {
        const html = `
        <div>Logged in as ${user.email}</div>
        <div>Welcome ${doc.data().bio}</div>
        <div>Your phone number is:${doc.data().Phone}</div>
        <div>Your buddy is: ${doc.data().Friend}</div>
        <div>Your friends phone number is: ${doc.data().FriendPhone}</div>
        <div>Your current time to receive your call is: ${doc.data().Time}</div>
        `;
        accountDetails.innerHTML = html;
      });
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // clear account info
    accountDetails.innerHTML = '';
    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

// setup guides
const setupGuides = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const guide = doc.data();
      const li = `
        <!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Durhack</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="Durhack.css">
        <!-- CSS only -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" 
        rel="stylesheet" 
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossorigin="anonymous"></script>
    </head>
    <body>
                <div class="col">
                    <img src="people2.jfif">
                </div>
            </div>
            <hr>
            <div class="row">
                <div id="About">
                    <h3 style="font-size: 250%;"> How we help...</h3>
                    <p id="Step1">
                        Enter your email and phone number to sign up
                    </p>
                    <svg id="arrow" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" class="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                    </svg>
                    <p id="Step2">
                        Enter the details and phone number of your buddy
                    </p>
                    <svg id="arrow" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" class="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                    </svg>
                    <p id="Step3">
                        You will recieve a text everyday asking you to rate your mood
                    </p> 
                    <svg id="arrow" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" class="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                    </svg>     
                    <p id="Step4">
                    If your rating is low then your buddy will be notified 
                    </p>
                </div>
                <div class="container" id="rate">
                    <h2> Rate your day </h2>
                    <div class="col text-center">
                        <button type="button" class="btn" id="one">1</button>
                        <button type="button" class="btn" id="two">2</button>
                        <button type="button" class="btn" id="three">3</button>
                        <button type="button" class="btn" id="four">4</button>
                        <button type="button" class="btn" id="five">5</button>
                        <button type="button" class="btn" id="six">6</button>
                        <button type="button" class="btn" id="seven">7</button>
                        <button type="button" class="btn" id="eight">8</button>
                        <button type="button" class="btn" id="nine">9</button>
                        <button type="button" class="btn" id="ten">10</button>
                    </div>
                </div>
            </div>
        </div>
        <script src="client.js"></script>
    </body>
</html>
      `;
      html += li;
    });
    guideList.innerHTML = html
  } else {
    guideList.innerHTML = `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Durhack</title>
            <meta name="description" content="">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="Durhack.css">
            <!-- CSS only -->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" 
            rel="stylesheet" 
            integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
            crossorigin="anonymous">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
            crossorigin="anonymous"></script>
        </head>
        <body>
            <hr>
            <div class="container-fluid">
                <div class="row">
                    <div class="col" id="register">
                        <h2>Register with us</h2>
                    </div>
                    <div class="col">
                        <img src="people2.jfif">
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div id="About">
                        <h3 style="font-size: 250%;"> How we help...</h3>
                        <p id="Step1">
                            Enter your email and phone number to sign up
                        </p>
                        <svg id="arrow" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" class="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>
                        <p id="Step2">
                            Enter the details and phone number of your buddy
                        </p>
                        <svg id="arrow" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" class="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>
                        <p id="Step3">
                            You will recieve a text everyday asking you to rate your mood
                        </p> 
                        <svg id="arrow" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" class="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>     
                        <p id="Step4">
                        If your rating is low then your buddy will be notified 
                        </p>
                    </div>
                </div>
            </div>
            <script src="client.js"></script>
        </body>
    </html>
    `;
  }
  

};

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});