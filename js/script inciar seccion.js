
    document.addEventListener('DOMContentLoaded', function () {
      const loginForm = document.getElementById('loginForm');

      loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

    
        const fullname = document.getElementById('fullname').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const house = document.getElementById('house').value;
        const year = document.getElementById('year').value;


        if (fullname && username && password && house && year) {
          
          window.location.href = "http://127.0.0.1:5500/mi%20proyecto%20personal/HTML/index.html"; 
        } else {
         
          alert("Por favor, completa todos los campos.");
        }
      });
    });
