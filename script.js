const form = document.querySelector("form");
let values = JSON.parse(localStorage.getItem("history")) || [];
console.log(values);
const historique = document.getElementById("historique");

    historique.addEventListener("click", (event) => {
      if (event.target.classList.contains("delete-btn")) {
        const li = event.target.closest("li");  // remonte au <li>
        const index = parseInt(li.getAttribute("data-index")); 
        values.splice(index,1);
        localStorage.setItem("history",JSON.stringify(values))
        AfficherHistorique();   
      }
    });


form.addEventListener("submit", (event) => {
    event.preventDefault();

    let Poids = parseFloat(document.getElementById("Poids").value);
    let Taillesquare = (parseFloat(document.getElementById("Taille").value) /100)**2;
    let Taille = parseFloat(document.getElementById("Taille").value);
    let result = document.getElementById("result");


    if (isNaN(Poids) || isNaN(Taillesquare) ){
        result.textContent = "⚠️ Veuillez entrer des valeurs valides!";
        return;
    }
    let imc = (Poids/Taillesquare).toFixed(2)
    let inter = document.getElementById("inter");
    if (imc < 18.5) {
        inter.textContent = " Maigreur";
        inter.style.color ="#3498db";
    }else if (imc<25) {
        inter.textContent = " Corpulence normale";
        inter.style.color ="#27ae60";

    }else if (imc<30){
        inter.textContent = " Surpoids";          
        inter.style.color ="#f39c12";

      
    }else if (imc<35){
        inter.textContent = " Obesité modérée";
        inter.style.color ="#e74c3c";
    }else if (imc<40){
        inter.textContent = " Obésité sévère";
        inter.style.color ="#c0392b";

    }else if (imc>=40){
        inter.textContent = " Obésité morbide";
        inter.style.color ="#7d3c98";
    }
    else {
        result.textContent = "Veuillez entrer des valeurs valides"
    }
        result.textContent = `${imc}`;
    inter.style.textShadow = ` 0 0 10px ${inter.style.color}`;
    result.style.fontSize = "1.3rem"
    inter.style.fontSize = "1.5rem"
    let dico = {
        "Poids":Poids,
        "Taille":Taille,
        "IMC":imc,
        "Interprétation":inter.textContent
        
    };
    values.push(dico);
    console.log(values);
    values = suppDouble(values);
    // Sauvegarder dans localStorage
    localStorage.setItem("history", JSON.stringify(values));
    if (historyVisible){
        AfficherHistorique();
    };




});





function suppDouble(values) {
    values = values.filter((v,i,self)=> i === self.findIndex(obj => obj.Poids === v.Poids && obj.Taille === v.Taille));
    return values;
}


function AfficherHistorique() {
    if (values.length === 0) {
        historique.innerHTML = "";
        historique.innerHTML = "<div class='history-box'><p style='opacity:0.7'>Aucun enregistrement pour l’instant 📭</p></div>";
        return;
    }

    historique.innerHTML = `
        <div class="history-box">
            <h3>📜 Votre historique</h3>
            <ul class="history-list"></ul>
        </div>
    `;

    let ul = historique.querySelector(".history-list");

    values.forEach((dico, i) => {
        let li = document.createElement("li");
        li.dataset.index = i;

        li.innerHTML = `
            <div class="history-item">
                <span><strong>⚖️ Poids :</strong> ${dico.Poids} kg</span>
                <span><strong>📏 Taille :</strong> ${(dico.Taille/100).toFixed(2)} m</span>
                <span><strong>📊 IMC :</strong> ${dico.IMC}</span>
                <span class="interpret">${dico.Interprétation}</span>
                <button class="delete-btn">❌</button>
            </div>
        `;

        ul.appendChild(li);
    });
}

let historyBtn = document.getElementById("history");
let historyVisible = false; // état d'affichage

historyBtn.addEventListener("click", () => {
    if (!historyVisible) {
        AfficherHistorique();
        historique.style.display = "block";
    } else {
        historique.style.display = "none";
    }
    historyVisible = !historyVisible;
});

let history = document.getElementById("history")
history.addEventListener("click", () => {
    AfficherHistorique();
});
