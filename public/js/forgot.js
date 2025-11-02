const form = document.getElementById('forgotForm');
const ok = document.getElementById('ok');
const err = document.getElementById('err');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    ok.style.display = 'none';
    err.style.display = 'none';
    try {
        const res = await fetch('/api/forgot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: document.getElementById('email').value })
        });
        const data = await res.json();
        if (res.ok) {
            ok.textContent = data.message || 'Email envoyé (vérifiez votre boîte mail).';
            ok.style.display = 'block';
            form.reset();
        } else {
            err.textContent = data.message || 'Une erreur est survenue.';
            err.style.display = 'block';
        }
    } catch (e2) {
        err.textContent = 'Erreur réseau.';
        err.style.display = 'block';
    }
});

