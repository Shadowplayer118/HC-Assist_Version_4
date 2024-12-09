function loadCards() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'workflow_load.php', true);  // Change 'get_cards_data.php' to your backend script

    xhr.onload = function() {
        if (this.status === 200) {
            const data = JSON.parse(this.responseText);
            const cardContainer = document.getElementById('card-container');

            data.forEach(item => {
                // Create a card element
                const card = document.createElement('div');
                card.classList.add('card');

                // Insert the data into the card
                card.innerHTML = `
                    <h3>${item.workflow_id}</h3>
                    <p>${item.title}</p>
                `;

                // Append the card to the container
                cardContainer.appendChild(card);
            });
        }
    };

    xhr.send();
}

// Load the cards when the page loads
window.onload = function() {
    loadCards();
};