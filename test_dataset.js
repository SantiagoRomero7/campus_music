// Poblar la base de datos Campus Music con datos de prueba realistas
// Todos los _id están en STRING para evitar problemas con ObjectId en los $lookup

// ----------------- Sedes -----------------
db.sedes.insertMany([
    { _id: "SED100", ciudad: "Bogotá", direccion: "Cra 10 #20-30", capacidad: 200, telefono: "6011234567" },
    { _id: "SED200", ciudad: "Medellín", direccion: "Cll 50 #40-20", capacidad: 150, telefono: "6042345678" },
    { _id: "SED300", ciudad: "Cali", direccion: "Av 6 #15-25", capacidad: 180, telefono: "6023456789" }
  ]);
  
  // ----------------- Profesores -----------------
  db.profesores.insertMany([
    { _id: "PROF001", nombre: "Ana Torres", especialidad: "Piano", telefono: "3001112233", email: "ana.torres@campusmusic.com" },
    { _id: "PROF002", nombre: "Luis Rojas", especialidad: "Guitarra", telefono: "3002223344", email: "luis.rojas@campusmusic.com" },
    { _id: "PROF003", nombre: "Carla Pérez", especialidad: "Violín", telefono: "3003334455", email: "carla.perez@campusmusic.com" },
    { _id: "PROF004", nombre: "Jorge Gómez", especialidad: "Canto", telefono: "3004445566", email: "jorge.gomez@campusmusic.com" },
    { _id: "PROF005", nombre: "Marta Díaz", especialidad: "Teoría Musical", telefono: "3005556677", email: "marta.diaz@campusmusic.com" },
    { _id: "PROF006", nombre: "Diego Herrera", especialidad: "Piano", telefono: "3006667788", email: "diego.herrera@campusmusic.com" },
    { _id: "PROF007", nombre: "Laura Castillo", especialidad: "Guitarra", telefono: "3007778899", email: "laura.castillo@campusmusic.com" },
    { _id: "PROF008", nombre: "Andrés López", especialidad: "Teoría Musical", telefono: "3008889900", email: "andres.lopez@campusmusic.com" },
    { _id: "PROF009", nombre: "Paula Moreno", especialidad: "Canto", telefono: "3009990011", email: "paula.moreno@campusmusic.com" },
    { _id: "PROF010", nombre: "Carlos Mejía", especialidad: "Violín", telefono: "3010001122", email: "carlos.mejia@campusmusic.com" }
  ]);
  
  // ----------------- Cursos -----------------
  db.cursos.insertMany([
    // Bogotá
    { _id: "CUR100", nombre: "Piano Básico", instrumento: "Piano", nivel: "Básico", duracion: "3 meses", cupos: 10, horario: "Lunes 4-6pm", sede_id: "SED100", profesor_id: "PROF001", precio: 200000, estado: "en ejecución" },
    { _id: "CUR101", nombre: "Guitarra Intermedia", instrumento: "Guitarra", nivel: "Intermedio", duracion: "3 meses", cupos: 8, horario: "Martes 5-7pm", sede_id: "SED100", profesor_id: "PROF002", precio: 210000, estado: "en ejecución" },
    { _id: "CUR102", nombre: "Violín Avanzado", instrumento: "Violín", nivel: "Avanzado", duracion: "3 meses", cupos: 6, horario: "Miércoles 6-8pm", sede_id: "SED100", profesor_id: "PROF003", precio: 220000, estado: "en ejecución" },
    { _id: "CUR103", nombre: "Teoría Musical", instrumento: "General", nivel: "Intermedio", duracion: "3 meses", cupos: 12, horario: "Jueves 4-6pm", sede_id: "SED100", profesor_id: "PROF005", precio: 180000, estado: "en ejecución" },
    { _id: "CUR104", nombre: "Canto Básico", instrumento: "Voz", nivel: "Básico", duracion: "3 meses", cupos: 10, horario: "Viernes 5-7pm", sede_id: "SED100", profesor_id: "PROF004", precio: 200000, estado: "en ejecución" },
  
    // Medellín
    { _id: "CUR200", nombre: "Piano Intermedio", instrumento: "Piano", nivel: "Intermedio", duracion: "3 meses", cupos: 10, horario: "Lunes 3-5pm", sede_id: "SED200", profesor_id: "PROF006", precio: 210000, estado: "en ejecución" },
    { _id: "CUR201", nombre: "Guitarra Avanzada", instrumento: "Guitarra", nivel: "Avanzado", duracion: "3 meses", cupos: 8, horario: "Martes 6-8pm", sede_id: "SED200", profesor_id: "PROF007", precio: 220000, estado: "en ejecución" },
    { _id: "CUR202", nombre: "Violín Básico", instrumento: "Violín", nivel: "Básico", duracion: "3 meses", cupos: 12, horario: "Miércoles 4-6pm", sede_id: "SED200", profesor_id: "PROF010", precio: 200000, estado: "en ejecución" },
    { _id: "CUR203", nombre: "Teoría Musical Avanzada", instrumento: "General", nivel: "Avanzado", duracion: "3 meses", cupos: 10, horario: "Jueves 5-7pm", sede_id: "SED200", profesor_id: "PROF008", precio: 230000, estado: "en ejecución" },
    { _id: "CUR204", nombre: "Canto Intermedio", instrumento: "Voz", nivel: "Intermedio", duracion: "3 meses", cupos: 10, horario: "Viernes 3-5pm", sede_id: "SED200", profesor_id: "PROF009", precio: 210000, estado: "en ejecución" },
  
    // Cali
    { _id: "CUR300", nombre: "Piano Avanzado", instrumento: "Piano", nivel: "Avanzado", duracion: "3 meses", cupos: 8, horario: "Lunes 4-6pm", sede_id: "SED300", profesor_id: "PROF001", precio: 230000, estado: "en ejecución" },
    { _id: "CUR301", nombre: "Guitarra Básica", instrumento: "Guitarra", nivel: "Básico", duracion: "3 meses", cupos: 12, horario: "Martes 4-6pm", sede_id: "SED300", profesor_id: "PROF002", precio: 200000, estado: "en ejecución" },
    { _id: "CUR302", nombre: "Violín Intermedio", instrumento: "Violín", nivel: "Intermedio", duracion: "3 meses", cupos: 10, horario: "Miércoles 5-7pm", sede_id: "SED300", profesor_id: "PROF003", precio: 210000, estado: "en ejecución" },
    { _id: "CUR303", nombre: "Teoría Musical Básica", instrumento: "General", nivel: "Básico", duracion: "3 meses", cupos: 12, horario: "Jueves 4-6pm", sede_id: "SED300", profesor_id: "PROF005", precio: 190000, estado: "en ejecución" },
    { _id: "CUR304", nombre: "Canto Avanzado", instrumento: "Voz", nivel: "Avanzado", duracion: "3 meses", cupos: 8, horario: "Viernes 5-7pm", sede_id: "SED300", profesor_id: "PROF004", precio: 220000, estado: "en ejecución" }
  ]);
  
  // ----------------- Estudiantes -----------------
  db.estudiantes.insertMany([
    { _id: "EST001", nombre: "Carlos Martínez", nivel: "Básico", telefono: "3101234567", email: "carlos.martinez@email.com" },
    { _id: "EST002", nombre: "María González", nivel: "Intermedio", telefono: "3102345678", email: "maria.gonzalez@email.com" },
    { _id: "EST003", nombre: "Andrés Ramírez", nivel: "Avanzado", telefono: "3103456789", email: "andres.ramirez@email.com" },
    { _id: "EST004", nombre: "Lucía Fernández", nivel: "Básico", telefono: "3104567890", email: "lucia.fernandez@email.com" },
    { _id: "EST005", nombre: "Mateo Torres", nivel: "Intermedio", telefono: "3105678901", email: "mateo.torres@email.com" },
    { _id: "EST006", nombre: "Sofía Morales", nivel: "Avanzado", telefono: "3106789012", email: "sofia.morales@email.com" },
    { _id: "EST007", nombre: "Felipe Castro", nivel: "Básico", telefono: "3107890123", email: "felipe.castro@email.com" },
    { _id: "EST008", nombre: "Valentina López", nivel: "Intermedio", telefono: "3108901234", email: "valentina.lopez@email.com" },
    { _id: "EST009", nombre: "Sebastián Vega", nivel: "Avanzado", telefono: "3109012345", email: "sebastian.vega@email.com" },
    { _id: "EST010", nombre: "Camila Ruiz", nivel: "Básico", telefono: "3110123456", email: "camila.ruiz@email.com" },
    { _id: "EST011", nombre: "Daniel Ortega", nivel: "Intermedio", telefono: "3111234567", email: "daniel.ortega@email.com" },
    { _id: "EST012", nombre: "Gabriela Soto", nivel: "Avanzado", telefono: "3112345678", email: "gabriela.soto@email.com" },
    { _id: "EST013", nombre: "Juan Esteban Cárdenas", nivel: "Básico", telefono: "3113456789", email: "juan.cardenas@email.com" },
    { _id: "EST014", nombre: "Isabella Peña", nivel: "Intermedio", telefono: "3114567890", email: "isabella.pena@email.com" },
    { _id: "EST015", nombre: "Nicolás Ramírez", nivel: "Avanzado", telefono: "3115678901", email: "nicolas.ramirez@email.com" }
  ]);
  
  // ----------------- Instrumentos -----------------
  db.instrumentos.insertMany([
    { _id: "INS001", nombre: "Guitarra Acústica", tipo: "Guitarra", estado: "disponible" },
    { _id: "INS002", nombre: "Guitarra Eléctrica", tipo: "Guitarra", estado: "disponible" },
    { _id: "INS003", nombre: "Piano Digital", tipo: "Piano", estado: "disponible" },
    { _id: "INS004", nombre: "Teclado Yamaha", tipo: "Piano", estado: "disponible" },
    { _id: "INS005", nombre: "Violín 4/4", tipo: "Violín", estado: "disponible" },
    { _id: "INS006", nombre: "Violín 3/4", tipo: "Violín", estado: "disponible" },
    { _id: "INS007", nombre: "Micrófono Shure", tipo: "Voz", estado: "disponible" },
    { _id: "INS008", nombre: "Micrófono Condensador", tipo: "Voz", estado: "disponible" },
    { _id: "INS009", nombre: "Atril", tipo: "Accesorio", estado: "disponible" },
    { _id: "INS010", nombre: "Batería Pearl", tipo: "Percusión", estado: "disponible" },
    { _id: "INS011", nombre: "Cajón Flamenco", tipo: "Percusión", estado: "disponible" },
    { _id: "INS012", nombre: "Ukelele", tipo: "Cuerda", estado: "disponible" },
    { _id: "INS013", nombre: "Bajo Eléctrico", tipo: "Cuerda", estado: "disponible" },
    { _id: "INS014", nombre: "Flauta Dulce", tipo: "Viento", estado: "disponible" },
    { _id: "INS015", nombre: "Saxofón", tipo: "Viento", estado: "disponible" },
    { _id: "INS016", nombre: "Clarinete", tipo: "Viento", estado: "disponible" },
    { _id: "INS017", nombre: "Trompeta", tipo: "Viento", estado: "disponible" },
    { _id: "INS018", nombre: "Arpa", tipo: "Cuerda", estado: "disponible" },
    { _id: "INS019", nombre: "Tambor", tipo: "Percusión", estado: "disponible" },
    { _id: "INS020", nombre: "Congas", tipo: "Percusión", estado: "disponible" }
  ]);
  
  // ----------------- Inscripciones -----------------
  db.inscripciones.insertMany([
    { _id: "INSCR001", estudiante_id: "EST001", curso_id: "CUR100", sede_id: "SED100", fecha: new Date("2025-09-01") },
    { _id: "INSCR002", estudiante_id: "EST002", curso_id: "CUR101", sede_id: "SED100", fecha: new Date("2025-09-02") },
    { _id: "INSCR003", estudiante_id: "EST003", curso_id: "CUR102", sede_id: "SED100", fecha: new Date("2025-09-03") },
    { _id: "INSCR004", estudiante_id: "EST004", curso_id: "CUR103", sede_id: "SED100", fecha: new Date("2025-09-04") },
    { _id: "INSCR005", estudiante_id: "EST005", curso_id: "CUR104", sede_id: "SED100", fecha: new Date("2025-09-05") },
    { _id: "INSCR006", estudiante_id: "EST006", curso_id: "CUR200", sede_id: "SED200", fecha: new Date("2025-09-06") },
    { _id: "INSCR007", estudiante_id: "EST007", curso_id: "CUR201", sede_id: "SED200", fecha: new Date("2025-09-07") },
    { _id: "INSCR008", estudiante_id: "EST008", curso_id: "CUR202", sede_id: "SED200", fecha: new Date("2025-09-08") },
    { _id: "INSCR009", estudiante_id: "EST009", curso_id: "CUR203", sede_id: "SED200", fecha: new Date("2025-09-09") },
    { _id: "INSCR010", estudiante_id: "EST010", curso_id: "CUR204", sede_id: "SED200", fecha: new Date("2025-09-10") },
    { _id: "INSCR011", estudiante_id: "EST011", curso_id: "CUR300", sede_id: "SED300", fecha: new Date("2025-09-11") },
    { _id: "INSCR012", estudiante_id: "EST012", curso_id: "CUR301", sede_id: "SED300", fecha: new Date("2025-09-12") },
    { _id: "INSCR013", estudiante_id: "EST013", curso_id: "CUR302", sede_id: "SED300", fecha: new Date("2025-09-13") },
    { _id: "INSCR014", estudiante_id: "EST014", curso_id: "CUR303", sede_id: "SED300", fecha: new Date("2025-09-14") },
    { _id: "INSCR015", estudiante_id: "EST015", curso_id: "CUR304", sede_id: "SED300", fecha: new Date("2025-09-15") },
    { _id: "INSCR016", estudiante_id: "EST001", curso_id: "CUR200", sede_id: "SED200", fecha: new Date("2025-09-16") },
    { _id: "INSCR017", estudiante_id: "EST002", curso_id: "CUR201", sede_id: "SED200", fecha: new Date("2025-09-17") },
    { _id: "INSCR018", estudiante_id: "EST003", curso_id: "CUR202", sede_id: "SED200", fecha: new Date("2025-09-18") },
    { _id: "INSCR019", estudiante_id: "EST004", curso_id: "CUR203", sede_id: "SED200", fecha: new Date("2025-09-19") },
    { _id: "INSCR020", estudiante_id: "EST005", curso_id: "CUR204", sede_id: "SED200", fecha: new Date("2025-09-20") },
    { _id: "INSCR021", estudiante_id: "EST006", curso_id: "CUR300", sede_id: "SED300", fecha: new Date("2025-09-21") },
    { _id: "INSCR022", estudiante_id: "EST007", curso_id: "CUR301", sede_id: "SED300", fecha: new Date("2025-09-22") },
    { _id: "INSCR023", estudiante_id: "EST008", curso_id: "CUR302", sede_id: "SED300", fecha: new Date("2025-09-23") },
    { _id: "INSCR024", estudiante_id: "EST009", curso_id: "CUR303", sede_id: "SED300", fecha: new Date("2025-09-24") },
    { _id: "INSCR025", estudiante_id: "EST010", curso_id: "CUR304", sede_id: "SED300", fecha: new Date("2025-09-25") },
    { _id: "INSCR026", estudiante_id: "EST011", curso_id: "CUR100", sede_id: "SED100", fecha: new Date("2025-09-26") },
    { _id: "INSCR027", estudiante_id: "EST012", curso_id: "CUR101", sede_id: "SED100", fecha: new Date("2025-09-27") },
    { _id: "INSCR028", estudiante_id: "EST013", curso_id: "CUR102", sede_id: "SED100", fecha: new Date("2025-09-28") },
    { _id: "INSCR029", estudiante_id: "EST014", curso_id: "CUR103", sede_id: "SED100", fecha: new Date("2025-09-29") },
    { _id: "INSCR030", estudiante_id: "EST015", curso_id: "CUR104", sede_id: "SED100", fecha: new Date("2025-09-30") }
  ]);
  
  // ----------------- Reservas de Instrumentos -----------------
  db.reservas.insertMany([
    { _id: "RES001", estudiante_id: "EST001", instrumento_id: "INS001", fecha: new Date("2025-09-05"), estado: "activa" },
    { _id: "RES002", estudiante_id: "EST002", instrumento_id: "INS003", fecha: new Date("2025-09-06"), estado: "activa" },
    { _id: "RES003", estudiante_id: "EST003", instrumento_id: "INS005", fecha: new Date("2025-09-07"), estado: "activa" },
    { _id: "RES004", estudiante_id: "EST004", instrumento_id: "INS007", fecha: new Date("2025-09-08"), estado: "activa" },
    { _id: "RES005", estudiante_id: "EST005", instrumento_id: "INS002", fecha: new Date("2025-09-09"), estado: "activa" },
    { _id: "RES006", estudiante_id: "EST006", instrumento_id: "INS004", fecha: new Date("2025-09-10"), estado: "activa" },
    { _id: "RES007", estudiante_id: "EST007", instrumento_id: "INS006", fecha: new Date("2025-09-11"), estado: "activa" },
    { _id: "RES008", estudiante_id: "EST008", instrumento_id: "INS008", fecha: new Date("2025-09-12"), estado: "activa" },
    { _id: "RES009", estudiante_id: "EST009", instrumento_id: "INS009", fecha: new Date("2025-09-13"), estado: "activa" },
    { _id: "RES010", estudiante_id: "EST010", instrumento_id: "INS010", fecha: new Date("2025-09-14"), estado: "activa" }
  ]);
  