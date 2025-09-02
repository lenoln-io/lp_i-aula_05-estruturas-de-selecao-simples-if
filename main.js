let currentSlide = 1;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

// Inicializar indicadores
function initializeIndicators() {
	const indicatorsContainer = document.getElementById("slideIndicators");
	for (let i = 1; i <= totalSlides; i++) {
		const dot = document.createElement("button");
		dot.className = `w-3 h-3 rounded-full transition-all ${i === 1 ? "bg-soft-blue" : "bg-gray-300"}`;
		dot.onclick = () => goToSlide(i);
		indicatorsContainer.appendChild(dot);
	}
}

function showSlide(n) {
	// Esconder todos os slides
	slides.forEach((slide) => {
		slide.classList.add("hidden");
		slide.classList.remove("slide-enter");
	});

	// Mostrar slide atual
	const activeSlide = document.querySelector(`[data-slide="${n}"]`);
	if (activeSlide) {
		activeSlide.classList.remove("hidden");
		activeSlide.classList.add("slide-enter");
	}

	// Atualizar número do slide
	document.getElementById("currentSlideNum").textContent = n;

	// Atualizar indicadores
	document.querySelectorAll("#slideIndicators button").forEach((dot, index) => {
		dot.className = `w-3 h-3 rounded-full transition-all ${
			index + 1 === n ? "bg-soft-blue" : "bg-gray-300"
		}`;
	});

	// Atualizar botões de navegação
	document.getElementById("prevBtn").disabled = n === 1;
	document.getElementById("nextBtn").disabled = n === totalSlides;
}

function changeSlide(direction) {
	const newSlide = currentSlide + direction;
	if (newSlide >= 1 && newSlide <= totalSlides) {
		currentSlide = newSlide;
		showSlide(currentSlide);
	}
}

function goToSlide(n) {
	currentSlide = n;
	showSlide(currentSlide);
}

function testarAprovacao() {
	const nota = parseFloat(document.getElementById("notaInput").value);
	const resultado = document.getElementById("resultado");

	if (Number.isNaN(nota)) {
		resultado.innerHTML = `
                    <div class="bg-red-100 border-l-4 border-red-500 p-4 rounded">
                        <div class="flex items-center">
                            <span class="text-red-600 mr-2">⚠️</span>
                            <span class="text-red-700 font-semibold">Por favor, digite um número válido!</span>
                        </div>
                    </div>
                `;
		return;
	}

	if (nota < 0 || nota > 10) {
		resultado.innerHTML = `
                    <div class="bg-orange-100 border-l-4 border-orange-500 p-4 rounded">
                        <div class="flex items-center">
                            <span class="text-orange-600 mr-2">⚠️</span>
                            <span class="text-orange-700 font-semibold">Nota deve estar entre 0 e 10!</span>
                        </div>
                    </div>
                `;
		return;
	}

	if (nota >= 7.0) {
		resultado.innerHTML = `
                    <div class="bg-green-100 border-l-4 border-green-500 p-4 rounded">
                        <div class="flex items-center">
                            <span class="text-green-600 mr-2 text-2xl">🎉</span>
                            <div>
                                <div class="text-green-700 font-bold text-lg">APROVADO!</div>
                                <div class="text-green-600 text-sm">Nota: ${nota.toFixed(1)}</div>
                            </div>
                        </div>
                    </div>
                `;
	} else {
		resultado.innerHTML = `
                    <div class="bg-red-100 border-l-4 border-red-500 p-4 rounded">
                        <div class="flex items-center">
                            <span class="text-red-600 mr-2 text-2xl">😔</span>
                            <div>
                                <div class="text-red-700 font-bold text-lg">REPROVADO!</div>
                                <div class="text-red-600 text-sm">Nota: ${nota.toFixed(1)} (Precisa de pelo menos 7.0)</div>
                            </div>
                        </div>
                    </div>
                `;
	}
}

// Navegação por teclado
document.addEventListener("keydown", (event) => {
	if (event.key === "ArrowLeft") {
		changeSlide(-1);
	} else if (event.key === "ArrowRight") {
		changeSlide(1);
	}
});

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
	initializeIndicators();
	showSlide(currentSlide);
});
