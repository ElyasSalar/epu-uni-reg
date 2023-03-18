CREATE TABLE IF NOT EXISTS departments (
  id VARCHAR(32) PRIMARY KEY,
  englishDepartmentName VARCHAR(255) NOT NULL,
  kurdishDepartmentName VARCHAR(255) NOT NULL,
  collageId VARCHAR(32) NOT NULL,
  FOREIGN KEY (collageId) REFERENCES collages(id)
)