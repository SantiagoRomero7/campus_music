/**
 * TRANSACCIÓN MongoDB: Inscribir estudiante en un curso
 * Objetivo: Realizar una operación atómica para garantizar que la inscripción
 * y la actualización de cupos se completen juntas o no se realicen en absoluto.
 */

// 1. INICIAR SESIÓN DE TRANSACCIÓN
// La sesión es necesaria para agrupar múltiples operaciones en una sola transacción.
const session = db.getMongo().startSession();

try {
    print("🚀 INICIANDO TRANSACCIÓN...");
    
    // 2. INICIAR TRANSACCIÓN
    // Se inicia la transacción dentro de la sesión.
    // `readConcern`: `snapshot` asegura que todas las lecturas dentro de la transacción vean los mismos datos,
    // incluso si otros procesos están escribiendo en las colecciones.
    // `writeConcern`: `majority` garantiza que la operación solo se considere exitosa
    // cuando ha sido escrita en la mayoría de los nodos del replica set.
    session.startTransaction({
        readConcern: { level: "snapshot" },
        writeConcern: { w: "majority" }
    });

    // DATOS PARA LA INSCRIPCIÓN (usando datos existentes en tu DB)
    const estudianteId = "E1";    // Andrés Castillo - EXISTE
    const cursoId = "C1";         // Guitarra Principiante - EXISTE con cupos
    const sedeId = "S1";          // Bogotá - EXISTE
    const profesorId = "P1";      // Carlos Rodríguez - EXISTE
    const costo = 800000;

    print(`📋 Inscribiendo estudiante ${estudianteId} en curso ${cursoId}...`);

    // 3. VERIFICAR QUE EL CURSO EXISTE Y TIENE CUPOS
    // Se lee el documento del curso dentro de la transacción, usando el parámetro `session`.
    print("🔍 Verificando curso y cupos disponibles...");
    const curso = db.cursos.findOne(
        { id_curso: cursoId },
        { session: session }
    );

    if (!curso) {
        throw new Error(`El curso ${cursoId} no existe`);
    }

    if (curso.CuposDisponibles <= 0) {
        throw new Error(`El curso ${cursoId} no tiene cupos disponibles`);
    }
    print(`✅ Curso validado: ${curso.id_curso} - Cupos: ${curso.CuposDisponibles}`);

    // 4. VERIFICAR QUE EL ESTUDIANTE EXISTE
    // Se lee el documento del estudiante para confirmar su existencia, también dentro de la sesión.
    print("🔍 Verificando estudiante...");
    const estudiante = db.estudiantes.findOne(
        { id_estudiante: estudianteId },
        { session: session }
    );

    if (!estudiante) {
        throw new Error(`El estudiante ${estudianteId} no existe`);
    }
    print(`✅ Estudiante validado: ${estudiante.Nombre}`);

    // 5. GENERAR NUEVO ID DE INSCRIPCIÓN
    // Se genera un nuevo ID de forma programática. Esta operación no afecta las colecciones
    // y se puede realizar fuera de la transacción, pero se incluye aquí para la completitud del script.
    print("🔢 Generando ID de inscripción...");
    const ultimaInscripcion = db.inscripciones.find()
        .sort({ id_inscripcion: -1 })
        .limit(1)
        .toArray();
    
    const nuevoNumero = ultimaInscripcion.length > 0 ? 
        parseInt(ultimaInscripcion[0].id_inscripcion.substring(1)) + 1 : 31;
    const idInscripcion = "I" + nuevoNumero;
    print(`✅ Nuevo ID generado: ${idInscripcion}`);

    // 6. INSERTAR DOCUMENTO EN INSCRIPCIONES (OPERACIÓN 1)
    // Se inserta la nueva inscripción. Si esta operación falla, la transacción entera fallará y se hará un rollback.
    print("📝 Insertando inscripción...");
    const resultadoInscripcion = db.inscripciones.insertOne({
        id_inscripcion: idInscripcion,
        Estudiante: estudianteId,
        Curso: cursoId,
        Sede: sedeId,
        Profesor: profesorId,
        Costo: costo,
        Fecha: new Date()
    }, { session: session });

    if (resultadoInscripcion.insertedCount !== 1) {
        throw new Error("Error al insertar la inscripción");
    }
    print("✅ Inscripción creada exitosamente");

    // 7. DECREMENTAR CUPOS_DISPONIBLES EN CURSOS (OPERACIÓN 2)
    // Se decrementa el contador de cupos. Esta es una operación de escritura dentro de la transacción.
    print("➖ Decrementando cupos disponibles...");
    const resultadoCupos = db.cursos.updateOne(
        { id_curso: cursoId },
        { $inc: { CuposDisponibles: -1 } },
        { session: session }
    );

    if (resultadoCupos.modifiedCount !== 1) {
        throw new Error("Error al actualizar cupos del curso");
    }
    print("✅ Cupos decrementados exitosamente");

    // 8. ACTUALIZAR ESTUDIANTE (OPERACIÓN 3 - OPCIONAL PERO COMPLETA LA TRANSACCIÓN)
    // Se agrega el curso a la lista de cursos inscritos del estudiante.
    print("🔄 Actualizando cursos del estudiante...");
    const resultadoEstudiante = db.estudiantes.updateOne(
        { id_estudiante: estudianteId },
        { $addToSet: { CursosInscritos: cursoId } },
        { session: session }
    );

    if (resultadoEstudiante.modifiedCount !== 1) {
        throw new Error("Error al actualizar cursos del estudiante");
    }
    print("✅ Estudiante actualizado exitosamente");

    // 9. COMMIT DE LA TRANSACCIÓN (CONFIRMAR TODAS LAS OPERACIONES)
    // Si todas las operaciones anteriores fueron exitosas, se confirman los cambios en la base de datos.
    print("✅ Realizando commit de la transacción...");
    session.commitTransaction();
    
    print("🎉 TRANSACCIÓN COMPLETADA EXITOSAMENTE!");
    print(`📊 Inscripción creada: ${idInscripcion}`);
    print(`📊 Cupos restantes: ${curso.CuposDisponibles - 1}`);

} catch (error) {
    // 10. ABORTAR TRANSACCIÓN (ROLLBACK) EN CASO DE ERROR
    // En caso de que cualquier operación falle, se revierten todos los cambios
    // realizados dentro de la transacción, manteniendo la consistencia de los datos.
    print(`❌ ERROR: ${error.message}`);
    print("🔄 Realizando rollback...");
    
    session.abortTransaction();
    
    print("📊 Transacción revertida. La base de datos se mantiene consistente.");
    
} finally {
    // 11. CERRAR SESIÓN (SIEMPRE SE DEBE HACER)
    // La sesión debe ser terminada al final, sin importar si la transacción tuvo éxito o falló.
    session.endSession();
    print("🔚 Sesión de transacción cerrada.");
}

// 12. VERIFICACIÓN POST-TRANSACCIÓN
// Esta sección es para fines de demostración y no forma parte de la transacción en sí.
print("\n=== VERIFICACIÓN FINAL ===");

// Verificar inscripción creada
const inscripcionCreada = db.inscripciones.findOne({ id_inscripcion: "I31" });
print("📋 Inscripción creada:");
printjson(inscripcionCreada);

// Verificar cupos actualizados
const cursoActualizado = db.cursos.findOne(
    { id_curso: "C1" }, 
    { id_curso: 1, Cupo: 1, CuposDisponibles: 1 }
);
print("📊 Estado del curso:");
printjson(cursoActualizado);

// Verificar estudiante actualizado
const estudianteActualizado = db.estudiantes.findOne(
    { id_estudiante: "E1" }, 
    { id_estudiante: 1, Nombre: 1, CursosInscritos: 1 }
);
print("👨‍🎓 Cursos del estudiante:");
printjson(estudianteActualizado);

print("\n✅ Script de transacciones completado!");