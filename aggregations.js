// 1. ¿Cuántos estudiantes se inscribieron por sede en el último mes?
print("=== 1. Estudiantes inscritos por sede en el último mes (usando fechas de los datos) ===");
db.inscripciones.aggregate([
  {
    $match: {
      Fecha: {
        $gte: new Date("2024-01-20"), // Último mes según tus datos
        $lte: new Date("2024-02-20")
      }
    }
  },
  {
    $group: {
      _id: "$Sede",
      totalInscripciones: { $sum: 1 },
      estudiantesUnicos: { $addToSet: "$Estudiante" }
    }
  },
  {
    $lookup: {
      from: "sedes",
      localField: "_id",
      foreignField: "id_sede",
      as: "sedeInfo"
    }
  },
  {
    $project: {
      sede: { $arrayElemAt: ["$sedeInfo.Ciudad", 0] },
      totalInscripciones: 1,
      totalEstudiantesUnicos: { $size: "$estudiantesUnicos" },
      estudiantes: "$estudiantesUnicos"
    }
  },
  {
    $sort: { totalEstudiantesUnicos: -1 }
  }
]).forEach(printjson);

// 2. ¿Cuáles son los cursos más demandados en cada sede?
print("\n=== 2. Cursos más demandados en cada sede ===");
db.inscripciones.aggregate([
  {
    $group: {
      _id: {
        sede: "$Sede",
        curso: "$Curso"
      },
      totalInscripciones: { $sum: 1 }
    }
  },
  {
    $sort: { totalInscripciones: -1 }
  },
  {
    $group: {
      _id: "$_id.sede",
      cursoMasDemandado: { $first: "$_id.curso" },
      totalInscripciones: { $first: "$totalInscripciones" }
    }
  },
  {
    $lookup: {
      from: "sedes",
      localField: "_id",
      foreignField: "id_sede",
      as: "sedeInfo"
    }
  },
  {
    $lookup: {
      from: "cursos",
      localField: "cursoMasDemandado",
      foreignField: "id_curso",
      as: "cursoInfo"
    }
  },
  {
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
    $group: {
      _id: "$Sede",
      ingresoTotal: { $sum: "$Costo" }
    }
  },
  {
    $lookup: {
      from: "sedes",
      localField: "_id",
      foreignField: "id_sede",
      as: "sedeInfo"
    }
  },
  {
    $project: {
      sede: { $arrayElemAt: ["$sedeInfo.Ciudad", 0] },
      ingresoTotal: 1
    }
  },
  {
    $sort: { ingresoTotal: -1 }
  }
]).forEach(printjson);

// 4. ¿Qué profesor tiene más estudiantes asignados?
print("\n=== 4. Profesor con más estudiantes asignados ===");
db.inscripciones.aggregate([
  {
    $group: {
      _id: "$Profesor",
      totalEstudiantes: { $sum: 1 },
      estudiantesUnicos: { $addToSet: "$Estudiante" }
    }
  },
  {
    $project: {
      totalEstudiantes: 1,
      estudiantesUnicosCount: { $size: "$estudiantesUnicos" }
    }
  },
  {
    $sort: { estudiantesUnicosCount: -1 }
  },
  {
    $limit: 1
  },
  {
    $lookup: {
      from: "profesores",
      localField: "_id",
      foreignField: "id_profesor",
      as: "profesorInfo"
    }
  },
  {
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
    $group: {
      _id: "$Instrumento",
      totalReservas: { $sum: 1 }
    }
  },
  {
    $sort: { totalReservas: -1 }
  },
  {
    $limit: 1
  },
  {
    $lookup: {
      from: "instrumentos",
      localField: "_id",
      foreignField: "id_instrumento",
      as: "instrumentoInfo"
    }
  },
  {
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
    $match: {
      Estudiante: "E1"
    }
  },
  {
    $lookup: {
      from: "cursos",
      localField: "Curso",
      foreignField: "id_curso",
      as: "cursoInfo"
    }
  },
  {
    $lookup: {
      from: "profesores",
      localField: "Profesor",
      foreignField: "id_profesor",
      as: "profesorInfo"
    }
  },
  {
    $lookup: {
      from: "sedes",
      localField: "Sede",
      foreignField: "id_sede",
      as: "sedeInfo"
    }
  },
  {
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
    $sort: { fecha: -1 }
  }
]).forEach(printjson);

// 7. Listar los cursos actualmente en ejecución en cada sede
print("\n=== 7. Cursos actualmente en ejecución ===");
db.cursos.aggregate([
  {
    $match: {
      CuposDisponibles: { $gt: 0 }
    }
  },
  {
    $lookup: {
      from: "sedes",
      localField: "SedeId",
      foreignField: "id_sede",
      as: "sedeInfo"
    }
  },
  {
    $lookup: {
      from: "instrumentos",
      localField: "Instrumento",
      foreignField: "id_instrumento",
      as: "instrumentoInfo"
    }
  },
  {
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
    $sort: { sede: 1, nivel: 1 }
  }
]).forEach(printjson);

// 8. Detectar cursos que excedieron el cupo permitido en algún momento
print("\n=== 8. Cursos que excedieron el cupo permitido ===");

// Ejecutar la agregación directamente con forEach
var hasResults = false;
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
    $match: {
      $expr: { $gt: ["$totalInscritos", { $arrayElemAt: ["$cursoInfo.Cupo", 0] }] }
    }
  },
  {
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
    $sort: { exceso: -1 }
  }
]).forEach(function(doc) {
  printjson(doc);
  hasResults = true;
});

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