const mysql = require('mysql');

const conexion = mysql.createConnection({
    localhost:'127.0.0.1',
    user:'root',
    password:'JorgeGiron',
    database:'sakiladb',
    port:'3306'
   
});

conexion.connect(function(err) {
    if(err) {
        console.log('No se pudo');
        return;
    }
    console.log('Si se pudo');
})

const txtbusqueda = document.getElementById('txt-busqueda');
const formfiltrar = document.getElementById('form-filtrar');
const resultados = document.getElementById('resultados')
formfiltrar.addEventListener('submit', function(e){
    e.preventDefault();
});

txtbusqueda.addEventListener('keyup', async function(evt){
    console.log(evt.code);
    if(evt.code === 'Enter'){
        //realizar busqueda en la base de datos
        conexion.query(`SELECT * FROM film WHERE title like '%${txtbusqueda.value}%' or description like '%${txtbusqueda.value}%'`,  function(err, filas, campos){
            if(err){
                console.log(`Algo salio mal: ${err}`)
            }
            let html = '<div>';
            for(let fila of filas){
                html += `<h3>${fila.title}</h3>`;
                html += `<h4>${fila.description}</h4>`;

            }
            html += "</div>"
            resultados.innerHTML = html;
        });
    }
});