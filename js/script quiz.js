document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const sortBtn = document.querySelector('.sort-btn');
    const closeQuiz = document.querySelectorAll('.close-quiz');
    const sortingQuiz = document.getElementById('sorting-quiz');
    const submitBtn = document.querySelector('.sort-submit');
    const houseContainer = document.querySelector('.house-container');
    
    // Mostrar el quiz al hacer clic
    sortBtn.addEventListener('click', function() {
        sortingQuiz.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Ocultar el quiz
    closeQuiz.forEach(btn => {
        btn.addEventListener('click', function() {
            sortingQuiz.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Función para crear confeti
    function createConfetti(houseColor) {
        const colors = {
            gryffindor: ['#740001', '#eeba30', '#d3a625', '#000000'],
            hufflepuff: ['#ecb939', '#f0c75e', '#726255', '#372e29'],
            ravenclaw: ['#0e1a40', '#222f5b', '#5d5d5d', '#946b2d'],
            slytherin: ['#1a472a', '#2a623d', '#5d5d5d', '#aaaaaa']
        };
        
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.backgroundColor = colors[houseColor][Math.floor(Math.random() * colors[houseColor].length)];
            confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }
    
    // Función para obtener el escudo de la casa
    function getHouseCrest(house) {
        const crests = {
            gryffindor: 'https://i.pinimg.com/474x/c1/92/f6/c192f665b85652f1bd6ce5b376f07d1a.jpg',
            hufflepuff: 'https://i.pinimg.com/564x/61/fb/8f/61fb8ff0ca7e27417b6051cf464e8e4c.jpg',
            ravenclaw: 'https://media.milesdefiestas.com/galeria/articulos/decoracion-de-pared-emblema-ravenclaw-harry-potter-61cm_12420_1.jpg',
            slytherin: 'https://i.pinimg.com/736x/cd/78/23/cd78233213fd5438fac162b48099f09e.jpg'
        };
        return crests[house];
    }
    
    // Procesar el quiz
    submitBtn.addEventListener('click', function() {
        const answers = document.querySelectorAll('.quiz-input:checked');
        
        if (answers.length < 10) {
            alert('¡Por favor responde todas las preguntas!');
            return;
        }
        
        let totalScore = 0;
        answers.forEach(answer => {
            totalScore += parseInt(answer.value);
        });
        
        // Determinar la casa
        let house = '';
        let houseName = '';
        let houseDescription = '';
        
        if (totalScore >= 100 && totalScore <= 160) {
            house = 'hufflepuff';
            houseName = '¡Hufflepuff!';
            houseDescription = 'Eres leal, trabajador y justo. Los Hufflepuff valoran el trabajo duro, la paciencia y la amistad.';
        } else if (totalScore > 160 && totalScore <= 220) {
            house = 'ravenclaw';
            houseName = '¡Ravenclaw!';
            houseDescription = 'Eres inteligente, creativo y sabio. Los Ravenclaw valoran el aprendizaje, la sabiduría y la originalidad.';
        } else if (totalScore > 220 && totalScore <= 280) {
            house = 'gryffindor';
            houseName = '¡Gryffindor!';
            houseDescription = 'Eres valiente, audaz y de gran corazón. Los Gryffindor valoran el coraje, la determinación y la caballerosidad.';
        } else if (totalScore > 280 && totalScore <= 400) {
            house = 'slytherin';
            houseName = '¡Slytherin!';
            houseDescription = 'Eres ambicioso, astuto y un líder nato. Los Slytherin valoran la ambición, la astucia y el ingenio.';
        }
        
        // Mostrar resultado
        sortingQuiz.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        houseContainer.innerHTML = `
            <div class="house-result ${house}">
                <h2>¡El Sombrero Seleccionador ha hablado!</h2>
                <div class="house-crest">
                    <img src="${getHouseCrest(house)}" alt="${houseName}">
                </div>
                <h3>${houseName}</h3>
                <p>${houseDescription}</p>
                <button class="try-again-btn">Intentar de nuevo</button>
            </div>
        `;
        
        // Efecto de confeti
        createConfetti(house);
        
        // Botón para intentar de nuevo
        document.querySelector('.try-again-btn').addEventListener('click', function() {
            houseContainer.innerHTML = '';
            document.querySelectorAll('.quiz-input').forEach(input => {
                input.checked = false;
            });
        });
    });
    
    // Estilos CSS
    const style = document.createElement('style');
    style.textContent = `
        .confetti {
            position: fixed;
            width: 10px;
            height: 10px;
            opacity: 0;
            pointer-events: none;
            z-index: 9999;
            animation: confetti-fall 3s ease-out forwards;
        }
        
        @keyframes confetti-fall {
            0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        
        .house-result {
            text-align: center;
            padding: 2rem;
            border-radius: 15px;
            margin: 2rem auto;
            max-width: 500px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            animation: fadeIn 0.5s ease-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .house-result.gryffindor {
            background: linear-gradient(135deg, #740001, #eeba30);
            color: white;
        }
        
        .house-result.hufflepuff {
            background: linear-gradient(135deg, #ecb939, #372e29);
            color: white;
        }
        
        .house-result.ravenclaw {
            background: linear-gradient(135deg, #0e1a40, #946b2d);
            color: white;
        }
        
        .house-result.slytherin {
            background: linear-gradient(135deg, #1a472a, #aaaaaa);
            color: white;
        }
        
        .house-crest img {
            width: 180px;
            height: auto;
            margin: 1rem 0;
            filter: drop-shadow(0 5px 10px rgba(0,0,0,0.3));
            transition: transform 0.3s ease;
        }
        
        .house-crest img:hover {
            transform: scale(1.05);
        }
        
        .try-again-btn {
            padding: 0.8rem 1.8rem;
            background: white;
            border: none;
            border-radius: 50px;
            margin-top: 1.5rem;
            cursor: pointer;
            font-weight: bold;
            font-size: 1rem;
            transition: all 0.3s;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        }
        
        .try-again-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
    `;
    document.head.appendChild(style);
});