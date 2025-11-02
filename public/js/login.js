document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('errorMessage');
    const successDiv = document.getElementById('successMessage');
    
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';
    
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            successDiv.textContent = data.message;
            successDiv.style.display = 'block';
            
            const userInfo = {
                name: email.split('@')[0],
                email: email
            };
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            
            setTimeout(() => {
                window.location.href = '/admin';
            }, 500);
        } else {
            errorDiv.textContent = data.message;
            errorDiv.style.display = 'block';
        }
    } catch (error) {
        errorDiv.textContent = 'Erreur de connexion';
        errorDiv.style.display = 'block';
    }
});

