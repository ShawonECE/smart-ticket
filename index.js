// utility functions

const hideElement = (id) => {
    const element = document.getElementById(id);
    element.classList.add('hidden');
};

const showElement = (id) => {
    const element = document.getElementById(id);
    element.classList.remove('hidden');
};

const getInnerText = (id) => {
    const element = document.getElementById(id);
    return element.innerText;
};

const setInnerText = (text, id) => {
    document.getElementById(id).innerText = text;
};

const getInputValue = (id) => {
    const element = document.getElementById(id);
    return element.value;
};

const setInputValue = (value, id) => {
    const element = document.getElementById(id);
    element.value = value;
};

const setBackgroundColor = (id) => {
    const element = document.getElementById(id);
    element.classList.add('bg-[#1DD100]', 'text-white');
};

const removeBackgroundColor = (id) => {
    document.getElementById(id).classList.remove('bg-[#1DD100]', 'text-white');
};

const appendToTable = (id) => {
    const table = document.getElementById('table-body');
    const row = document.createElement('tr');
    row.id = id;
    row.classList.add('inter-font', 'text-base');
    row.innerHTML = `<td>${id}</td> <td>Economy</td> <td>550</td>`;
    table.appendChild(row); 
};

const removeFromTable = (id) => {
    const table = document.getElementById('table-body');
    const children = table.children;
    for (let child of children) {
        if (child.id === id) {
            table.removeChild(child);
        }
    }
};

const removeAttribute = (attribute, id) => {
    const element = document.getElementById(id);
    element.removeAttribute(attribute);
};

const setAttribute = (attribute, value, id) => {
    const element = document.getElementById(id);
    element.setAttribute(attribute, value);
};

const checkSubmit = () => {
    let phoneNumber = getInputValue('phone');
    let numberPattern = /^(01)\d{9}$/;
    let name = getInputValue('name');
    let seats = selectedSeats.length;
    if (phoneNumber && name && seats) {
        if (numberPattern.test(phoneNumber)) {
            document.getElementById('phone').title = 'Your number is valid';
            if (document.getElementById('next-btn').hasAttribute('disabled')) {
                removeAttribute('disabled', 'next-btn');
            }
        } else {
            document.getElementById('phone').title = 'Please provide a valid number: 01XXXXXXXXX';
            if (!document.getElementById('next-btn').hasAttribute('disabled')) {
                setAttribute('disabled', 'true', 'next-btn');
            }
        }
    } else {
        if (!document.getElementById('next-btn').hasAttribute('disabled')) {
            setAttribute('disabled', 'true', 'next-btn');
        }
    }
};

// ----------------------------------------------------------------
const selectedSeats = [];
const coupons = ['NEW15', 'Couple 20'];

document.getElementById('seat-grid').addEventListener('click', (event) => {
    let seat = event.target;
    let seatLeft = parseInt(getInnerText('seat-left'));
    let total = parseInt(getInnerText('total'));
    
    if (seat.nodeName === 'BUTTON') {
        let id = seat.id;
        if (document.getElementById(id).classList.contains('bg-[#1DD100]')) {
            removeBackgroundColor(id);
            removeFromTable(id);
            selectedSeats.splice(selectedSeats.indexOf(id), 1);
            seatLeft++;
            total = total - 550;
            let grandTotal = selectedSeats.length * 550;
            setInnerText(total, 'total');
            setInnerText(grandTotal, 'grand-total');
            setInnerText(seatLeft, 'seat-left');
            setInnerText(selectedSeats.length, 'selected-seats');
            showElement('coupon-section');
            checkSubmit();
        } else if (!document.getElementById(id).classList.contains('bg-[#1DD100]') && selectedSeats.length < 4) {
            setBackgroundColor(id);
            appendToTable(id);
            selectedSeats.push(id);
            seatLeft--;
            total = total + 550;
            let grandTotal = selectedSeats.length * 550;
            setInnerText(total, 'total');
            setInnerText(grandTotal, 'grand-total');
            setInnerText(seatLeft, 'seat-left');
            setInnerText(selectedSeats.length, 'selected-seats');
            setInnerText(selectedSeats.length * 550, 'total');
            checkSubmit();
        } else {
            alert('You have already selected 4 seats');
        }
    }
});

document.getElementById('coupon-btn').addEventListener('click', () => {
    const coupon = getInputValue('coupon-value');
    let grandTotal = parseInt(getInnerText('grand-total'));
    if (selectedSeats.length > 3) {
        if (coupon) {
            if (coupon === coupons[0]) {
                grandTotal = grandTotal * 0.85;
                setInnerText(grandTotal, 'grand-total');
                hideElement('coupon-section');
            } else if (coupon === coupons[1]) {
                grandTotal = grandTotal * 0.8;
                setInnerText(grandTotal, 'grand-total');
                hideElement('coupon-section');
            } else {
                alert('Insert a valid coupon');
            }
            setInputValue('', 'coupon-value');
        } else {
            alert('Insert coupon code');
        }
    } else {
        alert('You have to select 4 seats to apply coupon');
    }
});

document.getElementById('phone').addEventListener('input', () => {
    checkSubmit();
});

document.getElementById('name').addEventListener('input', () => {
    checkSubmit();
});