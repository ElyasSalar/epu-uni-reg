const { createConnection } = require("mysql2/promise");
const { loadEnvConfig } = require("@next/env");
const { readFileSync } = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "../");
loadEnvConfig(rootDir);
const createDepartmentsTableQuery = readFileSync(path.resolve(__dirname, "../queries/departments-table.sql"), "utf8").toString();
const createDocumentsTableQuery = readFileSync(path.resolve(__dirname, "../queries/documents-table.sql"), "utf8").toString();
const createCollagesTableQuery = readFileSync(path.resolve(__dirname, "../queries/collages-table.sql"), "utf8").toString();
const createStudentsTableQuery = readFileSync(path.resolve(__dirname, "../queries/students-table.sql"), "utf8").toString();
const departmentsContent = readFileSync(__dirname + "/departments.json", "utf8")

const departments = JSON.parse(departmentsContent)
let collages = []

function removeDuplicates(array, key) {
  return array.filter((item, index) => array.findIndex(i => i[key] === item[key]) === index)
}

for (const department of departments) {
  const { collageCode, englishCollageName, kurdishCollageName } = department
  collages.push({ id: collageCode, englishCollageName, kurdishCollageName })

  department.id = department.code
  department.collageId = collageCode
  
  delete department.code
  delete department.collageCode
  delete department.englishCollageName
  delete department.kurdishCollageName
}

collages = removeDuplicates(collages, "id")

const databaseName = process.env.DB_NAME;
const password = process.env.DB_PASSWORD;
const user = process.env.DB_USER;
const port = process.env.DB_PORT;
const host = process.env.DB_HOST;

function queryBuilderFromArrayObject(array, tableName) {
  let query = `INSERT INTO ${tableName} (`;
  query += Object.keys(array[0]).join(", ");
  query += ") VALUES ";

  array.forEach((item) => {
    query += "(";
    query += Object.values(item).map(value => `"${value}"`).join(", ");
    query += "),";
  })

  return query;
}

async function seed() {
  const connection = await createConnection({
    database: "",
    password,
    host,
    user,
    port,
  })

  try {
    // let addDepartmentQuery = "INSERT INTO departments (";
    // addDepartmentQuery += Object.keys(departments[0]).join(", ");
    // addDepartmentQuery += ") VALUES ";

    // departments.forEach((department) => {
    //   addDepartmentQuery += "(";
    //   addDepartmentQuery += Object.values(department).map(value => `"${value}"`).join(", ");
    //   addDepartmentQuery += "),";
    // })
    const addDepartmentsQuery = queryBuilderFromArrayObject(departments, "departments")
    const addCollagesQuery = queryBuilderFromArrayObject(collages, "collages")

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);
    await connection.query(`USE ${databaseName}`);
    await connection.query(createCollagesTableQuery);
    await connection.query(createDepartmentsTableQuery);
    await connection.query(createDocumentsTableQuery);
    await connection.query(createStudentsTableQuery);
    await connection.query(addCollagesQuery.slice(0, -1));
    await connection.query(addDepartmentsQuery.slice(0, -1));
    
    console.info("Database seeded 🌱");
  } catch (error) {
    console.error(error);
  }

  process.exit();
}

seed();