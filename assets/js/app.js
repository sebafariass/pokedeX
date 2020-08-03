
 /// INICIO funcion que hacer esconder CANVAS y tabla con valores sin haber elegido un pokeman \\\
$(document).ready(function(){
  
  $("#pokeman_show").hide();
  $("#table_caract").hide();
  pokeman_lista();
    
});
// ///    ----------------  FIN funcion para hacer desaparecer ------------------- \\\ 


          //MOSTRANDO POKEMONES-CONTEO \\
function pokeman_lista() {
  let pokeman_all = "https://pokeapi.co/api/v2/pokemon?limit=1000";

  $.get(pokeman_all, function(data) {

        let pokeman_all = data.count;
         
        for(i = 1; i < pokeman_all; i++)  {  /* recorriendo pokemanes */
          $("#lista_pokeman").append("<option value="+ data.results[i].name + " > " + data.results[i].name.toUpperCase() + "</option>");
        }
  })
  .done( function() { 
    //  ("Todo bien")


  }).fail( function() { 
    //alert ("Ops, hubo un error")
  });
}




function searchPokemanList(nombre) {
    console.log("inicio searchPokemanList: " + nombre);


    // ruta de api
    let url = "https://pokeapi.co/api/v2/pokemon/" + nombre.value;

    // muestra resultado de pokeman
    $("#pokeman_show").show();

    // tabla resultado de pokeman mostrado
    $("#table_caract").show();

    


      //AJAX \\
    $.ajax({
        url,
        success: function(data) {

            
           // obtener valores para mostrar
            pokemon = {
                pokedex: data.id,
                nombre: data.name,
                ataque: data.stats[1].base_stat,
                hp: data.stats[0].base_stat,
                defensa: data.stats[2].base_stat,
                velocidad: data.stats[5].base_stat,
                img_front: data.sprites.front_default,
                img_back: data.sprites.back_default,
            
                tipo: data.types[0].type.name
              };

              $("#list__pokedex").text(nombre.value);
              // dimensiones de imagen pokeman con jquery
              $("#img__pokemon__front").attr("src", pokemon.img_front);
              $("#img__pokemon__front").attr("width", 150);
              $("#img__pokemon__front").attr("heigth", 150);
              $("#img__pokemon__back").attr("src", pokemon.img_back);
              $("#img__pokemon__back").attr("width", 150);
              $("#img__pokemon__back").attr("heigth", 150);

              // Canvas
              var options = {
                  title: {
                      text: "HABILIDADES DEL POKEMON"             
                  },
                  data: [              
                  {

                    
                      type: "pie", //seleccionar type pie para modelarlo circular
                      dataPoints: [

                         // valores canvas \\
                          { label: "Ataque",  y: pokemon.ataque},  
                          { label: "Vida", y: pokemon.hp},
                          { label: "Velocidad", y: pokemon.velocidad},
                          { label: "Defensa", y: pokemon.defensa},
                          // valores canvas \\
                          
                         
                      ]
                  }
                  ]
              };
              $("#chartContainer").CanvasJSChart(options);


              // TABLA VALORES \\
              $("#table__caract").append(`
              <tr>

            
                <th>${pokemon.nombre}</th>
                <th>${pokemon.ataque}</th>
                <th>${pokemon.hp}</th>
                <th>@${pokemon.defensa}</th>
                <th>${pokemon.velocidad}</th>
              </tr> `);
             // TABLA VALORES \\
    
        },
        error: function() {
            alert("Ops, intentalo nuevamente"); //mensaje ALERT,  MUESTRA ERROR
        }
        
    });

      
}