const listaPaises = document.getElementById('countries-list');

// --- FETCH ---//

const paises = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3/all');
    if (!response.ok) {
      throw new Error('No se ha podido cargar la API');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// --- VENTANA --- //

const ventanaInfo = (data) => {
  const ventana = document.querySelector('.ventana');
  
  ventana.innerHTML = '';

  const boton = document.createElement('button');
  boton.className = 'botonEliminar';
  boton.innerText = 'Cerrar';

  const ulInfo = document.createElement('ul');
  ulInfo.className = 'listaInfo';
  ulInfo.innerHTML = `
    <li id='paisVentana'>${data.name.common}</li>
    <li>Capital: ${data.capital?.[0] || 'N/A'}</li>
    <li>Population: ${data.population.toLocaleString()} hab.</li>
    <li>Driving Side: ${data.car.side}</li>
  `;

  const bandera = document.createElement('img');
  bandera.src = data.flags[0];
  bandera.className = 'bandera-ventana';
  bandera.alt = `${data.name.common} Flag`;

  const divCansado = document.createElement('div')
  divCansado.className = 'div-cansado'

  ventana.appendChild(divCansado);
  ventana.appendChild(boton);
  
  divCansado.appendChild(bandera);
  divCansado.appendChild(ulInfo);
 
  ventana.style.display = 'flex';

  // --- BOTON CERRAR --- //
  boton.addEventListener('click', () => {
    ventana.style.display = 'none';
  });
};

// --- FUNCION PAISES DOM --- //

const paisesBox = (data) => {
  data.sort((a, b) => a.name.common.localeCompare(b.name.common));

  data.forEach((element) => {
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

    // --- EVENTO EN BANDERA --- //

    bandera.addEventListener('click', () => {
      ventanaInfo(element);
    });

    listaPaises.appendChild(liPaises);

  });
};

// --- FUNCION PRINCIPAL --- //

paises()
  .then((data) => {
    paisesBox(data);
  })
  .catch((error) => console.error(error));

  // -------------------------------------------- //