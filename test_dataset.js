// 1. Insertar sedes
db.sedes.insertMany([
  {
    id_sede: "S1",
    Ciudad: "Bogotá",
    Direccion: "Carrera 15 # 88-64"
  },
  {
    id_sede: "S2",
    Ciudad: "Medellín",
    Direccion: "Calle 10 # 40-25"
  },
  {
    id_sede: "S3",
    Ciudad: "Cali",
    Direccion: "Avenida 6N # 23-45"
  }
]);

// 2. Insertar instrumentos
db.instrumentos.insertMany([
  // Bogotá (S1)
  {
    id_instrumento: "INS1",
    Tipo: "Guitarra",
    Marca: "Yamaha",
    Estado: "Disponible",
    Sede: "S1",
    Cantidad: 5,
    CantidadDisponible: 3
  },
  {
    id_instrumento: "INS2",
    Tipo: "Piano",
    Marca: "Kawai",
    Estado: "Disponible",
    Sede: "S1",
    Cantidad: 2,
    CantidadDisponible: 1
  },
  {
    id_instrumento: "INS3",
    Tipo: "Violín",
    Marca: "Stentor",
    Estado: "Mantenimiento",
    Sede: "S1",
    Cantidad: 3,
    CantidadDisponible: 0
  },
  {
    id_instrumento: "INS4",
    Tipo: "Batería",
    Marca: "Pearl",
    Estado: "Disponible",
    Sede: "S1",
    Cantidad: 1,
    CantidadDisponible: 1
  },
  {
    id_instrumento: "INS5",
    Tipo: "Flauta",
    Marca: "Yamaha",
    Estado: "Disponible",
    Sede: "S1",
    Cantidad: 4,
    CantidadDisponible: 2
  },
  // Medellín (S2)
  {
    id_instrumento: "INS6",
    Tipo: "Guitarra",
    Marca: "Fender",
    Estado: "Reservado",
    Sede: "S2",
    Cantidad: 4,
    CantidadDisponible: 2
  },
  {
    id_instrumento: "INS7",
    Tipo: "Piano",
    Marca: "Yamaha",
    Estado: "Disponible",
    Sede: "S2",
    Cantidad: 3,
    CantidadDisponible: 2
  },
  {
    id_instrumento: "INS8",
    Tipo: "Violín",
    Marca: "Cremona",
    Estado: "Disponible",
    Sede: "S2",
    Cantidad: 2,
    CantidadDisponible: 1
  },
  {
    id_instrumento: "INS9",
    Tipo: "Batería",
    Marca: "Tama",
    Estado: "No Disponible",
    Sede: "S2",
    Cantidad: 1,
    CantidadDisponible: 0
  },
  {
    id_instrumento: "INS10",
    Tipo: "Flauta",
    Marca: "Gemeinhardt",
    Estado: "Disponible",
    Sede: "S2",
    Cantidad: 3,
    CantidadDisponible: 2
  },
  // Cali (S3)
  {
    id_instrumento: "INS11",
    Tipo: "Guitarra",
    Marca: "Ibanez",
    Estado: "Disponible",
    Sede: "S3",
    Cantidad: 3,
    CantidadDisponible: 2
  },
  {
    id_instrumento: "INS12",
    Tipo: "Piano",
    Marca: "Casio",
    Estado: "Disponible",
    Sede: "S3",
    Cantidad: 2,
    CantidadDisponible: 1
  },
  {
    id_instrumento: "INS13",
    Tipo: "Violín",
    Marca: "Mendini",
    Estado: "Disponible",
    Sede: "S3",
    Cantidad: 2,
    CantidadDisponible: 1
  },
  {
    id_instrumento: "INS14",
    Tipo: "Batería",
    Marca: "Ludwig",
    Estado: "Mantenimiento",
    Sede: "S3",
    Cantidad: 1,
    CantidadDisponible: 0
  },
  {
    id_instrumento: "INS15",
    Tipo: "Flauta",
    Marca: "Armstrong",
    Estado: "Disponible",
    Sede: "S3",
    Cantidad: 4,
    CantidadDisponible: 3
  },
  {
    id_instrumento: "INS16",
    Tipo: "Guitarra",
    Marca: "Taylor",
    Estado: "Disponible",
    Sede: "S1",
    Cantidad: 2,
    CantidadDisponible: 1
  },
  {
    id_instrumento: "INS17",
    Tipo: "Piano",
    Marca: "Roland",
    Estado: "Disponible",
    Sede: "S2",
    Cantidad: 1,
    CantidadDisponible: 1
  },
  {
    id_instrumento: "INS18",
    Tipo: "Violín",
    Marca: "Yamaha",
    Estado: "Disponible",
    Sede: "S3",
    Cantidad: 1,
    CantidadDisponible: 1
  },
  {
    id_instrumento: "INS19",
    Tipo: "Batería",
    Marca: "DW",
    Estado: "Disponible",
    Sede: "S1",
    Cantidad: 1,
    CantidadDisponible: 0
  },
  {
    id_instrumento: "INS20",
    Tipo: "Flauta",
    Marca: "Yamaha",
    Estado: "Disponible",
    Sede: "S2",
    Cantidad: 2,
    CantidadDisponible: 1
  }
]);

// 3. Insertar cursos
db.cursos.insertMany([
  // Bogotá (S1)
  {
    id_curso: "C1",
    Instrumento: "INS1",
    Nivel: "Principiante",
    Duracion: 40,
    Cupo: 15,
    CuposDisponibles: 8,
    SedeId: "S1",
    Costo: 800000
  },
  {
    id_curso: "C2",
    Instrumento: "INS2",
    Nivel: "Avanzado",
    Duracion: 60,
    Cupo: 10,
    CuposDisponibles: 3,
    SedeId: "S1",
    Costo: 1200000
  },
  {
    id_curso: "C3",
    Instrumento: "INS3",
    Nivel: "Intermedio",
    Duracion: 50,
    Cupo: 12,
    CuposDisponibles: 5,
    SedeId: "S1",
    Costo: 950000
  },
  {
    id_curso: "C4",
    Instrumento: "INS4",
    Nivel: "Principiante",
    Duracion: 45,
    Cupo: 8,
    CuposDisponibles: 2,
    SedeId: "S1",
    Costo: 850000
  },
  {
    id_curso: "C5",
    Instrumento: "INS5",
    Nivel: "Intermedio",
    Duracion: 35,
    Cupo: 20,
    CuposDisponibles: 10,
    SedeId: "S1",
    Costo: 700000
  },
  // Medellín (S2)
  {
    id_curso: "C6",
    Instrumento: "INS6",
    Nivel: "Principiante",
    Duracion: 40,
    Cupo: 15,
    CuposDisponibles: 7,
    SedeId: "S2",
    Costo: 780000
  },
  {
    id_curso: "C7",
    Instrumento: "INS7",
    Nivel: "Avanzado",
    Duracion: 65,
    Cupo: 8,
    CuposDisponibles: 2,
    SedeId: "S2",
    Costo: 1250000
  },
  {
    id_curso: "C8",
    Instrumento: "INS8",
    Nivel: "Intermedio",
    Duracion: 48,
    Cupo: 10,
    CuposDisponibles: 4,
    SedeId: "S2",
    Costo: 920000
  },
  {
    id_curso: "C9",
    Instrumento: "INS9",
    Nivel: "Principiante",
    Duracion: 42,
    Cupo: 6,
    CuposDisponibles: 1,
    SedeId: "S2",
    Costo: 820000
  },
  {
    id_curso: "C10",
    Instrumento: "INS10",
    Nivel: "Avanzado",
    Duracion: 55,
    Cupo: 12,
    CuposDisponibles: 5,
    SedeId: "S2",
    Costo: 1100000
  },
  // Cali (S3)
  {
    id_curso: "C11",
    Instrumento: "INS11",
    Nivel: "Principiante",
    Duracion: 38,
    Cupo: 18,
    CuposDisponibles: 9,
    SedeId: "S3",
    Costo: 750000
  },
  {
    id_curso: "C12",
    Instrumento: "INS12",
    Nivel: "Intermedio",
    Duracion: 52,
    Cupo: 10,
    CuposDisponibles: 3,
    SedeId: "S3",
    Costo: 980000
  },
  {
    id_curso: "C13",
    Instrumento: "INS13",
    Nivel: "Avanzado",
    Duracion: 60,
    Cupo: 8,
    CuposDisponibles: 2,
    SedeId: "S3",
    Costo: 1180000
  },
  {
    id_curso: "C14",
    Instrumento: "INS14",
    Nivel: "Principiante",
    Duracion: 45,
    Cupo: 7,
    CuposDisponibles: 2,
    SedeId: "S3",
    Costo: 830000
  },
  {
    id_curso: "C15",
    Instrumento: "INS15",
    Nivel: "Intermedio",
    Duracion: 47,
    Cupo: 15,
    CuposDisponibles: 8,
    SedeId: "S3",
    Costo: 890000
  }
]);

// 4. Insertar profesores
db.profesores.insertMany([
  {
    id_profesor: "P1",
    Nombre: "Carlos Rodríguez",
    Correo: "carlos.rodriguez@musicacampus.com",
    Telefono: "3101234567",
    Especialidad: "Guitarra",
    Experiencia: 8,
    CursosAsignados: ["C1", "C6"]
  },
  {
    id_profesor: "P2",
    Nombre: "María González",
    Correo: "maria.gonzalez@musicacampus.com",
    Telefono: "3112345678",
    Especialidad: "Piano",
    Experiencia: 12,
    CursosAsignados: ["C2", "C7"]
  },
  {
    id_profesor: "P3",
    Nombre: "Javier López",
    Correo: "javier.lopez@musicacampus.com",
    Telefono: "3123456789",
    Especialidad: "Violín",
    Experiencia: 6,
    CursosAsignados: ["C3", "C8"]
  },
  {
    id_profesor: "P4",
    Nombre: "Ana Martínez",
    Correo: "ana.martinez@musicacampus.com",
    Telefono: "3134567890",
    Especialidad: "Batería",
    Experiencia: 10,
    CursosAsignados: ["C4", "C9"]
  },
  {
    id_profesor: "P5",
    Nombre: "Pedro Sánchez",
    Correo: "pedro.sanchez@musicacampus.com",
    Telefono: "3145678901",
    Especialidad: "Flauta",
    Experiencia: 7,
    CursosAsignados: ["C5", "C10"]
  },
  {
    id_profesor: "P6",
    Nombre: "Laura Díaz",
    Correo: "laura.diaz@musicacampus.com",
    Telefono: "3156789012",
    Especialidad: "Guitarra",
    Experiencia: 5,
    CursosAsignados: ["C11"]
  },
  {
    id_profesor: "P7",
    Nombre: "Ricardo Torres",
    Correo: "ricardo.torres@musicacampus.com",
    Telefono: "3167890123",
    Especialidad: "Piano",
    Experiencia: 9,
    CursosAsignados: ["C12"]
  },
  {
    id_profesor: "P8",
    Nombre: "Sofía Ramírez",
    Correo: "sofia.ramirez@musicacampus.com",
    Telefono: "3178901234",
    Especialidad: "Violín",
    Experiencia: 11,
    CursosAsignados: ["C13"]
  },
  {
    id_profesor: "P9",
    Nombre: "Diego Herrera",
    Correo: "diego.herrera@musicacampus.com",
    Telefono: "3189012345",
    Especialidad: "Batería",
    Experiencia: 8,
    CursosAsignados: ["C14"]
  },
  {
    id_profesor: "P10",
    Nombre: "Camila Vargas",
    Correo: "camila.vargas@musicacampus.com",
    Telefono: "3190123456",
    Especialidad: "Flauta",
    Experiencia: 6,
    CursosAsignados: ["C15"]
  }
]);

// 5. Insertar estudiantes
db.estudiantes.insertMany([
  {
    id_estudiante: "E1",
    Nombre: "Andrés Castillo",
    Cedula: "12345678",
    Telefono: "3201234567",
    CorreoElectronico: "andres.castillo@email.com",
    NivelMusical: "Principiante",
    CursosInscritos: ["C1", "C6"]
  },
  {
    id_estudiante: "E2",
    Nombre: "Carolina Méndez",
    Cedula: "23456789",
    Telefono: "3212345678",
    CorreoElectronico: "carolina.mendez@email.com",
    NivelMusical: "Intermedio",
    CursosInscritos: ["C2", "C7"]
  },
  {
    id_estudiante: "E3",
    Nombre: "Miguel Ángel Rojas",
    Cedula: "34567890",
    Telefono: "3223456789",
    CorreoElectronico: "miguel.rojas@email.com",
    NivelMusical: "Avanzado",
    CursosInscritos: ["C3", "C8"]
  },
  {
    id_estudiante: "E4",
    Nombre: "Daniela Pérez",
    Cedula: "45678901",
    Telefono: "3234567890",
    CorreoElectronico: "daniela.perez@email.com",
    NivelMusical: "Principiante",
    CursosInscritos: ["C4", "C9"]
  },
  {
    id_estudiante: "E5",
    Nombre: "Juan David Gómez",
    Cedula: "56789012",
    Telefono: "3245678901",
    CorreoElectronico: "juan.gomez@email.com",
    NivelMusical: "Intermedio",
    CursosInscritos: ["C5", "C10"]
  },
  {
    id_estudiante: "E6",
    Nombre: "Valentina Cruz",
    Cedula: "67890123",
    Telefono: "3256789012",
    CorreoElectronico: "valentina.cruz@email.com",
    NivelMusical: "Avanzado",
    CursosInscritos: ["C11"]
  },
  {
    id_estudiante: "E7",
    Nombre: "Santiago Morales",
    Cedula: "78901234",
    Telefono: "3267890123",
    CorreoElectronico: "santiago.morales@email.com",
    NivelMusical: "Principiante",
    CursosInscritos: ["C12"]
  },
  {
    id_estudiante: "E8",
    Nombre: "Mariana Ortiz",
    Cedula: "89012345",
    Telefono: "3278901234",
    CorreoElectronico: "mariana.ortiz@email.com",
    NivelMusical: "Intermedio",
    CursosInscritos: ["C13"]
  },
  {
    id_estudiante: "E9",
    Nombre: "Esteban Silva",
    Cedula: "90123456",
    Telefono: "3289012345",
    CorreoElectronico: "esteban.silva@email.com",
    NivelMusical: "Avanzado",
    CursosInscritos: ["C14"]
  },
  {
    id_estudiante: "E10",
    Nombre: "Natalia Castro",
    Cedula: "10234567",
    Telefono: "3290123456",
    CorreoElectronico: "natalia.castro@email.com",
    NivelMusical: "Principiante",
    CursosInscritos: ["C15"]
  },
  {
    id_estudiante: "E11",
    Nombre: "Felipe Ramírez",
    Cedula: "11234568",
    Telefono: "3301234567",
    CorreoElectronico: "felipe.ramirez@email.com",
    NivelMusical: "Intermedio",
    CursosInscritos: ["C1", "C11"]
  },
  {
    id_estudiante: "E12",
    Nombre: "Gabriela Torres",
    Cedula: "12234569",
    Telefono: "3312345678",
    CorreoElectronico: "gabriela.torres@email.com",
    NivelMusical: "Avanzado",
    CursosInscritos: ["C2", "C12"]
  },
  {
    id_estudiante: "E13",
    Nombre: "David Mendoza",
    Cedula: "13234570",
    Telefono: "3323456789",
    CorreoElectronico: "david.mendoza@email.com",
    NivelMusical: "Principiante",
    CursosInscritos: ["C3", "C13"]
  },
  {
    id_estudiante: "E14",
    Nombre: "Isabella Ríos",
    Cedula: "14234571",
    Telefono: "3334567890",
    CorreoElectronico: "isabella.rios@email.com",
    NivelMusical: "Intermedio",
    CursosInscritos: ["C4", "C14"]
  },
  {
    id_estudiante: "E15",
    Nombre: "Sebastián Vega",
    Cedula: "15234572",
    Telefono: "3345678901",
    CorreoElectronico: "sebastian.vega@email.com",
    NivelMusical: "Avanzado",
    CursosInscritos: ["C5", "C15"]
  }
]);

// 6. Insertar usuarios
db.usuarios.insertMany([
  // Administradores
  {
    id_usuario: "U1",
    Nombre: "Admin Principal",
    Correo: "admin@musicacampus.com",
    Contrasena: "Admin1234",
    Rol: "Administrador"
  },
  // Empleados (Profesores)
  {
    id_usuario: "U2",
    Nombre: "Carlos Rodríguez",
    Correo: "carlos.rodriguez@musicacampus.com",
    Contrasena: "Profesor123",
    Rol: "Empleado"
  },
  {
    id_usuario: "U3",
    Nombre: "María González",
    Correo: "maria.gonzalez@musicacampus.com",
    Contrasena: "Profesor123",
    Rol: "Empleado"
  },
  {
    id_usuario: "U4",
    Nombre: "Javier López",
    Correo: "javier.lopez@musicacampus.com",
    Contrasena: "Profesor123",
    Rol: "Empleado"
  },
  {
    id_usuario: "U5",
    Nombre: "Ana Martínez",
    Correo: "ana.martinez@musicacampus.com",
    Contrasena: "Profesor123",
    Rol: "Empleado"
  },
  {
    id_usuario: "U6",
    Nombre: "Pedro Sánchez",
    Correo: "pedro.sanchez@musicacampus.com",
    Contrasena: "Profesor123",
    Rol: "Empleado"
  },
  // Estudiantes
  {
    id_usuario: "U7",
    Nombre: "Andrés Castillo",
    Correo: "andres.castillo@email.com",
    Contrasena: "Estudiante123",
    Rol: "Estudiante"
  },
  {
    id_usuario: "U8",
    Nombre: "Carolina Méndez",
    Correo: "carolina.mendez@email.com",
    Contrasena: "Estudiante123",
    Rol: "Estudiante"
  },
  {
    id_usuario: "U9",
    Nombre: "Miguel Ángel Rojas",
    Correo: "miguel.rojas@email.com",
    Contrasena: "Estudiante123",
    Rol: "Estudiante"
  },
  {
    id_usuario: "U10",
    Nombre: "Daniela Pérez",
    Correo: "daniela.perez@email.com",
    Contrasena: "Estudiante123",
    Rol: "Estudiante"
  },
  {
    id_usuario: "U11",
    Nombre: "Juan David Gómez",
    Correo: "juan.gomez@email.com",
    Contrasena: "Estudiante123",
    Rol: "Estudiante"
  },
  {
    id_usuario: "U12",
    Nombre: "Valentina Cruz",
    Correo: "valentina.cruz@email.com",
    Contrasena: "Estudiante123",
    Rol: "Estudiante"
  },
  {
    id_usuario: "U13",
    Nombre: "Santiago Morales",
    Correo: "santiago.morales@email.com",
    Contrasena: "Estudiante123",
    Rol: "Estudiante"
  },
  {
    id_usuario: "U14",
    Nombre: "Mariana Ortiz",
    Correo: "mariana.ortiz@email.com",
    Contrasena: "Estudiante123",
    Rol: "Estudiante"
  },
  {
    id_usuario: "U15",
    Nombre: "Esteban Silva",
    Correo: "esteban.silva@email.com",
    Contrasena: "Estudiante123",
    Rol: "Estudiante"
  },
  {
    id_usuario: "U16",
    Nombre: "Natalia Castro",
    Correo: "natalia.castro@email.com",
    Contrasena: "Estudiante123",
    Rol: "Estudiante"
  }
]);

// 7. Insertar inscripciones
db.inscripciones.insertMany([
  {
    id_inscripcion: "I1",
    Estudiante: "E1",
    Curso: "C1",
    Sede: "S1",
    Profesor: "P1",
    Costo: 800000,
    Fecha: new Date("2024-01-15")
  },
  {
    id_inscripcion: "I2",
    Estudiante: "E1",
    Curso: "C6",
    Sede: "S2",
    Profesor: "P1",
    Costo: 780000,
    Fecha: new Date("2024-01-20")
  },
  {
    id_inscripcion: "I3",
    Estudiante: "E2",
    Curso: "C2",
    Sede: "S1",
    Profesor: "P2",
    Costo: 1200000,
    Fecha: new Date("2024-01-18")
  },
  {
    id_inscripcion: "I4",
    Estudiante: "E2",
    Curso: "C7",
    Sede: "S2",
    Profesor: "P2",
    Costo: 1250000,
    Fecha: new Date("2024-01-22")
  },
  {
    id_inscripcion: "I5",
    Estudiante: "E3",
    Curso: "C3",
    Sede: "S1",
    Profesor: "P3",
    Costo: 950000,
    Fecha: new Date("2024-01-16")
  },
  {
    id_inscripcion: "I6",
    Estudiante: "E3",
    Curso: "C8",
    Sede: "S2",
    Profesor: "P3",
    Costo: 920000,
    Fecha: new Date("2024-01-21")
  },
  {
    id_inscripcion: "I7",
    Estudiante: "E4",
    Curso: "C4",
    Sede: "S1",
    Profesor: "P4",
    Costo: 850000,
    Fecha: new Date("2024-01-17")
  },
  {
    id_inscripcion: "I8",
    Estudiante: "E4",
    Curso: "C9",
    Sede: "S2",
    Profesor: "P4",
    Costo: 820000,
    Fecha: new Date("2024-01-23")
  },
  {
    id_inscripcion: "I9",
    Estudiante: "E5",
    Curso: "C5",
    Sede: "S1",
    Profesor: "P5",
    Costo: 700000,
    Fecha: new Date("2024-01-19")
  },
  {
    id_inscripcion: "I10",
    Estudiante: "E5",
    Curso: "C10",
    Sede: "S2",
    Profesor: "P5",
    Costo: 1100000,
    Fecha: new Date("2024-01-24")
  },
  {
    id_inscripcion: "I11",
    Estudiante: "E6",
    Curso: "C11",
    Sede: "S3",
    Profesor: "P6",
    Costo: 750000,
    Fecha: new Date("2024-01-25")
  },
  {
    id_inscripcion: "I12",
    Estudiante: "E7",
    Curso: "C12",
    Sede: "S3",
    Profesor: "P7",
    Costo: 980000,
    Fecha: new Date("2024-01-26")
  },
  {
    id_inscripcion: "I13",
    Estudiante: "E8",
    Curso: "C13",
    Sede: "S3",
    Profesor: "P8",
    Costo: 1180000,
    Fecha: new Date("2024-01-27")
  },
  {
    id_inscripcion: "I14",
    Estudiante: "E9",
    Curso: "C14",
    Sede: "S3",
    Profesor: "P9",
    Costo: 830000,
    Fecha: new Date("2024-01-28")
  },
  {
    id_inscripcion: "I15",
    Estudiante: "E10",
    Curso: "C15",
    Sede: "S3",
    Profesor: "P10",
    Costo: 890000,
    Fecha: new Date("2024-01-29")
  },
  {
    id_inscripcion: "I16",
    Estudiante: "E11",
    Curso: "C1",
    Sede: "S1",
    Profesor: "P1",
    Costo: 800000,
    Fecha: new Date("2024-01-30")
  },
  {
    id_inscripcion: "I17",
    Estudiante: "E11",
    Curso: "C11",
    Sede: "S3",
    Profesor: "P6",
    Costo: 750000,
    Fecha: new Date("2024-02-01")
  },
  {
    id_inscripcion: "I18",
    Estudiante: "E12",
    Curso: "C2",
    Sede: "S1",
    Profesor: "P2",
    Costo: 1200000,
    Fecha: new Date("2024-02-02")
  },
  {
    id_inscripcion: "I19",
    Estudiante: "E12",
    Curso: "C12",
    Sede: "S3",
    Profesor: "P7",
    Costo: 980000,
    Fecha: new Date("2024-02-03")
  },
  {
    id_inscripcion: "I20",
    Estudiante: "E13",
    Curso: "C3",
    Sede: "S1",
    Profesor: "P3",
    Costo: 950000,
    Fecha: new Date("2024-02-04")
  },
  {
    id_inscripcion: "I21",
    Estudiante: "E13",
    Curso: "C13",
    Sede: "S3",
    Profesor: "P8",
    Costo: 1180000,
    Fecha: new Date("2024-02-05")
  },
  {
    id_inscripcion: "I22",
    Estudiante: "E14",
    Curso: "C4",
    Sede: "S1",
    Profesor: "P4",
    Costo: 850000,
    Fecha: new Date("2024-02-06")
  },
  {
    id_inscripcion: "I23",
    Estudiante: "E14",
    Curso: "C14",
    Sede: "S3",
    Profesor: "P9",
    Costo: 830000,
    Fecha: new Date("2024-02-07")
  },
  {
    id_inscripcion: "I24",
    Estudiante: "E15",
    Curso: "C5",
    Sede: "S1",
    Profesor: "P5",
    Costo: 700000,
    Fecha: new Date("2024-02-08")
  },
  {
    id_inscripcion: "I25",
    Estudiante: "E15",
    Curso: "C15",
    Sede: "S3",
    Profesor: "P10",
    Costo: 890000,
    Fecha: new Date("2024-02-09")
  },
  {
    id_inscripcion: "I26",
    Estudiante: "E1",
    Curso: "C11",
    Sede: "S3",
    Profesor: "P6",
    Costo: 750000,
    Fecha: new Date("2024-02-10")
  },
  {
    id_inscripcion: "I27",
    Estudiante: "E2",
    Curso: "C12",
    Sede: "S3",
    Profesor: "P7",
    Costo: 980000,
    Fecha: new Date("2024-02-11")
  },
  {
    id_inscripcion: "I28",
    Estudiante: "E3",
    Curso: "C13",
    Sede: "S3",
    Profesor: "P8",
    Costo: 1180000,
    Fecha: new Date("2024-02-12")
  },
  {
    id_inscripcion: "I29",
    Estudiante: "E4",
    Curso: "C14",
    Sede: "S3",
    Profesor: "P9",
    Costo: 830000,
    Fecha: new Date("2024-02-13")
  },
  {
    id_inscripcion: "I30",
    Estudiante: "E5",
    Curso: "C15",
    Sede: "S3",
    Profesor: "P10",
    Costo: 890000,
    Fecha: new Date("2024-02-14")
  }
]);

// 8. Insertar reservas
db.reservas.insertMany([
  {
    id_reserva: "R1",
    Instrumento: "INS1",
    Estudiante: {
      id_estudiante: "E1",
      Nombre: "Andrés Castillo",
      Telefono: "3201234567"
    },
    Estado: "Confirmada",
    Fecha: new Date("2024-02-15")
  },
  {
    id_reserva: "R2",
    Instrumento: "INS6",
    Estudiante: {
      id_estudiante: "E2",
      Nombre: "Carolina Méndez",
      Telefono: "3212345678"
    },
    Estado: "Pendiente",
    Fecha: new Date("2024-02-16")
  },
  {
    id_reserva: "R3",
    Instrumento: "INS11",
    Estudiante: {
      id_estudiante: "E3",
      Nombre: "Miguel Ángel Rojas",
      Telefono: "3223456789"
    },
    Estado: "Confirmada",
    Fecha: new Date("2024-02-17")
  },
  {
    id_reserva: "R4",
    Instrumento: "INS16",
    Estudiante: {
      id_estudiante: "E4",
      Nombre: "Daniela Pérez",
      Telefono: "3234567890"
    },
    Estado: "Cancelada",
    Fecha: new Date("2024-02-18")
  },
  {
    id_reserva: "R5",
    Instrumento: "INS2",
    Estudiante: {
      id_estudiante: "E5",
      Nombre: "Juan David Gómez",
      Telefono: "3245678901"
    },
    Estado: "Finalizada",
    Fecha: new Date("2024-02-19")
  },
  {
    id_reserva: "R6",
    Instrumento: "INS7",
    Estudiante: {
      id_estudiante: "E6",
      Nombre: "Valentina Cruz",
      Telefono: "3256789012"
    },
    Estado: "Confirmada",
    Fecha: new Date("2024-02-20")
  },
  {
    id_reserva: "R7",
    Instrumento: "INS12",
    Estudiante: {
      id_estudiante: "E7",
      Nombre: "Santiago Morales",
      Telefono: "3267890123"
    },
    Estado: "Pendiente",
    Fecha: new Date("2024-02-21")
  },
  {
    id_reserva: "R8",
    Instrumento: "INS17",
    Estudiante: {
      id_estudiante: "E8",
      Nombre: "Mariana Ortiz",
      Telefono: "3278901234"
    },
    Estado: "Confirmada",
    Fecha: new Date("2024-02-22")
  },
  {
    id_reserva: "R9",
    Instrumento: "INS3",
    Estudiante: {
      id_estudiante: "E9",
      Nombre: "Esteban Silva",
      Telefono: "3289012345"
    },
    Estado: "Cancelada",
    Fecha: new Date("2024-02-23")
  },
  {
    id_reserva: "R10",
    Instrumento: "INS8",
    Estudiante: {
      id_estudiante: "E10",
      Nombre: "Natalia Castro",
      Telefono: "3290123456"
    },
    Estado: "Finalizada",
    Fecha: new Date("2024-02-24")
  }
]);

print("Datos de prueba insertados exitosamente!");