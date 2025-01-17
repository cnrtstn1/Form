const addPhotoButton = document.getElementById('addPhotoButton');
const photoInput = document.getElementById('photoInput');
const uploadedImage = document.getElementById('uploadedImage');

addPhotoButton.addEventListener('click', () => photoInput.click());

photoInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImage.src = e.target.result;
            uploadedImage.style.display = 'block';
            addPhotoButton.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});

const callButton = document.getElementById('callButton');
const phoneInput = document.getElementById('phone');

callButton.addEventListener('click', () => {
    const phoneNumber = phoneInput.value;
    if (phoneNumber.startsWith('+')) {
        const whatsappUrl = 'https://wa.me/' + phoneNumber.slice(1);
        window.open(whatsappUrl, '_blank');
    }
});

const userForm = document.getElementById('userForm');
const recordList = document.getElementById('recordList');
const modal = document.getElementById('modal');
const modalName = document.getElementById('modalName');
const modalEmail = document.getElementById('modalEmail');
const modalPhone = document.getElementById('modalPhone');
const modalImage = document.getElementById('modalImage');
const modalCallButton = document.getElementById('modalCallButton');
const closeModal = document.getElementById('closeModal');

function saveRecord() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const photo = uploadedImage.src;

    const record = { name, email, phone, photo };







    let records = JSON.parse(localStorage.getItem('records')) || [];
    records.push(record);
    localStorage.setItem('records', JSON.stringify(records));


    userForm.reset();
    uploadedImage.style.display = 'none';
    addPhotoButton.style.display = 'block';

    loadRecords();
}

function loadRecords() {
    const records = JSON.parse(localStorage.getItem('records')) || [];
    recordList.innerHTML = '<h3>Kayıtlı İsimler</h3>';

    records.forEach((record) => {
        const recordItem = document.createElement('p');
        recordItem.textContent = record.name;
        recordItem.style.cursor = 'pointer';
        recordItem.onclick = () => openModal(record);
        recordList.appendChild(recordItem);
    });
}

function openModal(record) {
    modalName.textContent = record.name;
    modalEmail.textContent = `E-posta: ${record.email}`;
    modalPhone.textContent = `Telefon: ${record.phone}`;
    modalImage.src = record.photo || '';

    modalCallButton.onclick = () => {
        const phoneNumber = record.phone.replace(/\s+/g, '');
        if (phoneNumber.startsWith('+')) {
            const whatsappUrl = 'https://wa.me/' + phoneNumber.slice(1);
            window.open(whatsappUrl, '_blank');
        } else {
            alert("Telefon numarası uygun değil!");
        }
    };

    modal.style.display = 'flex';
}

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

userForm.addEventListener('submit', (event) => {
    event.preventDefault();
    saveRecord();
});


loadRecords();
