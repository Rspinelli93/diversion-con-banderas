
const listaPaises = document.getElementById('countries-list')

// --- FETCH ---//

const paises = async () => {
   try {
    const response = await fetch ('https://restcountries.com/v3/all')
    if (!response.ok) {
        throw new Error('No se ah podido cargar la api')
       }
    const data = await response.json()
    return data
   } 
   catch(error) {
    console.error(error)
   }
}

// --- FUNCION NOMBRE + BANDERA --- //

const paisesBox = (data) => {

  data.sort((a, b) => a.name.common.localeCompare(b.name.common));
   
  data.forEach(element => {
    
    const liPaises = document.createElement('li');
     
    const bandera = document.createElement('img');
    bandera.src = element.flags[0];
    bandera.className = 'bandera';
    bandera.alt = `${element.name.common} Flag`;
  

    const divPais = document.createElement('div');
    divPais.className = 'pais';
    divPais.textContent = element.name.common; 

    
    liPaises.appendChild(bandera);
    liPaises.appendChild(divPais);
  
    listaPaises.appendChild(liPaises);

    // -- Evento Agrandar cuadro -- //

    bandera.addEventListener('click', () => {
    
      liPaises.classList.add('animacion');
      divPais.remove()
      
      const boton = document.createElement('button')
      boton.className = 'botonEliminar'
      boton.innerText = 'Cerrar'

      const ulInfo = document.createElement('ul')
      ulInfo.className = 'listaInfo';

      ulInfo.innerHTML = `
        <li>Country: ${element.name.common}</li>
        <li>Capital: ${element.capital[0]}</li>
        <li>Population: ${element.population} hab.</li>
        <li>Driving Side: ${element.car.side}</li>
      `
      liPaises.appendChild(ulInfo)
      liPaises.appendChild(boton)

      // -- Evento Achicar cuadro -- //
      
      boton.addEventListener('click', () => {
        liPaises.appendChild(divPais);

        liPaises.classList.remove('animacion');
      
        ulInfo.remove();
        boton.remove();
      })
    });

    
  }) 
}

// --- FUNCION PRINCIPAL --- //
  
paises()
  .then(data => {
    paisesBox(data);
    console.log(data)
    return data
})

// -------------------------------------------- //