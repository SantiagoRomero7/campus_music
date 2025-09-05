













db.createCollection("registro_instrumentos", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: [
            "nombre",
            "tipo",
            "precio",
            "estado",
            "sedeId"
        ],
        properties: {
          nombre : {
            bsonType: "string",
            description: "Nombre completo del estudiante"
          },
          Tipo: {
            enum: ["Guitarra", "Piano", "Batería", "Violín", "bajo", "canto"],
            description: "Tipo de instrumento musical"
          },
          Estado: {
            enum: ["Disponible", "Reservado", "Mantenimiento", "No Disponible"],
            description: "Estado del instrumento"
          },
          SedeId: {
            bsonType: "string",
            pattern: "^S[0-9]+$",
            description: "ID de la sede donde está el instrumento (ej: S1)"
          }

        }
      }
    }
  });

  db.registros_instrumentos.insertOne ([

    {
        Nombre: "guitarra",
        Tipo: "guitarra",
        Estado:
        SedeId
    }

  ]);


  // necesito crear un script registro_instrumento.js que tenga una funcion que:
  //reciba un objeto { nombre, tipo, precio, estado, sede Id}
  //valide que todos los campos existan y cumplan las reglas de negocio, precio > 0, tipo {piano, guitarra, violin, bateria, bajo, canto ), estado {disponible, mantenimiento, reservado}
  //inserte el instrumento en la coleccion instrumentos con fechaRegistro: new Date() y cantidadInical:1 (o el campo que defina tu $jsonSchema)
  //devuelva el documento insertado (sin_id o con _id, segun prefieras para el test)