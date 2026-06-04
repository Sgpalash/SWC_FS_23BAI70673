let draggedCard = null;

let cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("dragstart", function(){

        draggedCard = card;

    });

});

let columns = document.querySelectorAll(".column");

columns.forEach(column => {

    column.addEventListener("dragover", function(event){

        event.preventDefault();

    });

    column.addEventListener("drop", function(){

        column.appendChild(draggedCard);

    });

});