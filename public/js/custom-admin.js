document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.startsWith('/admin')) {
        addHeaderUserInfo();
        addCustomLogoutButton();
    }
});

function addHeaderUserInfo() {
    if (document.querySelector('.header-user-menu')) {
        return;
    }

    const userInfo = getUserInfo();

    const headerUserMenu = document.createElement('div');
    headerUserMenu.className = 'header-user-menu';

    const menuTrigger = document.createElement('div');
    menuTrigger.className = 'user-menu-trigger';

    const userEmail = document.createElement('span');
    userEmail.className = 'user-email';
    userEmail.textContent = userInfo.email;

    const userAvatar = document.createElement('div');
    userAvatar.className = 'user-avatar';
    userAvatar.textContent = userInfo.name.charAt(0).toUpperCase();

    menuTrigger.appendChild(userEmail);
    menuTrigger.appendChild(userAvatar);

    const menuDropdown = document.createElement('div');
    menuDropdown.className = 'user-menu-dropdown';

    const logoutItem = document.createElement('div');
    logoutItem.className = 'user-menu-item';
    logoutItem.innerHTML = `
        <div class="menu-icon">🚪</div>
        <div class="menu-text">Log out</div>
    `;
    logoutItem.onclick = function() {
        window.location.href = '/logout';
    };

    menuDropdown.appendChild(logoutItem);

    headerUserMenu.appendChild(menuTrigger);
    headerUserMenu.appendChild(menuDropdown);

    menuTrigger.onclick = function(e) {
        e.stopPropagation();
        menuDropdown.classList.toggle('show');
    };

    document.addEventListener('click', function(e) {
        if (!headerUserMenu.contains(e.target)) {
            menuDropdown.classList.remove('show');
        }
    });

    const adminHeader = document.querySelector('.adminjs-header') || document.querySelector('header') || document.body;
    adminHeader.appendChild(headerUserMenu);
}

function addCustomLogoutButton() {
    const logoutContainer = document.createElement('div');
    logoutContainer.className = 'custom-logout-container';
    
    const userInfo = getUserInfo();
    
    const userAvatar = document.createElement('div');
    userAvatar.className = 'user-avatar';
    userAvatar.textContent = userInfo.name.charAt(0).toUpperCase();

    const userName = document.createElement('span');
    userName.className = 'user-name';
    userName.textContent = userInfo.name;

    const logoutBtn = document.createElement('button');
    logoutBtn.className = 'logout-btn';
    logoutBtn.textContent = 'Déconnexion';
    logoutBtn.onclick = function() {
        window.location.href = '/logout';
    };

    const userInfoDiv = document.createElement('div');
    userInfoDiv.className = 'user-info';
    userInfoDiv.appendChild(userAvatar);
    userInfoDiv.appendChild(userName);
    
    logoutContainer.appendChild(userInfoDiv);
    logoutContainer.appendChild(logoutBtn);

    document.body.appendChild(logoutContainer);
}

function getUserInfo() {
    const stored = localStorage.getItem('userInfo');
    if (stored) {
        return JSON.parse(stored);
    }

    return {
        name: 'Utilisateur',
        email: 'user@example.com'
    };
}

function saveUserInfo(userData) {
    localStorage.setItem('userInfo', JSON.stringify(userData));
}
