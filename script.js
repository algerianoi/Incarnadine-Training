let url = 'units-lvl1.json';
let content = document.getElementById("units");

fetch(url)
    .then(res => res.json())
    .then(categories => {
        addCategories(categories);

        const savedPassword = localStorage.getItem('savedPassword');
        if (savedPassword) {
            document.getElementById('password').value = savedPassword;
            loadProtectedJSON();
        }

    })
    .catch(err => console.log(err));

async function loadProtectedJSON() {
    const password = document.getElementById('password').value;
    if (!password) {
        alert('Please enter a password.');
        return;
    }

    try {
        const response = await fetch('encrypted-units.json');
        const encryptedData = await response.text();

        const bytes = CryptoJS.AES.decrypt(encryptedData, password);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedData) {
            throw new Error('Incorrect password.');
        }

        localStorage.setItem('savedPassword', password);

        const categories = JSON.parse(decryptedData);
        addCategories(categories);
        document.getElementById("unlock").style.display = "none";

    } catch (error) {
        alert('Incorrect password.');
        console.error(error);
    }
}

document.getElementById("password").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        loadProtectedJSON();
    }
});

function addCategories(categories) {
    categories.forEach(category => {
        let to_append = `<div class="category"><h2>${category.name}</h2><div class="units-content">`;
        category.units.forEach(unit => {
            to_append += `
                <div class="unit">
                    <h3>${unit.name}
                    <br>
                    <span class="unit-id">${unit.id}</span>
                    </h3>
                    
                    <span class="req"></span>
                    <br>
                    <a class="unit-btn" href="${unit.link}">ACCESS NOW</a>
                </div>
            `;
        });
        to_append = to_append + `</div></div>`;

        content.innerHTML += to_append;
    });
}