
document.getElementById('rangeInput').oninput = function () {
    let value = (this.value - this.min) / (this.max - this.min) * 100;
    this.style.background = 'linear-gradient(to right, hsl(174, 77%, 80%) 0%, hsl(174, 77%, 80%) ' + value + '%, hsl(224, 65%, 95%) ' + value + '%, hsl(224, 65%, 95%) 100%)'
}

const main = document.querySelectorAll('.main');

const dataInput = {
    0: 10,
    1: 50,
    2: 100,
    3: 500,
    4: 1000
}

const dataOutput = {
    0: 8,
    1: 12,
    2: 16,
    3: 24,
    4: 36
}

if (main.length > 0) {
    for (let i = 0; i < main.length; i++) {
        const priceSliders = main[i];

        const priceInput = {};
        priceInput.el = priceSliders.querySelector('input');
        priceInput.data = dataInput;

        const priceOutputEls = priceSliders.parentNode.querySelectorAll('.card-container');
        for (let i = 0; i < priceOutputEls.length; i++) {
            const priceOutputEl = priceOutputEls[i];
            const priceOutput = {};

            priceOutput.views = priceOutputEl.querySelector('.views');
            priceOutput.amount = priceOutputEl.querySelector('.amount');
            priceOutput.data = dataOutput;

            priceInput.el.setAttribute("min", 0);
            priceInput.el.setAttribute("max", Object.keys(priceInput.data).length - 1);

            !priceInput.el.getAttribute("value") &&
                priceInput.el.setAttribute("value", 0);

            handlePriceSlider(priceInput, priceOutput);

            window.addEventListener('input', function (e) {
                e.preventDefault();
                handlePriceSlider(priceInput, priceOutput);
            });
        }
    }
}

function handlePriceSlider(input, output) {
    output.views.innerHTML = `${input.data[input.el.value]}K PageViews`;
    for (let i = 0; i < Object.keys(output.data).length; i++) {
        if (input.el.value === Object.keys(output.data)[i]) {
            output.amount.innerHTML = `$${output.data[i]} <span>/month</span>`
        }
    }
}