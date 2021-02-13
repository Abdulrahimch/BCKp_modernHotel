const renderOrder = (order, id) => {
    const markup = `
                <div id='id'>
                    <h4 class="results__name">${order}</h4>
                     <button type="button" onclick="removeOrder(this)">Yapılmış!</button>
                </div>

            </a>
    `;

    return markup;

};

module.exports = renderOrder