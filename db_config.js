//use campus_music;

db.createCollection("usuarios", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: [
          "_id",
          "id_usuario",
          "Nombre",
          "Correo",
          "Contrasena",
          "Rol"
        ],
        properties: {
          _id: {
            bsonType: "objectId",
            description: "ID único del usuario"
          },
          id_usuario: {
            bsonType: "string",
            pattern: "^U[0-9]+$",
            description: "ID del usuario que empieza por 'U' seguido de números (ej: U1)"
          },
          Nombre: {
            bsonType: "string",
            description: "Nombre completo del usuario"
          },
          Correo: {
            bsonType: "string",
            pattern: "^.+@.+\\..+$",
            description: "Correo electrónico válido"
          },
          Contrasena: {
            bsonType: "string",
            minLength: 8,
            description: "Contraseña del usuario (mínimo 8 caracteres)"
          },
          Rol: {
            enum: ["Administrador", "Empleado", "Estudiante"],
            description: "Rol del usuario en el sistema"
          }
        }
      }
    }
  });
  
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
            pattern: "^E[0-9]+$",
            description: "ID del estudiante que empieza por 'E' seguido de números (ej: E1)"
          },
          Nombre: {
            bsonType: "string",
            description: "Nombre completo del estudiante"
          },
          Cedula: {
            bsonType: "string",
            pattern: "^[0-9]{8,10}$",
            description: "Cédula de identidad (solo números)"
          },
          Telefono: {
            bsonType: "string",
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
            minimum: 1,
            description: "Cantidad total de instrumentos de este tipo"
          },
          CantidadDisponible: {
            bsonType: "int",
            minimum: 0,
            description: "Cantidad disponible para reserva o uso"
          }
        }
      }
    }
  });
  
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

  db.usuarios.createIndex({ id_usuario: 1 }, { unique: true })
  db.usuarios.createIndex({ Correo: 1 }, { unique: true })
  db.estudiantes.createIndex({ id_estudiante: 1 }, { unique: true })
  db.profesores.createIndex({ id_profesor: 1 }, { unique: true })
  db.instrumentos.createIndex({ id_instrumento: 1 }, { unique: true })
  db.sedes.createIndex({ id_sede: 1 }, { unique: true })
  db.cursos.createIndex({ id_curso: 1 }, { unique: true })
  db.reservas.createIndex({ id_reserva: 1 }, { unique: true })
  db.inscripciones.createIndex({ id_inscripcion: 1 }, { unique: true })