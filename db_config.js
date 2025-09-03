// Selecciona la base de datos 'campus_music' para su uso.
// Si la base de datos no existe, MongoDB la creará al insertar el primer documento.
//use campus_music;

// --- Definición de Colecciones y Validaciones ---

// Crea la colección 'usuarios' con un validador de esquema JSON.
// Esto asegura que todos los documentos insertados sigan una estructura y un formato predefinidos.
db.createCollection("usuarios", {
    validator: {
      $jsonSchema: {
        // El documento debe ser un objeto.
        bsonType: "object",
        // Los siguientes campos son obligatorios.
        required: [
          "_id",
          "id_usuario",
          "Nombre",
          "Correo",
          "Contrasena",
          "Rol"
        ],
        properties: {
          // Define las propiedades y sus validaciones.
          _id: {
            bsonType: "objectId",
            description: "ID único del usuario"
          },
          id_usuario: {
            bsonType: "string",
            // El formato debe ser 'U' seguido de uno o más dígitos.
            pattern: "^U[0-9]+$",
            description: "ID del usuario que empieza por 'U' seguido de números (ej: U1)"
          },
          Nombre: {
            bsonType: "string",
            description: "Nombre completo del usuario"
          },
          Correo: {
            bsonType: "string",
            // El formato debe ser una dirección de correo electrónico válida.
            pattern: "^.+@.+\\..+$",
            description: "Correo electrónico válido"
          },
          Contrasena: {
            bsonType: "string",
            // La longitud mínima de la cadena es de 8 caracteres.
            minLength: 8,
            description: "Contraseña del usuario (mínimo 8 caracteres)"
          },
          Rol: {
            // El valor debe ser uno de los elementos de la lista.
            enum: ["Administrador", "Empleado", "Estudiante"],
            description: "Rol del usuario en el sistema"
          }
        }
      }
    }
  });
  
// Crea la colección 'estudiantes' con validación de esquema.
db.createCollection("estudiantes", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: [
          "_id",
          "id_estudiante",
          "Nombre",
          "Cedula",
          "Telefono",
          "CorreoElectronico",
          "NivelMusical",
          "CursosInscritos"
        ],
        properties: {
          _id: {
            bsonType: "objectId",
            description: "ID único del estudiante"
          },
          id_estudiante: {
            bsonType: "string",
            // El formato debe ser 'E' seguido de uno o más dígitos.
            pattern: "^E[0-9]+$",
            description: "ID del estudiante que empieza por 'E' seguido de números (ej: E1)"
          },
          Nombre: {
            bsonType: "string",
            description: "Nombre completo del estudiante"
          },
          Cedula: {
            bsonType: "string",
            // La cédula debe ser de 8 a 10 dígitos.
            pattern: "^[0-9]{8,10}$",
            description: "Cédula de identidad (solo números)"
          },
          Telefono: {
            bsonType: "string",
            // El número de teléfono debe ser de 10 dígitos y empezar con '3'.
            pattern: "^[3][0-9]{9}$",
            description: "Número de teléfono colombiano (10 dígitos, inicia en 3)"
          },
          CorreoElectronico: {
            bsonType: "string",
            pattern: "^.+@.+\\..+$",
            description: "Correo electrónico válido"
          },
          NivelMusical: {
            enum: ["Principiante", "Intermedio", "Avanzado"],
            description: "Nivel musical del estudiante"
          },
          CursosInscritos: {
            bsonType: "array",
            // Cada elemento del array debe ser una cadena con el formato de ID de curso.
            items: {
              bsonType: "string",
              pattern: "^C[0-9]+$",
              description: "ID de curso inscrito (ej: C1)"
            },
            description: "Lista de cursos inscritos por el estudiante"
          }
        }
      }
    }
  });
  
  // Crea la colección 'profesores' con validación de esquema.
  db.createCollection("profesores", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: [
          "_id",
          "id_profesor",
          "Nombre",
          "Correo",
          "Telefono",
          "Especialidad",
          "Experiencia",
          "CursosAsignados"
        ],
        properties: {
          _id: {
            bsonType: "objectId",
            description: "ID único del profesor"
          },
          id_profesor: {
            bsonType: "string",
            pattern: "^P[0-9]+$",
            description: "ID del profesor que empieza por 'P' seguido de números (ej: P1)"
          },
          Nombre: {
            bsonType: "string",
            description: "Nombre completo del profesor"
          },
          Correo: {
            bsonType: "string",
            pattern: "^.+@.+\\..+$",
            description: "Correo electrónico válido"
          },
          Telefono: {
            bsonType: "string",
            pattern: "^[3][0-9]{9}$",
            description: "Número de teléfono colombiano (10 dígitos, inicia en 3)"
          },
          Especialidad: {
            bsonType: "string",
            description: "Especialidad musical del profesor"
          },
          Experiencia: {
            bsonType: "int",
            // El valor mínimo para la experiencia es 0.
            minimum: 0,
            description: "Años de experiencia"
          },
          CursosAsignados: {
            bsonType: "array",
            items: {
              bsonType: "string",
              pattern: "^C[0-9]+$",
              description: "ID de curso asignado (ej: C1)"
            },
            description: "Lista de cursos asignados al profesor"
          }
        }
      }
    }
  });
  
  // Crea la colección 'instrumentos' con validación de esquema.
  db.createCollection("instrumentos", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: [
          "_id",
          "id_instrumento",
          "Tipo",
          "Marca",
          "Estado",
          "Sede",
          "Cantidad",
          "CantidadDisponible"
        ],
        properties: {
          _id: {
            bsonType: "objectId",
            description: "ID único del instrumento"
          },
          id_instrumento: {
            bsonType: "string",
            pattern: "^INS[0-9]+$",
            description: "ID del instrumento que empieza por 'INS' seguido de números (ej: INS1)"
          },
          Tipo: {
            enum: ["Guitarra", "Piano", "Batería", "Violín", "Flauta", "Otro"],
            description: "Tipo de instrumento musical"
          },
          Marca: {
            bsonType: "string",
            description: "Marca del instrumento"
          },
          Estado: {
            enum: ["Disponible", "Reservado", "Mantenimiento", "No Disponible"],
            description: "Estado del instrumento"
          },
          Sede: {
            bsonType: "string",
            pattern: "^S[0-9]+$",
            description: "ID de la sede donde está el instrumento (ej: S1)"
          },
          Cantidad: {
            bsonType: "int",
            // La cantidad mínima es 1.
            minimum: 1,
            description: "Cantidad total de instrumentos de este tipo"
          },
          CantidadDisponible: {
            bsonType: "int",
            // La cantidad disponible mínima es 0.
            minimum: 0,
            description: "Cantidad disponible para reserva o uso"
          }
        }
      }
    }
  });
  
  // Crea la colección 'sedes' con validación de esquema.
  db.createCollection("sedes", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: [
          "_id",
          "id_sede",
          "Ciudad",
          "Direccion"
        ],
        properties: {
          _id: {
            bsonType: "objectId",
            description: "ID único de la sede"
          },
          id_sede: {
            bsonType: "string",
            pattern: "^S[0-9]+$",
            description: "ID de la sede que empieza por 'S' seguido de números (ej: S1)"
          },
          Ciudad: {
            bsonType: "string",
            description: "Ciudad de la sede"
          },
          Direccion: {
            bsonType: "string",
            description: "Dirección física de la sede"
          }
        }
      }
    }
  });
  
  // Crea la colección 'cursos' con validación de esquema.
  db.createCollection("cursos", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: [
          "_id",
          "id_curso",
          "Instrumento",
          "Nivel",
          "Duracion",
          "Cupo",
          "CuposDisponibles",
          "SedeId",
          "Costo"
        ],
        properties: {
          _id: {
            bsonType: "objectId",
            description: "ID único del curso"
          },
          id_curso: {
            bsonType: "string",
            pattern: "^C[0-9]+$",
            description: "ID del curso que empieza por 'C' seguido de números (ej: C1)"
          },
          Instrumento: {
            bsonType: "string",
            pattern: "^INS[0-9]+$",
            description: "ID del instrumento asociado al curso (ej: INS1)"
          },
          Nivel: {
            enum: ["Principiante", "Intermedio", "Avanzado"],
            description: "Nivel del curso"
          },
          Duracion: {
            bsonType: "int",
            description: "Duración del curso en horas"
          },
          Cupo: {
            bsonType: "int",
            minimum: 1,
            description: "Cantidad máxima de estudiantes"
          },
          CuposDisponibles: {
            bsonType: "int",
            minimum: 0,
            description: "Cantidad de cupos disponibles"
          },
          SedeId: {
            bsonType: "string",
            pattern: "^S[0-9]+$",
            description: "ID de la sede donde se dicta el curso (ej: S1)"
          },
          Costo: {
            bsonType: "int",
            minimum: 0,
            description: "Costo del curso"
          }
        }
      }
    }
  });
  
  // Crea la colección 'reservas' con validación de esquema.
  db.createCollection("reservas", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: [
          "_id",
          "id_reserva",
          "Instrumento",
          "Estudiante",
          "Estado",
          "Fecha"
        ],
        properties: {
          _id: {
            bsonType: "objectId",
            description: "ID único de la reserva"
          },
          id_reserva: {
            bsonType: "string",
            pattern: "^R[0-9]+$",
            description: "ID de la reserva que empieza por 'R' seguido de números (ej: R1)"
          },
          Instrumento: {
            bsonType: "string",
            pattern: "^INS[0-9]+$",
            description: "ID del instrumento reservado (ej: INS1)"
          },
          Estudiante: {
            // Este campo es un documento embebido.
            bsonType: "object",
            required: ["id_estudiante", "Nombre", "Telefono"],
            properties: {
              id_estudiante: {
                bsonType: "string",
                pattern: "^E[0-9]+$",
                description: "ID del estudiante que realiza la reserva (ej: E1)"
              },
              Nombre: {
                bsonType: "string",
                description: "Nombre del estudiante"
              },
              Telefono: {
                bsonType: "string",
                pattern: "^[3][0-9]{9}$",
                description: "Número de teléfono colombiano (10 dígitos, inicia en 3)"
              }
            },
            description: "Datos del estudiante que realiza la reserva"
          },
          Estado: {
            enum: ["Pendiente", "Confirmada", "Cancelada", "Finalizada"],
            description: "Estado de la reserva"
          },
          Fecha: {
            bsonType: "date",
            description: "Fecha de la reserva"
          }
        }
      }
    }
  });
  
  // Crea la colección 'inscripciones' con validación de esquema.
  db.createCollection("inscripciones", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: [
          "_id",
          "id_inscripcion",
          "Estudiante",
          "Curso",
          "Sede",
          "Profesor",
          "Costo",
          "Fecha"
        ],
        properties: {
          _id: {
            bsonType: "objectId",
            description: "ID único de la inscripción"
          },
          id_inscripcion: {
            bsonType: "string",
            pattern: "^I[0-9]+$",
            description: "ID de la inscripción que empieza por 'I' seguido de números (ej: I1)"
          },
          Estudiante: {
            bsonType: "string",
            pattern: "^E[0-9]+$",
            description: "ID del estudiante inscrito (ej: E1)"
          },
          Curso: {
            bsonType: "string",
            pattern: "^C[0-9]+$",
            description: "ID del curso al que se inscribe (ej: C1)"
          },
          Sede: {
            bsonType: "string",
            pattern: "^S[0-9]+$",
            description: "ID de la sede en la que se realiza la inscripción (ej: S1)"
          },
          Profesor: {
            bsonType: "string",
            pattern: "^P[0-9]+$",
            description: "ID del profesor asignado (ej: P1)"
          },
          Costo: {
            bsonType: "int",
            minimum: 0,
            description: "Costo de la inscripción"
          },
          Fecha: {
            bsonType: "date",
            description: "Fecha de la inscripción"
          }
        }
      }
    }
  });

// --- Creación de Índices para optimización ---

// Crea índices únicos en campos de uso común para búsquedas.
// Esto mejora el rendimiento de las consultas y previene duplicados.

// Índice único en 'id_usuario' y 'Correo' en la colección 'usuarios'.
db.usuarios.createIndex({ id_usuario: 1 }, { unique: true });
db.usuarios.createIndex({ Correo: 1 }, { unique: true });

// Índice único en 'id_estudiante' para la colección 'estudiantes'.
db.estudiantes.createIndex({ id_estudiante: 1 }, { unique: true });

// Índice único en 'id_profesor' para la colección 'profesores'.
db.profesores.createIndex({ id_profesor: 1 }, { unique: true });

// Índice único en 'id_instrumento' para la colección 'instrumentos'.
db.instrumentos.createIndex({ id_instrumento: 1 }, { unique: true });

// Índice único en 'id_sede' para la colección 'sedes'.
db.sedes.createIndex({ id_sede: 1 }, { unique: true });

// Índice único en 'id_curso' para la colección 'cursos'.
db.cursos.createIndex({ id_curso: 1 }, { unique: true });

// Índice único en 'id_reserva' para la colección 'reservas'.
db.reservas.createIndex({ id_reserva: 1 }, { unique: true });

// Índice único en 'id_inscripcion' para la colección 'inscripciones'.
db.inscripciones.createIndex({ id_inscripcion: 1 }, { unique: true });