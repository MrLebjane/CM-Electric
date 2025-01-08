   alertify.set('notifier', 'position', 'top-right');

 function registerForm()
{
    
    // var myForm = document.getElementById("bookform");
    // if (myForm.checkValidity()){
        event.preventDefault(); // prevent form from submitting and page from reloading
        axios.post('http://localhost:8080/addclient', {
        user_Name: ''+document.getElementById("name").value+'',
        user_Surname: ''+document.getElementById("surname").value+'',
        user_Email: ''+document.getElementById("email").value+'',
        user_Type: 'Client',
        user_Phone: ''+document.getElementById("phone").value+'',
        user_Password: ''+document.getElementById("password").value+'',
        })
        .then(response=>{
            console.log(response)
            // window.location.reload(); // redirect to the new pag
            alertify.alert("You have successfully registered");
            TrackForm()
        }).catch(error => {
            if (error.response.status === 405) {
              // Handle 405 error
              console.log("405 Error: Method not allowed.");
            };
        })
        //alertify.alert("Booking submitted. Please check your email for booking reference code.");

    // }
    
}

function submitBookForm()
{
   
        event.preventDefault(); // prevent form from submitting and page from reloading
        // const datetime=(document.getElementById("date").value).split('T');
        // const queryParams = new URLSearchParams(window.location.search);
        // const id = queryParams.get('id');
        const id = sessionStorage.getItem('isLoggedIn');
        axios.post('http://localhost:8080/postbook', {
        user_ID: id,
        service: ''+document.getElementById("service").value+'',
        appointmentDate: ''+formatDate(document.getElementById("datepicker").value)+'',
        address: ''+document.getElementById("address").value+''
        })
        .then(response=>{
            alertify.alert("Submitted")
            console.log(response)
            // window.location.reload(); // redirect to the new pag
            
        }).catch(error => {
            if (error.response.status === 405) {
              // Handle 405 error
              console.log("405 Error: Method not allowed.");
            };
        })
        // alertify.alert("Booking submitted. Please check your email for booking reference code.");

}


function submitLoginForm()
{ 

  event.preventDefault(); // prevent form from submitting and page from reloading

    axios.get('http://localhost:8080/getuseremail/'+document.getElementById("logemail").value)
      .then(response => {
        // setData(response.data);
        if (response.data.user_Email ==document.getElementById("logemail").value && response.data.user_Password == document.getElementById("logpassword").value) {
          
          sessionStorage.setItem('isLoggedIn',response.data.user_ID );
          window.location.href="./Home.html"
        } else {
          // Create a notification
          // PNotify.notice('Invalid username or password');
          // Create an alertify.alert dialog
          //  alertify.alert('Invalid username or ');
           alertify.alert('Invalid username or password');
            
            }
            })
      .catch(error => {
        console.log(error.message);
      });

  
  
}
function viewbooking(bookid){
  window.location.href="./viewbooking.html?id="+bookid
}
function viewquotation(bookid){
  window.location.href="./Quotation.html?id="+bookid
}
function redirectToInvoicePage(bookid){
  window.location.href="./Invoice.html?id="+bookid
}
function quote(){
  alertify.alert("Quotation not available")
}
function invoice(){
  alertify.alert("Invoice not available")
}
function Pay(){
  window.location.href="./Payment.html"
  
}
function Home(){
  window.location.href="./Home.html" 
}

function submitQueryForm()
{
    
     event.preventDefault();
      axios({
        method: 'post', // Explicitly set the method to POST
        url: 'http://localhost:8080/addquery',
        data: {
            user_Name: document.getElementById("q_name").value,
            user_Email: document.getElementById("q_email").value,
            subject: document.getElementById("q_subject").value,
            message: document.getElementById("q_message").value
        }
    })
    .then(response => {
        console.log(response);
        alertify.alert("Query submitted.");
        window.location.reload();
    })
    .catch(error => {
        alertify.alert("Internal server error.");
    });    
        
   
}

// Generate payment
// function GeneratePay()
// {
//         event.preventDefault(); // prevent form from submitting and page from reloading
//         axios.put('http://localhost:8080/generatepayment/'+sessionStorage.getItem('BookID'), {
//           isPaid:"1"
//         })
//         .then(response=>{
//             console.log(response)
//             alertify.alert("You have successfully paid. You can view your invoice");
//             TrackForm()
//         }).catch(error => {
//             if (error.response.status === 405) {
//               // Handle 405 error
//               console.log("405 Error: Method not allowed.");
//             };
//         })

//     // }
    
// }

function RejectQuotation()
{
        event.preventDefault(); // prevent form from submitting and page from reloading
        axios.put('http://localhost:8080/generatequotation/'+sessionStorage.getItem('BookID'), {
          Quotation:"0"
        })
        .then(response=>{
            console.log(response)
            alertify.alert("You have rejected the quotation");
            TrackForm()
        }).catch(error => {
            if (error.response.status === 405) {
              // Handle 405 error
              console.log("405 Error: Method not allowed.");
            };
        })

    // }
    
}
function Addfeedback(){
  //   const queryParams = new URLSearchParams(window.location.search);
  //  const id = queryParams.get('id');
   event.preventDefault(); // prevent form from submitting and page from reloading
        axios.put('http://localhost:8080/addfeedback/'+sessionStorage.getItem('BookID'), {
          feedback:""+document.getElementById("feedbackareaid").value+""
        })
        .then(response=>{
            console.log(response)
            alertify.alert("Feedback successfully sent.");
            TrackForm()
        }).catch(error => {
            if (error.response.status === 405) {
              // Handle 405 error
              console.log("405 Error: Method not allowed.");
            };
        })
  }
  
$(function() {
  // Define an array of dates to be disabled
  var disabledDates = [];
  // Define an array of dates to be disabled
  axios.get('http://localhost:8080/getcalbookings')
    .then(response => {
      response.data.forEach(user=>{
        disabledDates.push(user.appointmentDate)
      });
      // Initialize the datepicker
      $("#datepicker").datepicker({
          beforeShowDay: function(date) {
              var stringDate = $.datepicker.formatDate('yy-mm-dd', date);
              var today = new Date();
              today.setHours(0, 0, 0, 0);

              // Check if the date is in the past or in the disabledDates array
              if (date < today || $.inArray(stringDate, disabledDates) != -1) {
                  return [false, "disabled-date", "This date is disabled"];
              }
              return [true];
          }
      });
    })
    .catch(error => {
      console.log(error.message);
    });
});
function selectCalendar(){
  if (document.getElementById("service").value == "") {
    document.getElementById('datepicker').value = ""
    alertify.alert("First select a service")
  }
}
function formatDate(inputDate) {
  // Split the input date string into components
  const dateComponents = inputDate.split('/');

  // Ensure there are three components (month, day, and year)
  if (dateComponents.length === 3) {
    const month = dateComponents[0];
    const day = dateComponents[1];
    const year = dateComponents[2];

    // Create a new date string in the "yyyy-mm-dd" format
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    return formattedDate;
  } else {
    // Handle invalid input date
    return 'Invalid Date';
  }
}

