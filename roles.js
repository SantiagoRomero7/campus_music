// roles.js
// Definición de roles para la base de datos campus_music

// 1. Rol Administrador
db.createRole({
    role: "administrador",
    privileges: [
      {
        resource: { db: "campus_music", collection: "" }, // todas las colecciones
        actions: [ "find", "insert", "update", "remove" ]
      }
    ],
    roles: [
      { role: "readWrite", db: "campus_music" },  // lectura y escritura total
      { role: "dbAdmin", db: "campus_music" }     // puede crear colecciones, índices, etc.
    ]
  });
  
  // 2. Rol Empleado de sede
  db.createRole({
    role: "empleadoSede",
    privileges: [
      {
        resource: { db: "campus_music", collection: "estudiantes" },
        actions: [ "find" ]
      },
      {
        resource: { db: "campus_music", collection: "profesores" },
        actions: [ "find" ]
      },
      {
        resource: { db: "campus_music", collection: "cursos" },
        actions: [ "find" ]
      },
      {
        resource: { db: "campus_music", collection: "inscripciones" },
        actions: [ "insert" ]
      },
      {
        resource: { db: "campus_music", collection: "reservas" },
        actions: [ "insert" ]
      }
    ],
    roles: []
  });
  
  // 3. Rol Estudiante
  db.createRole({
    role: "estudiante",
    privileges: [
      {
        resource: { db: "campus_music", collection: "estudiantes" },
        actions: [ "find" ] // puede ver su propia info (a nivel app filtras por su _id)
      },
      {
        resource: { db: "campus_music", collection: "cursos" },
        actions: [ "find" ] // consulta de cursos disponibles
      },
      {
        resource: { db: "campus_music", collection: "inscripciones" },
        actions: [ "find" ] // historial de inscripciones
      },
      {
        resource: { db: "campus_music", collection: "reservas" },
        actions: [ "insert" ] // puede reservar instrumentos
      }
    ],
    roles: []
  });
  