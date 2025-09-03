
/**
 * TRANSACCIÓN MongoDB: Inscribir estudiante en un curso
 * Objetivo: Operación atómica entre colecciones inscripciones y cursos
 */

// 1. INICIAR SESIÓN DE TRANSACCIÓN
const session = db.getMongo().startSession();

try {
    print("🚀 INICIANDO TRANSACCIÓN...");
    
    // 2. INICIAR TRANSACCIÓN
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
    print("✅ Realizando commit de la transacción...");
    session.commitTransaction();
    
    print("🎉 TRANSACCIÓN COMPLETADA EXITOSAMENTE!");
    print(`📊 Inscripción creada: ${idInscripcion}`);
    print(`📊 Cupos restantes: ${curso.CuposDisponibles - 1}`);

} catch (error) {
    // 10. ABORTAR TRANSACCIÓN (ROLLBACK) EN CASO DE ERROR
    print(`❌ ERROR: ${error.message}`);
    print("🔄 Realizando rollback...");
    
    session.abortTransaction();
    
    print("📊 Transacción revertida. La base de datos se mantiene consistente.");
    
} finally {
    // 11. CERRAR SESIÓN (SIEMPRE SE DEBE HACER)
    session.endSession();
    print("🔚 Sesión de transacción cerrada.");
}

// 12. VERIFICACIÓN POST-TRANSACCIÓN
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