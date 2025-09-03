// Archivo de Configuración de Roles y Usuarios para Campus Music

// --- Creación de Roles Personalizados ---

// 1. Crear rol de Administrador
// Este rol tiene privilegios amplios para gestionar la base de datos completa.
db.createRole({
  role: "Administrador",
  privileges: [
    {
      // Concede permisos para ver, insertar, actualizar y eliminar en todas las colecciones.
      resource: { db: "campus_music", collection: "" },
      actions: ["find", "insert", "update", "remove", "createCollection", "dropCollection"]
    },
    {
      // Concede permisos para gestionar los usuarios del sistema.
      resource: { db: "campus_music", collection: "system.users" },
      actions: ["find", "insert", "update", "remove"]
    },
    {
      // Concede permisos para gestionar los roles del sistema.
      resource: { db: "campus_music", collection: "system.roles" },
      actions: ["find", "insert", "update", "remove"]
    }
  ],
  roles: []
});

// 2. Crear rol de EmpleadoSede
// Este rol está diseñado para personal de la sede, con permisos limitados.
db.createRole({
  role: "EmpleadoSede",
  privileges: [
    // Solo tienen permiso de lectura (find) en las colecciones de referencia.
    { resource: { db: "campus_music", collection: "estudiantes" }, actions: ["find"] },
    { resource: { db: "campus_music", collection: "profesores" }, actions: ["find"] },
    { resource: { db: "campus_music", collection: "cursos" }, actions: ["find"] },
    { resource: { db: "campus_music", collection: "instrumentos" }, actions: ["find"] },
    { resource: { db: "campus_music", collection: "sedes" }, actions: ["find"] },
    // Tienen permisos de lectura, inserción y actualización en inscripciones y reservas, que son sus tareas principales.
    { resource: { db: "campus_music", collection: "inscripciones" }, actions: ["find", "insert", "update"] },
    { resource: { db: "campus_music", collection: "reservas" }, actions: ["find", "insert", "update"] }
  ],
  roles: []
});

// 3. Crear rol de Estudiante
// Este rol define los permisos para los estudiantes, enfocados en sus propias consultas.
db.createRole({
  role: "Estudiante",
  privileges: [
    // Tienen permisos de lectura en colecciones informativas.
    { resource: { db: "campus_music", collection: "estudiantes" }, actions: ["find"] },
    { resource: { db: "campus_music", collection: "cursos" }, actions: ["find"] },
    { resource: { db: "campus_music", collection: "instrumentos" }, actions: ["find"] },
    { resource: { db: "campus_music", collection: "inscripciones" }, actions: ["find"] },
    // Solo pueden insertar (crear) nuevas reservas, no modificarlas.
    { resource: { db: "campus_music", collection: "reservas" }, actions: ["insert"] }
  ],
  roles: []
});

// --- Creación y Asignación de Usuarios ---

// 4. Crear usuarios con roles iniciales
// Se crean los usuarios y se les asigna su rol principal.
db.createUser({
  user: "admin_campus",
  pwd: "Admin123",
  roles: ["Administrador"],
  customData: { id_usuario: "U_ADMIN", nombre: "Administrador Sistema" }
});

db.createUser({
  user: "empleado_bogota",
  pwd: "Empleado123",
  roles: ["EmpleadoSede"],
  customData: { id_usuario: "U_EMP_BOG", nombre: "Empleado Bogotá", sede: "S1" }
});

db.createUser({
  user: "empleado_medellin",
  pwd: "Empleado123",
  roles: ["EmpleadoSede"],
  customData: { id_usuario: "U_EMP_MED", nombre: "Empleado Medellín", sede: "S2" }
});

db.createUser({
  user: "empleado_cali",
  pwd: "Empleado123",
  roles: ["EmpleadoSede"],
  customData: { id_usuario: "U_EMP_CAL", nombre: "Empleado Cali", sede: "S3" }
});

db.createUser({
  user: "estudiante_andres",
  pwd: "Estudiante123",
  roles: ["Estudiante"],
  customData: { id_usuario: "U7", id_estudiante: "E1", nombre: "Andrés Castillo" }
});

db.createUser({
  user: "estudiante_carolina",
  pwd: "Estudiante123",
  roles: ["Estudiante"],
  customData: { id_usuario: "U8", id_estudiante: "E2", nombre: "Carolina Méndez" }
});

// 5. Asignar roles adicionales usando grantRolesToUser (mantenido para claridad)
// Esta sección asegura que los roles estén asignados correctamente, aunque ya se hizo en el paso de creación.
db.grantRolesToUser("admin_campus", ["Administrador"]);
db.grantRolesToUser("empleado_bogota", ["EmpleadoSede"]);
db.grantRolesToUser("empleado_medellin", ["EmpleadoSede"]);
db.grantRolesToUser("empleado_cali", ["EmpleadoSede"]);
db.grantRolesToUser("estudiante_andres", ["Estudiante"]);
db.grantRolesToUser("estudiante_carolina", ["Estudiante"]);

// --- Verificación de Roles y Usuarios ---

// 6. Verificación - CORREGIDO
// Se imprimen los roles y usuarios creados para confirmar que la configuración fue exitosa.
print("=== Roles creados ===");
var roles = db.getRoles({ showBuiltinRoles: false, showPrivileges: true });
for (var i = 0; i < roles.length; i++) {
  printjson({
    role: roles[i].role,
    privileges: roles[i].privileges.length,
    roles: roles[i].roles
  });
}

print("\n=== Usuarios creados ===");
var users = db.getUsers();
for (var i = 0; i < users.length; i++) {
  printjson({
    user: users[i].user,
    roles: users[i].roles,
    customData: users[i].customData
  });
}

print("\n✅ Roles y usuarios creados exitosamente!");