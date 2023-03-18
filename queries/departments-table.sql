CREATE TABLE IF NOT EXISTS departments (
  id INT PRIMARY KEY,
  code VARCHAR(32) NOT NULL,
  englishDepartmentName VARCHAR(255) NOT NULL,
  kurdishDepartmentName VARCHAR(255) NOT NULL,
  collageCode VARCHAR(32) NOT NULL,
  englishCollageName VARCHAR(255) NOT NULL,
  kurdishCollageName VARCHAR(255) NOT NULL
)