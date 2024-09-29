document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value.trim(); 
    const address = document.getElementById('address').value.trim(); 

    if (!name || !address) {
        document.getElementById('message').textContent = 'Input fields are required.';
        document.getElementById('message').style.color = 'red';
        return; 
    }

    fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, address }), 
    })
    .then(response => {
        console.log('Response Status:',response, response.status); 

        let messageElement = document.getElementById('message'); 
        messageElement.textContent = ''; 
        console.log("messageElement",messageElement);

        if (response.status === 200) {
            messageElement.textContent = 'User Registered successfully'; 
            messageElement.style.color = 'green'; 
            console.log("messageElement :",messageElement);

            
        } else {
            messageElement.textContent = 'Error registering user'; 
            messageElement.style.color = 'red'; 
            console.log("messageElement :",messageElement);

        }
        this.reset(); 
    })
 
    .catch(error => {
        console.error('Error:', error);
    });
});





