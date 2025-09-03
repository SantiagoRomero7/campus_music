// test_dataset.js
// Poblado de prueba para Campus Music

db = db.getSiblingDB("campus_music");

// ---------------------------
// SEDES
// ---------------------------
db.sedes.insertMany([
  { _id: "SED100", ciudad: "Bogotá", direccion: "Cl 45 #10-20", capacidad: 200, telefono: "3101234567" },
  { _id: "SED200", ciudad: "Medellín", direccion: "Cra 70 #20-30", capacidad: 150, telefono: "3202345678" },
  { _id: "SED300", ciudad: "Cali", direccion: "Av 6 #40-50", capacidad: 180, telefono: "3113456789" }
]);

// ---------------------------
// PROFESORES
// ---------------------------
db.profesores.insertMany([
  { _id: "PROF001", nombre: "Ana Torres", especialidad: "Piano", telefono: "3101111111", email: "ana.torres@mail.com" },
  { _id: "PROF002", nombre: "Luis Rojas", especialidad: "Guitarra", telefono: "3102222222", email: "luis.rojas@mail.com" },
  { _id: "PROF003", nombre: "Carla Pérez", especialidad: "Violín", telefono: "3103333333", email: "carla.perez@mail.com" },
  { _id: "PROF004", nombre: "Jorge Gómez", especialidad: "Canto", telefono: "3104444444", email: "jorge.gomez@mail.com" },
  { _id: "PROF005", nombre: "Marta Díaz", especialidad: "Teoría Musical", telefono: "3105555555", email: "marta.diaz@mail.com" },
  { _id: "PROF006", nombre: "Diego Herrera", especialidad: "Piano", telefono: "3106666666", email: "diego.herrera@mail.com" },
  { _id: "PROF007", nombre: "Laura Castillo", especialidad: "Guitarra", telefono: "3107777777", email: "laura.castillo@mail.com" },
  { _id: "PROF008", nombre: "Carlos Mejía", especialidad: "Violín", telefono: "3108888888", email: "carlos.mejia@mail.com" },
  { _id: "PROF009", nombre: "Paula Moreno", especialidad: "Canto", telefono: "3109999999", email: "paula.moreno@mail.com" },
  { _id: "PROF010", nombre: "Andrés López", especialidad: "Teoría Musical", telefono: "3110000000", email: "andres.lopez@mail.com" }
]);

// ---------------------------
// CURSOS (5 por sede)
// ---------------------------
db.cursos.insertMany([
  // Bogotá
  { _id: "CUR100", nombre: "Piano Básico", instrumento: "Piano", nivel: "Básico", duracion_horas: 40, cupos_total: 10, cupos_disponibles: 10, horario: "Lunes 4-6pm", sede_id: "SED100", profesor_id: "PROF001", precio: 200000, estado: "Activo" },
  { _id: "CUR101", nombre: "Guitarra Intermedia", instrumento: "Guitarra", nivel: "Intermedio", duracion_horas: 45, cupos_total: 8, cupos_disponibles: 8, horario: "Martes 5-7pm", sede_id: "SED100", profesor_id: "PROF002", precio: 220000, estado: "Activo" },
  { _id: "CUR102", nombre: "Violín Avanzado", instrumento: "Violín", nivel: "Avanzado", duracion_horas: 50, cupos_total: 6, cupos_disponibles: 6, horario: "Miércoles 6-8pm", sede_id: "SED100", profesor_id: "PROF003", precio: 250000, estado: "Activo" },
  { _id: "CUR103", nombre: "Teoría Musical", instrumento: "Varios", nivel: "Intermedio", duracion_horas: 30, cupos_total: 12, cupos_disponibles: 12, horario: "Jueves 4-6pm", sede_id: "SED100", profesor_id: "PROF005", precio: 180000, estado: "Activo" },
  { _id: "CUR104", nombre: "Canto Básico", instrumento: "Voz", nivel: "Básico", duracion_horas: 35, cupos_total: 10, cupos_disponibles: 10, horario: "Viernes 5-7pm", sede_id: "SED100", profesor_id: "PROF004", precio: 200000, estado: "Activo" },

  // Medellín
  { _id: "CUR200", nombre: "Piano Intermedio", instrumento: "Piano", nivel: "Intermedio", duracion_horas: 40, cupos_total: 10, cupos_disponibles: 10, horario: "Lunes 3-5pm", sede_id: "SED200", profesor_id: "PROF006", precio: 210000, estado: "Activo" },
  { _id: "CUR201", nombre: "Guitarra Avanzada", instrumento: "Guitarra", nivel: "Avanzado", duracion_horas: 50, cupos_total: 8, cupos_disponibles: 8, horario: "Martes 6-8pm", sede_id: "SED200", profesor_id: "PROF007", precio: 230000, estado: "Activo" },
  { _id: "CUR202", nombre: "Violín Básico", instrumento: "Violín", nivel: "Básico", duracion_horas: 35, cupos_total: 12, cupos_disponibles: 12, horario: "Miércoles 4-6pm", sede_id: "SED200", profesor_id: "PROF008", precio: 200000, estado: "Activo" },
  { _id: "CUR203", nombre: "Teoría Musical Avanzada", instrumento: "Varios", nivel: "Avanzado", duracion_horas: 30, cupos_total: 10, cupos_disponibles: 10, horario: "Jueves 5-7pm", sede_id: "SED200", profesor_id: "PROF010", precio: 190000, estado: "Activo" },
  { _id: "CUR204", nombre: "Canto Intermedio", instrumento: "Voz", nivel: "Intermedio", duracion_horas: 35, cupos_total: 10, cupos_disponibles: 10, horario: "Viernes 3-5pm", sede_id: "SED200", profesor_id: "PROF009", precio: 210000, estado: "Activo" },

  // Cali
  { _id: "CUR300", nombre: "Piano Avanzado", instrumento: "Piano", nivel: "Avanzado", duracion_horas: 50, cupos_total: 8, cupos_disponibles: 8, horario: "Lunes 4-6pm", sede_id: "SED300", profesor_id: "PROF001", precio: 250000, estado: "Activo" },
  { _id: "CUR301", nombre: "Guitarra Básica", instrumento: "Guitarra", nivel: "Básico", duracion_horas: 30, cupos_total: 12, cupos_disponibles: 12, horario: "Martes 4-6pm", sede_id: "SED300", profesor_id: "PROF002", precio: 200000, estado: "Activo" },
  { _id: "CUR302", nombre: "Violín Intermedio", instrumento: "Violín", nivel: "Intermedio", duracion_horas: 40, cupos_total: 10, cupos_disponibles: 10, horario: "Miércoles 5-7pm", sede_id: "SED300", profesor_id: "PROF003", precio: 220000, estado: "Activo" },
  { _id: "CUR303", nombre: "Teoría Musical Básica", instrumento: "Varios", nivel: "Básico", duracion_horas: 25, cupos_total: 12, cupos_disponibles: 12, horario: "Jueves 4-6pm", sede_id: "SED300", profesor_id: "PROF005", precio: 180000, estado: "Activo" },
  { _id: "CUR304", nombre: "Canto Avanzado", instrumento: "Voz", nivel: "Avanzado", duracion_horas: 40, cupos_total: 8, cupos_disponibles: 8, horario: "Viernes 5-7pm", sede_id: "SED300", profesor_id: "PROF004", precio: 240000, estado: "Activo" }
]);

// ---------------------------
// ESTUDIANTES (15)
// ---------------------------
db.estudiantes.insertMany([
  { _id: "EST001", nombre: "Santiago Romero", nivel: "Básico", telefono: "3121111111", email: "santiago.romero@mail.com" },
  { _id: "EST002", nombre: "Valentina García", nivel: "Intermedio", telefono: "3122222222", email: "valentina.garcia@mail.com" },
  { _id: "EST003", nombre: "Camilo Torres", nivel: "Avanzado", telefono: "3123333333", email: "camilo.torres@mail.com" },
  { _id: "EST004", nombre: "Mariana López", nivel: "Básico", telefono: "3124444444", email: "mariana.lopez@mail.com" },
  { _id: "EST005", nombre: "Julián Martínez", nivel: "Intermedio", telefono: "3125555555", email: "julian.martinez@mail.com" },
  { _id: "EST006", nombre: "Daniela Pérez", nivel: "Avanzado", telefono: "3126666666", email: "daniela.perez@mail.com" },
  { _id: "EST007", nombre: "Mateo Gómez", nivel: "Básico", telefono: "3127777777", email: "mateo.gomez@mail.com" },
  { _id: "EST008", nombre: "Laura Castillo", nivel: "Intermedio", telefono: "3128888888", email: "laura.castillo@mail.com" },
  { _id: "EST009", nombre: "Andrés Moreno", nivel: "Avanzado", telefono: "3129999999", email: "andres.moreno@mail.com" },
  { _id: "EST010", nombre: "Catalina Herrera", nivel: "Básico", telefono: "3130000000", email: "catalina.herrera@mail.com" },
  { _id: "EST011", nombre: "Sebastián Díaz", nivel: "Intermedio", telefono: "3131111111", email: "sebastian.diaz@mail.com" },
  { _id: "EST012", nombre: "Isabella Ramírez", nivel: "Avanzado", telefono: "3132222222", email: "isabella.ramirez@mail.com" },
  { _id: "EST013", nombre: "Diego Flores", nivel: "Básico", telefono: "3133333333", email: "diego.flores@mail.com" },
  { _id: "EST014", nombre: "Paula Jiménez", nivel: "Intermedio", telefono: "3134444444", email: "paula.jimenez@mail.com" },
  { _id: "EST015", nombre: "Juan Pérez", nivel: "Avanzado", telefono: "3135555555", email: "juan.perez@mail.com" }
]);

// ---------------------------
// INSTRUMENTOS (20)
// ---------------------------
db.instrumentos.insertMany([
  { _id: "INS001", nombre: "Guitarra Acústica", tipo: "Guitarra", disponible: true },
  { _id: "INS002", nombre: "Guitarra Eléctrica", tipo: "Guitarra", disponible: true },
  { _id: "INS003", nombre: "Piano Digital", tipo: "Piano", disponible: true },
  { _id: "INS004", nombre: "Piano Acústico", tipo: "Piano", disponible: true },
  { _id: "INS005", nombre: "Violín 4/4", tipo: "Violín", disponible: true },
  { _id: "INS006", nombre: "Violín 3/4", tipo: "Violín", disponible: true },
  { _id: "INS007", nombre: "Batería Básica", tipo: "Batería", disponible: true },
  { _id: "INS008", nombre: "Flauta Traverso", tipo: "Flauta", disponible: true },
  { _id: "INS009", nombre: "Saxofón Alto", tipo: "Saxofón", disponible: true },
  { _id: "INS010", nombre: "Clarinete", tipo: "Viento", disponible: true },
  { _id: "INS011", nombre: "Trompeta", tipo: "Viento", disponible: true },
  { _id: "INS012", nombre: "Viola", tipo: "Violín", disponible: true },
  { _id: "INS013", nombre: "Guitarra Clásica", tipo: "Guitarra", disponible: true },
  { _id: "INS014", nombre: "Piano de Cola", tipo: "Piano", disponible: true },
  { _id: "INS015", nombre: "Bajo Eléctrico", tipo: "Bajo", disponible: true },
  { _id: "INS016", nombre: "Timbal", tipo: "Percusión", disponible: true },
  { _id: "INS017", nombre: "Fagot", tipo: "Viento", disponible: true },
  { _id: "INS018", nombre: "Oboe", tipo: "Viento", disponible: true },
  { _id: "INS019", nombre: "Sitar", tipo: "Cuerda", disponible: true },
  { _id: "INS020", nombre: "Harp", tipo: "Cuerda", disponible: true }
]);

/// ---------------------------
// INSCRIPCIONES (30)
// ---------------------------
db.inscripciones.insertMany([
 
    { _id: "INSCR001", estudiante_id: "EST001", curso_id: "CUR100", fecha: new Date("2025-09-01") },
    { _id: "INSCR002", estudiante_id: "EST002", curso_id: "CUR101", fecha: new Date("2025-09-02") },
    { _id: "INSCR003", estudiante_id: "EST003", curso_id: "CUR102", fecha: new Date("2025-09-03") },
    { _id: "INSCR004", estudiante_id: "EST004", curso_id: "CUR103", fecha: new Date("2025-09-04") },
    { _id: "INSCR005", estudiante_id: "EST005", curso_id: "CUR104", fecha: new Date("2025-09-05") },
    { _id: "INSCR006", estudiante_id: "EST006", curso_id: "CUR100", fecha: new Date("2025-09-06") },
    { _id: "INSCR007", estudiante_id: "EST007", curso_id: "CUR101", fecha: new Date("2025-09-07") },
    { _id: "INSCR008", estudiante_id: "EST008", curso_id: "CUR102", fecha: new Date("2025-09-08") },
    { _id: "INSCR009", estudiante_id: "EST009", curso_id: "CUR103", fecha: new Date("2025-09-09") },
    { _id: "INSCR010", estudiante_id: "EST010", curso_id: "CUR104", fecha: new Date("2025-09-10") },
    { _id: "INSCR011", estudiante_id: "EST011", curso_id: "CUR200", fecha: new Date("2025-09-11") },
    { _id: "INSCR012", estudiante_id: "EST012", curso_id: "CUR201", fecha: new Date("2025-09-12") },
    { _id: "INSCR013", estudiante_id: "EST013", curso_id: "CUR202", fecha: new Date("2025-09-13") },
    { _id: "INSCR014", estudiante_id: "EST014", curso_id: "CUR203", fecha: new Date("2025-09-14") },
    { _id: "INSCR015", estudiante_id: "EST015", curso_id: "CUR204", fecha: new Date("2025-09-15") },
    { _id: "INSCR016", estudiante_id: "EST001", curso_id: "CUR200", fecha: new Date("2025-09-16") },
    { _id: "INSCR017", estudiante_id: "EST002", curso_id: "CUR201", fecha: new Date("2025-09-17") },
    { _id: "INSCR018", estudiante_id: "EST003", curso_id: "CUR202", fecha: new Date("2025-09-18") },
    { _id: "INSCR019", estudiante_id: "EST004", curso_id: "CUR203", fecha: new Date("2025-09-19") },
    { _id: "INSCR020", estudiante_id: "EST005", curso_id: "CUR204", fecha: new Date("2025-09-20") },
    { _id: "INSCR021", estudiante_id: "EST006", curso_id: "CUR300", fecha: new Date("2025-09-21") },
    { _id: "INSCR022", estudiante_id: "EST007", curso_id: "CUR301", fecha: new Date("2025-09-22") },
    { _id: "INSCR023", estudiante_id: "EST008", curso_id: "CUR302", fecha: new Date("2025-09-23") },
    { _id: "INSCR024", estudiante_id: "EST009", curso_id: "CUR303", fecha: new Date("2025-09-24") },
    { _id: "INSCR025", estudiante_id: "EST010", curso_id: "CUR304", fecha: new Date("2025-09-25") },
    { _id: "INSCR026", estudiante_id: "EST011", curso_id: "CUR300", fecha: new Date("2025-09-26") },
    { _id: "INSCR027", estudiante_id: "EST012", curso_id: "CUR301", fecha: new Date("2025-09-27") },
    { _id: "INSCR028", estudiante_id: "EST013", curso_id: "CUR302", fecha: new Date("2025-09-28") },
    { _id: "INSCR029", estudiante_id: "EST014", curso_id: "CUR303", fecha: new Date("2025-09-29") },
    { _id: "INSCR030", estudiante_id: "EST015", curso_id: "CUR304", fecha: new Date("2025-09-30") }
  ]);
  
  
  // ---------------------------
  // RESERVAS DE INSTRUMENTOS (10)
  // ---------------------------
  db.reservas.insertMany([
    { _id: "RES001", estudiante_id: "EST001", instrumento_id: "INS001", fecha: new Date("2025-09-01"), estado: "Activa" },
    { _id: "RES002", estudiante_id: "EST002", instrumento_id: "INS002", fecha: new Date("2025-09-02"), estado: "Activa" },
    { _id: "RES003", estudiante_id: "EST003", instrumento_id: "INS003", fecha: new Date("2025-09-03"), estado: "Activa" },
    { _id: "RES004", estudiante_id: "EST004", instrumento_id: "INS004", fecha: new Date("2025-09-04"), estado: "Activa" },
    { _id: "RES005", estudiante_id: "EST005", instrumento_id: "INS005", fecha: new Date("2025-09-05"), estado: "Activa" },
    { _id: "RES006", estudiante_id: "EST006", instrumento_id: "INS006", fecha: new Date("2025-09-06"), estado: "Activa" },
    { _id: "RES007", estudiante_id: "EST007", instrumento_id: "INS007", fecha: new Date("2025-09-07"), estado: "Activa" },
    { _id: "RES008", estudiante_id: "EST008", instrumento_id: "INS008", fecha: new Date("2025-09-08"), estado: "Activa" },
    { _id: "RES009", estudiante_id: "EST009", instrumento_id: "INS009", fecha: new Date("2025-09-09"), estado: "Activa" },
    { _id: "RES010", estudiante_id: "EST010", instrumento_id: "INS010", fecha: new Date("2025-09-10"), estado: "Activa" }
  ]);