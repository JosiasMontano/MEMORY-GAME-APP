        const grid = document.getElementById('grid');                    //ubica el elemento grid y lo guarda en grid
        const timerDisplay = document.getElementById('timer');           //ubica el elemento timer y lo guarda en timer display
        let cards = [];                                                  //crea las cartas
        let flippedCards = [];                                           //crea las cartas volteadas
        let matchedCards = [];                                           //crea las cartas emparejadas 
        let startTime = null;                                            //tiempo de inicio 
        let timerInterval = null;                                        //intervalo de tiempo

        
        const icons = ['🐶', '🐱', '🐹', '🐰', '🦊', '🐻', '🐼', '†'];  // lista de iconos
        const iconPairs = [...icons, ...icons];                            // Duplica los iconos para crear pares
        shuffleArray(iconPairs);                                           // 

        
        iconPairs.forEach((icon, index) => {                             //Itera sobre cada elemento del array (task) hasta acabar los elementos
            const card = document.createElement('div');                  //crea carta y crea un div
            card.classList.add('card', 'hidden');                        //le agrega la clase "card" y hidden 
            card.dataset.icon = icon;                                    //dataset Permite almacenar información personalizada en el elemento. Se puede acceder a él como un objeto JavaScript. icon tiene la informacion que se guardara en database
            card.innerHTML = `<span class="icon">${icon}</span>`;        /*Limpia toda la lista*/
            card.addEventListener('click', flipCard);                    //Es un escuchador, cuando reciba la señal (cambio en el checked) se recibe lo que esta en () y ejecutara {} 
            grid.appendChild(card);
            cards.push(card);
        });

        // Función para mezclar un arreglo
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        // Función para voltear una carta
        function flipCard() {
            if (flippedCards.length < 2 && !flippedCards.includes(this) && !matchedCards.includes(this)) {
                this.classList.add('flipped', 'visible');
                flippedCards.push(this);

                // Si hay dos cartas volteadas, verifica si coinciden
                if (flippedCards.length === 2) {
                    setTimeout(checkMatch, 1000);
                }

                // Inicia el temporizador si es la primera carta volteada
                if (startTime === null) {
                    startTime = Date.now();
                    timerInterval = setInterval(updateTimer, 1000);
                }
            }
        }

        // Función para verificar si las cartas coinciden
        function checkMatch() {
            const icon1 = flippedCards[0].dataset.icon;
            const icon2 = flippedCards[1].dataset.icon;

            if (icon1 === icon2) {
                flippedCards[0].classList.add('matched');
                flippedCards[1].classList.add('matched');
                matchedCards.push(flippedCards[0], flippedCards[1]);
                flippedCards = [];

                // Verifica si todas las cartas han coincidido
                if (matchedCards.length === cards.length) {
                    clearInterval(timerInterval);
                    setTimeout(() => {
                        alert(`¡Felicidades! Has ganado en ${timerDisplay.textContent} segundos.`);
                    }, 500);
                }
            } else {
                flippedCards[0].classList.remove('visible');
                flippedCards[1].classList.remove('visible');
                flippedCards = [];
            }
        }

        // Función para actualizar el temporizador
        function updateTimer() {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            timerDisplay.textContent = elapsedTime;
        }