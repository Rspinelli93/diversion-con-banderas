/*

Los paises se ordenarán en orden alfabético (recuerda el método sort).
Recuerda que para ordenar no es lo mismo mayúsculas que minúsculas. 

Si comparas que sea lo mismo... pasa los nombres a mayúsculas si te parece 
más sencillo para la comparación.

La información detallada incluye la bandera del país,
la capital, la población y el lado de la carretera donde se circula. 
Este flotante se quedará fijo y centrado hasta que se cierre.

La aplicación está diseñada con un enfoque simple y utiliza
funciones asíncronas para manejar las solicitudes a la API. 
Recuerda que podrás usar fetch, Async/Await...

Puedes manipular el HTML si lo necesitaras.

Si necesitas añadir clases a un elemento mediante JS, 
lo puedes hacer con elemento.classList.add('clase que quieres añadir') 
y para eliminar elemento.classList.remove('clase que quieres añadir')

*/

const listaPaises = document.getElementById('countries-list')

// --- FETCH ---//

const paises = async () => {
   try {
    const response = await fetch ('https://restcountries.com/v3/all')
    if (!response.ok) {
        throw new Error('No se ah podido cargar la api')
       }
    const data = await response.json()
    console.log(data)
    return data
   } 
   catch(error) {
    console.error(error)
   }
}

// --- FUNCION PARA ITERAR --- //



// --- FUNCION NOMBRE + BANDERA --- //
  const paisesBox = (data) => {

    data.sort((a, b) => a.name.common.localeCompare(b.name.common));
    
    data.forEach(element => {
      listaPaises.innerHTML += `<li class="pais-caja">
        <img src="${element.flags[0]}" class="bandera" alt="${element.name.common} Flag">
        <div class="pais">${element.name.common}</div>
        </li>
      `;
    });
  };
  


// --- FUNCION INFO --- //

const paisInfo = () => {

}

// --- FUNCION BOTON BORRAR --- //


// --- FUNCION PRINCIPAL --- //
  
paises()
  .then(data => {
    paisesBox(data);
  });