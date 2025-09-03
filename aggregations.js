// Archivo de Consultas de Agregación para Campus Music

// --- Consultas para Reportes y Análisis ---

// 1. ¿Cuántos estudiantes se inscribieron por sede en el último mes?
print("=== 1. Estudiantes inscritos por sede en el último mes (usando fechas de los datos) ===");
db.inscripciones.aggregate([
  {
    // $match: Filtra los documentos de la colección 'inscripciones' por un rango de fechas.
    // Aquí se utiliza un rango de un mes (del 20 de enero al 20 de febrero) como ejemplo.
    $match: {
      Fecha: {
        $gte: new Date("2024-01-20"), // Último mes según tus datos
        $lte: new Date("2024-02-20")
      }
    }
  },
  {
    // $group: Agrupa los documentos por el campo 'Sede'.
    // `totalInscripciones`: Suma 1 por cada documento en el grupo para contar el total de inscripciones.
    // `estudiantesUnicos`: Crea un conjunto de los IDs de estudiantes para obtener un recuento de estudiantes únicos.
    $group: {
      _id: "$Sede",
      totalInscripciones: { $sum: 1 },
      estudiantesUnicos: { $addToSet: "$Estudiante" }
    }
  },
  {
    // $lookup: Realiza una unión con la colección 'sedes'.
    // `from`: Colección con la que se une.
    // `localField`: Campo en la colección actual ('inscripciones') para la unión.
    // `foreignField`: Campo en la colección de destino ('sedes') para la unión.
    // `as`: Nombre del nuevo campo que contendrá los documentos unidos.
    $lookup: {
      from: "sedes",
      localField: "_id",
      foreignField: "id_sede",
      as: "sedeInfo"
    }
  },
  {
    // $project: Define la estructura del documento de salida.
    // `sede`: Extrae la 'Ciudad' del primer elemento del array `sedeInfo`.
    // `totalInscripciones`: Incluye el campo tal cual.
    // `totalEstudiantesUnicos`: Calcula el tamaño del array `estudiantesUnicos`.
    // `estudiantes`: Incluye la lista de estudiantes.
    $project: {
      sede: { $arrayElemAt: ["$sedeInfo.Ciudad", 0] },
      totalInscripciones: 1,
      totalEstudiantesUnicos: { $size: "$estudiantesUnicos" },
      estudiantes: "$estudiantesUnicos"
    }
  },
  {
    // $sort: Ordena los resultados por el número de estudiantes únicos en orden descendente.
    $sort: { totalEstudiantesUnicos: -1 }
  }
]).forEach(printjson);

// 2. ¿Cuáles son los cursos más demandados en cada sede?
print("\n=== 2. Cursos más demandados en cada sede ===");
db.inscripciones.aggregate([
  {
    // $group: Agrupa por 'sede' y 'curso' para contar las inscripciones de cada curso en cada sede.
    $group: {
      _id: {
        sede: "$Sede",
        curso: "$Curso"
      },
      totalInscripciones: { $sum: 1 }
    }
  },
  {
    // $sort: Ordena los resultados para que el curso con más inscripciones esté primero dentro de cada sede.
    $sort: { totalInscripciones: -1 }
  },
  {
    // $group: Agrupa solo por 'sede' y usa $first para obtener el curso más demandado (el que quedó primero después del ordenamiento).
    $group: {
      _id: "$_id.sede",
      cursoMasDemandado: { $first: "$_id.curso" },
      totalInscripciones: { $first: "$totalInscripciones" }
    }
  },
  {
    // $lookup: Une con la colección 'sedes' para obtener el nombre de la sede.
    $lookup: {
      from: "sedes",
      localField: "_id",
      foreignField: "id_sede",
      as: "sedeInfo"
    }
  },
  {
    // $lookup: Une con la colección 'cursos' para obtener información del curso.
    $lookup: {
      from: "cursos",
      localField: "cursoMasDemandado",
      foreignField: "id_curso",
      as: "cursoInfo"
    }
  },
  {
    // $project: Da forma al documento de salida con los campos relevantes.
    $project: {
      sede: { $arrayElemAt: ["$sedeInfo.Ciudad", 0] },
      curso: { $arrayElemAt: ["$cursoInfo.id_curso", 0] },
      instrumento: { $arrayElemAt: ["$cursoInfo.Instrumento", 0] },
      nivel: { $arrayElemAt: ["$cursoInfo.Nivel", 0] },
      totalInscripciones: 1
    }
  }
]).forEach(printjson);

// 3. ¿Cuál es el ingreso total generado por inscripciones en cada sede?
print("\n=== 3. Ingreso total por sede ===");
db.inscripciones.aggregate([
  {
    // $group: Agrupa por 'Sede' y suma el 'Costo' de cada inscripción para obtener el ingreso total por sede.
    $group: {
      _id: "$Sede",
      ingresoTotal: { $sum: "$Costo" }
    }
  },
  {
    // $lookup: Une con la colección 'sedes' para obtener el nombre de la ciudad.
    $lookup: {
      from: "sedes",
      localField: "_id",
      foreignField: "id_sede",
      as: "sedeInfo"
    }
  },
  {
    // $project: Define el formato de salida.
    $project: {
      sede: { $arrayElemAt: ["$sedeInfo.Ciudad", 0] },
      ingresoTotal: 1
    }
  },
  {
    // $sort: Ordena los resultados por el ingreso total en orden descendente.
    $sort: { ingresoTotal: -1 }
  }
]).forEach(printjson);

// 4. ¿Qué profesor tiene más estudiantes asignados?
print("\n=== 4. Profesor con más estudiantes asignados ===");
db.inscripciones.aggregate([
  {
    // $group: Agrupa las inscripciones por 'Profesor'.
    // `totalEstudiantes`: Cuenta el total de inscripciones por profesor.
    // `estudiantesUnicos`: Crea un conjunto de IDs de estudiantes para contar a los estudiantes únicos.
    $group: {
      _id: "$Profesor",
      totalEstudiantes: { $sum: 1 },
      estudiantesUnicos: { $addToSet: "$Estudiante" }
    }
  },
  {
    // $project: Proyecta los campos y calcula el tamaño del conjunto de estudiantes únicos.
    $project: {
      totalEstudiantes: 1,
      estudiantesUnicosCount: { $size: "$estudiantesUnicos" }
    }
  },
  {
    // $sort: Ordena por el número de estudiantes únicos en orden descendente.
    $sort: { estudiantesUnicosCount: -1 }
  },
  {
    // $limit: Limita el resultado a un solo documento (el profesor con más estudiantes).
    $limit: 1
  },
  {
    // $lookup: Une con la colección 'profesores' para obtener el nombre del profesor.
    $lookup: {
      from: "profesores",
      localField: "_id",
      foreignField: "id_profesor",
      as: "profesorInfo"
    }
  },
  {
    // $project: Formatea el documento de salida con el nombre del profesor y las cuentas.
    $project: {
      profesor: { $arrayElemAt: ["$profesorInfo.Nombre", 0] },
      totalInscripciones: "$totalEstudiantes",
      estudiantesUnicos: "$estudiantesUnicosCount"
    }
  }
]).forEach(printjson);

// 5. ¿Qué instrumento es el más reservado?
print("\n=== 5. Instrumento más reservado ===");
db.reservas.aggregate([
  {
    // $group: Agrupa por 'Instrumento' para contar el total de reservas.
    $group: {
      _id: "$Instrumento",
      totalReservas: { $sum: 1 }
    }
  },
  {
    // $sort: Ordena por el total de reservas en orden descendente.
    $sort: { totalReservas: -1 }
  },
  {
    // $limit: Obtiene el instrumento con la mayor cantidad de reservas.
    $limit: 1
  },
  {
    // $lookup: Une con la colección 'instrumentos' para obtener los detalles del instrumento.
    $lookup: {
      from: "instrumentos",
      localField: "_id",
      foreignField: "id_instrumento",
      as: "instrumentoInfo"
    }
  },
  {
    // $project: Define el documento de salida con la información del instrumento y el total de reservas.
    $project: {
      instrumento: { $arrayElemAt: ["$instrumentoInfo.Tipo", 0] },
      marca: { $arrayElemAt: ["$instrumentoInfo.Marca", 0] },
      sede: { $arrayElemAt: ["$instrumentoInfo.Sede", 0] },
      totalReservas: 1
    }
  }
]).forEach(printjson);

// 6. Mostrar el historial de cursos de un estudiante (fecha, sede, curso, profesor, nivel, costo)
print("\n=== 6. Historial de cursos del estudiante E1 ===");
db.inscripciones.aggregate([
  {
    // $match: Filtra las inscripciones por un estudiante específico, en este caso 'E1'.
    $match: {
      Estudiante: "E1"
    }
  },
  {
    // $lookup: Une con la colección 'cursos' para obtener detalles del curso.
    $lookup: {
      from: "cursos",
      localField: "Curso",
      foreignField: "id_curso",
      as: "cursoInfo"
    }
  },
  {
    // $lookup: Une con la colección 'profesores' para obtener el nombre del profesor.
    $lookup: {
      from: "profesores",
      localField: "Profesor",
      foreignField: "id_profesor",
      as: "profesorInfo"
    }
  },
  {
    // $lookup: Une con la colección 'sedes' para obtener la ciudad de la sede.
    $lookup: {
      from: "sedes",
      localField: "Sede",
      foreignField: "id_sede",
      as: "sedeInfo"
    }
  },
  {
    // $project: Reestructura los documentos para mostrar solo la información relevante del historial.
    $project: {
      fecha: { $dateToString: { format: "%Y-%m-%d", date: "$Fecha" } },
      sede: { $arrayElemAt: ["$sedeInfo.Ciudad", 0] },
      curso: { $arrayElemAt: ["$cursoInfo.id_curso", 0] },
      profesor: { $arrayElemAt: ["$profesorInfo.Nombre", 0] },
      nivel: { $arrayElemAt: ["$cursoInfo.Nivel", 0] },
      costo: "$Costo"
    }
  },
  {
    // $sort: Ordena los cursos por fecha en orden descendente.
    $sort: { fecha: -1 }
  }
]).forEach(printjson);

// 7. Listar los cursos actualmente en ejecución en cada sede
print("\n=== 7. Cursos actualmente en ejecución ===");
db.cursos.aggregate([
  {
    // $match: Filtra los cursos que tienen cupos disponibles (es decir, que no están llenos).
    $match: {
      CuposDisponibles: { $gt: 0 }
    }
  },
  {
    // $lookup: Une con 'sedes' para obtener el nombre de la ciudad.
    $lookup: {
      from: "sedes",
      localField: "SedeId",
      foreignField: "id_sede",
      as: "sedeInfo"
    }
  },
  {
    // $lookup: Une con 'instrumentos' para obtener el tipo de instrumento.
    $lookup: {
      from: "instrumentos",
      localField: "Instrumento",
      foreignField: "id_instrumento",
      as: "instrumentoInfo"
    }
  },
  {
    // $project: Define la estructura de salida.
    $project: {
      sede: { $arrayElemAt: ["$sedeInfo.Ciudad", 0] },
      curso: "$id_curso",
      instrumento: { $arrayElemAt: ["$instrumentoInfo.Tipo", 0] },
      nivel: "$Nivel",
      cuposDisponibles: "$CuposDisponibles",
      cupoTotal: "$Cupo",
      costo: "$Costo"
    }
  },
  {
    // $sort: Ordena por sede y luego por nivel del curso.
    $sort: { sede: 1, nivel: 1 }
  }
]).forEach(printjson);

// 8. Detectar cursos que excedieron el cupo permitido en algún momento
print("\n=== 8. Cursos que excedieron el cupo permitido ===");

// Variable para verificar si hay resultados.
var hasResults = false;
db.inscripciones.aggregate([
  {
    // $group: Agrupa por 'Curso' y cuenta el total de inscritos para cada uno.
    $group: {
      _id: "$Curso",
      totalInscritos: { $sum: 1 }
    }
  },
  {
    // $lookup: Une con la colección 'cursos' para obtener el cupo permitido de cada curso.
    $lookup: {
      from: "cursos",
      localField: "_id",
      foreignField: "id_curso",
      as: "cursoInfo"
    }
  },
  {
    // $match: Filtra los documentos donde el 'totalInscritos' es mayor que el 'Cupo' permitido del curso.
    // $expr: Permite usar la sintaxis de agregación para la comparación.
    $match: {
      $expr: { $gt: ["$totalInscritos", { $arrayElemAt: ["$cursoInfo.Cupo", 0] }] }
    }
  },
  {
    // $project: Proyecta los campos relevantes y calcula el exceso de inscritos.
    $project: {
      curso: "$_id",
      nombreCurso: { $arrayElemAt: ["$cursoInfo.id_curso", 0] },
      instrumento: { $arrayElemAt: ["$cursoInfo.Instrumento", 0] },
      nivel: { $arrayElemAt: ["$cursoInfo.Nivel", 0] },
      cupoPermitido: { $arrayElemAt: ["$cursoInfo.Cupo", 0] },
      totalInscritos: 1,
      exceso: { $subtract: ["$totalInscritos", { $arrayElemAt: ["$cursoInfo.Cupo", 0] }] }
    }
  },
  {
    // $sort: Ordena por el exceso de inscritos en orden descendente.
    $sort: { exceso: -1 }
  }
]).forEach(function(doc) {
  printjson(doc);
  hasResults = true;
});

// Si no hay resultados, muestra un mensaje y otras estadísticas de ocupación.
if (!hasResults) {
  print("✅ Ningún curso ha excedido su cupo permitido.");
  
  // Mostrar los cursos con mayor ocupación
  print("\n📊 Cursos con mayor ocupación:");
  db.inscripciones.aggregate([
    {
      $group: {
        _id: "$Curso",
        totalInscritos: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: "cursos",
        localField: "_id",
        foreignField: "id_curso",
        as: "cursoInfo"
      }
    },
    {
      $project: {
        curso: "$_id",
        nombre: { $arrayElemAt: ["$cursoInfo.id_curso", 0] },
        instrumento: { $arrayElemAt: ["$cursoInfo.Instrumento", 0] },
        nivel: { $arrayElemAt: ["$cursoInfo.Nivel", 0] },
        cupoPermitido: { $arrayElemAt: ["$cursoInfo.Cupo", 0] },
        totalInscritos: 1,
        // Calcula el porcentaje de ocupación y lo redondea a 2 decimales.
        porcentajeOcupacion: {
          $round: [
            { $multiply: [
              { $divide: ["$totalInscritos", { $arrayElemAt: ["$cursoInfo.Cupo", 0] }] },
              100
            ]},
            2
          ]
        }
      }
    },
    {
      $sort: { porcentajeOcupacion: -1 }
    },
    {
      $limit: 5
    }
  ]).forEach(printjson);
}

print("\n=== Consultas de agregación ejecutadas exitosamente! ===");