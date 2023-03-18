const { createConnection } = require("mysql2/promise");
const { loadEnvConfig } = require("@next/env");
const { readFileSync } = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "../");
loadEnvConfig(rootDir);
const createDepartmentsTableQuery = readFileSync(path.resolve(__dirname, "../queries/departments-table.sql"), "utf8").toString();
const createDocumentsTableQuery = readFileSync(path.resolve(__dirname, "../queries/documents-table.sql"), "utf8").toString();
const createStudentsTableQuery = readFileSync(path.resolve(__dirname, "../queries/students-table.sql"), "utf8").toString();
const departmentsContent = readFileSync(__dirname + "/departments.json", "utf8")

const departments = JSON.parse(departmentsContent)

const databaseName = process.env.DB_NAME;
const user = process.env.DB_USER;
const port = process.env.DB_PORT;
const host = process.env.DB_HOST;

async function seed() {
  const connection = await createConnection({
    database: "",
    host,
    user,
    port,
  })

  try {
    let addDepartmentQuery = "INSERT INTO departments (";
    addDepartmentQuery += Object.keys(departments[0]).join(", ");
    addDepartmentQuery += ") VALUES ";

    departments.forEach((department) => {
      addDepartmentQuery += "(";
      addDepartmentQuery += Object.values(department).map(value => `"${value}"`).join(", ");
      addDepartmentQuery += "),";
    })

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);
    await connection.query(`USE ${databaseName}`);
    await connection.query(createDepartmentsTableQuery);
    await connection.query(createDocumentsTableQuery);
    await connection.query(createStudentsTableQuery);
    await connection.query(addDepartmentQuery.slice(0, -1));
    
    console.info("Database seeded 🌱");
  } catch (error) {
    console.error(error);
  }

  process.exit();
}

seed();