# Proyecto Campus Music

## Introducción al proyecto
Campus Music es un sistema de gestión para múltiples escuelas de música en diferentes ciudades. Permite administrar estudiantes, profesores, cursos, inscripciones, instrumentos y reservas de manera centralizada utilizando MongoDB.

## Justificación del uso de MongoDB
Se eligió MongoDB por su flexibilidad de esquemas, capacidad para manejar datos complejos, soporte de transacciones y consultas agregadas, y facilidad de escalabilidad.

## Diseño del modelo de datos

### Colecciones creadas
- `usuarios`
- `estudiantes`
- `profesores`
- `cursos`
- `sedes`
- `instrumentos`
- `inscripciones`
- `reservas`

### Decisiones de uso de referencias o embebidos
- Se usan referencias para relacionar estudiantes con cursos, inscripciones con estudiantes y cursos, y reservas con instrumentos y estudiantes.
- Se usan embebidos para almacenar listas simples, como cursos inscritos en el documento del estudiante.

### Validaciones `$jsonSchema`
Se implementaron validaciones estrictas para garantizar la integridad de los datos.

**Ejemplo: colección `usuarios`**
```javascript
validator: {
  $jsonSchema: {
    bsonType: "object",
    required: ["_id", "id_usuario", "Nombre", "Correo", "Contrasena", "Rol"],
    properties: {
      id_usuario: {
        bsonType: "string",
        pattern: "^U[0-9]+$",
        description: "ID del usuario que empieza por 'U' seguido de números"
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
```


## Índices

```javascript
db.usuarios.createIndex({ id_usuario: 1 }, { unique: true })
db.usuarios.createIndex({ Correo: 1 }, { unique: true })
db.estudiantes.createIndex({ id_estudiante: 1 }, { unique: true })
db.profesores.createIndex({ id_profesor: 1 }, { unique: true })
db.instrumentos.createIndex({ id_instrumento: 1 }, { unique: true })
db.sedes.createIndex({ id_sede: 1 }, { unique: true })
db.cursos.createIndex({ id_curso: 1 }, { unique: true })
db.reservas.createIndex({ id_reserva: 1 }, { unique: true })
db.inscripciones.createIndex({ id_inscripcion: 1 }, { unique: true })
```

## Justificación técnica

Índices únicos para evitar duplicados y optimizar búsquedas frecuentes.

## Estructura de los datos de prueba

- **Sedes:** 3 (Bogotá, Medellín, Cali)  
- **Instrumentos:** 20, distribuidos entre sedes  
- **Cursos:** 15, con distintos niveles e instrumentos  
- **Profesores:** 10, con especialidades variadas  
- **Estudiantes:** 15, con diferentes niveles musicales  
- **Usuarios:** 16, con roles variados  
- **Inscripciones:** 30 estudiantes a cursos  
- **Reservas:** 10 de instrumentos  

## Explicación de agregaciones

- **Estudiantes inscritos por sede en el último mes:**  
  Agrupa las inscripciones por sede y cuenta estudiantes únicos.

- **Cursos más demandados por sede:**  
  Identifica los cursos con mayor demanda por ubicación.

- **Ingreso total por sede:**  
  Calcula ingresos generados por cada sede.

- **Profesor con más estudiantes:**  
  Determina la carga estudiantil de cada profesor.

- **Instrumento más reservado:**  
  Identifica el instrumento más popular.

- **Historial de cursos de un estudiante:**  
  Muestra el progreso académico completo.

- **Cursos en ejecución:**  
  Lista cursos disponibles con cupos.

- **Cursos que excedieron el cupo permitido:**  
  Detecta inconsistencias en gestión de cupos.

## Transacción MongoDB: Inscripción de un estudiante a un curso

Este fragmento de código muestra cómo realizar una **transacción** en MongoDB para inscribir a un estudiante en un curso, asegurando que todas las operaciones relacionadas se ejecuten de forma atómica.

### Escenario

1. Insertar un registro en la colección `inscripciones`.
2. Decrementar el campo `CuposDisponibles` en la colección `cursos`.
3. Agregar el curso al array `CursosInscritos` del estudiante.
4. Si ocurre algún error, se realiza un **rollback** de todas las operaciones.

### Código

```javascript
const session = db.getMongo().startSession();

try {
  session.startTransaction({
    readConcern: { level: "snapshot" },
    writeConcern: { w: "majority" }
  });

  // Buscar curso y estudiante
  const curso = db.cursos.findOne({ id_curso: cursoId }, { session });
  const estudiante = db.estudiantes.findOne({ id_estudiante: estudianteId }, { session });

  // Generar ID de inscripción
  const idInscripcion = "I" + (nuevoNumero);

  // Insertar inscripción
  db.inscripciones.insertOne(
    { _id: idInscripcion, estudiante_id: estudianteId, curso_id: cursoId, fecha: new Date() },
    { session }
  );

  // Actualizar cupos del curso
  db.cursos.updateOne(
    { id_curso: cursoId },
    { $inc: { CuposDisponibles: -1 } },
    { session }
  );

  // Actualizar cursos inscritos del estudiante
  db.estudiantes.updateOne(
    { id_estudiante: estudianteId },
    { $addToSet: { CursosInscritos: cursoId } },
    { session }
  );

  // Confirmar transacción
  session.commitTransaction();
} catch (error) {
  // Revertir cambios en caso de error
  session.abortTransaction();
  console.error("Error en la transacción:", error);
} finally {
  session.endSession();
}
```

## Roles de usuario en el sistema

El sistema de **Campus Music** maneja distintos roles para controlar el acceso y las operaciones que cada usuario puede realizar:

- **Administrador:** Acceso completo a todas las colecciones y operaciones CRUD.  
- **EmpleadoSede:** Gestiona inscripciones y reservas, puede leer otras colecciones.  
- **Estudiante:** Consulta información y crea reservas.  

### Ejemplo de creación de un usuario Administrador

```javascript
// Crear rol Administrador
db.createRole({
  role: "Administrador",
  privileges: [
    {
      resource: { db: "campus_music", collection: "" },
      actions: ["find", "insert", "update", "remove", "createCollection", "dropCollection"]
    }
  ],
  roles: []
});

// Crear usuario con rol Administrador
db.createUser({
  user: "admin_campus",
  pwd: "Admin123",
  roles: ["Administrador"],
  customData: { id_usuario: "U_ADMIN", nombre: "Administrador Sistema" }
});
```
## Conclusiones y mejoras posibles

### Conclusiones

- MongoDB es excelente para sistemas de gestión educativa.  
- La flexibilidad del esquema permite modelar relaciones complejas.  
- Las transacciones garantizan consistencia en operaciones críticas.  
- Las validaciones con `$jsonSchema` mantienen la integridad de los datos.  

### Mejoras posibles

- Implementar paginación para consultas grandes.  
- Agregar más transacciones para otras operaciones críticas.  
- Crear índices compuestos y vistas para consultas frecuentes.  
- Añadir **full-text search** y auditoría de cambios.  
- Optimizar agregaciones con índices adecuados.  
- Implementar replicación y archiving para alta disponibilidad.  

> El proyecto demuestra que MongoDB es una solución robusta y flexible para sistemas educativos, capaz de manejar operaciones complejas manteniendo rendimiento y consistencia.

## - Mantenimiento y Créditos
- **Santiago Romero Saavedra** 

