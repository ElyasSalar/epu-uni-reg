CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  secondName VARCHAR(255) NOT NULL,
  thirdName VARCHAR(255) NOT NULL,
  departmentId VARCHAR(32) NOT NULL,
  serialNumber INT UNIQUE NOT NULL,
  nationality VARCHAR(255) NOT NULL,
  language VARCHAR(255) NOT NULL,
  religion VARCHAR(255) NOT NULL,
  phoneNumber INT NOT NULL,
  familyPhoneNumber INT NOT NULL,
  email VARCHAR(255) NOT NULL,
  bailId VARCHAR(255) NOT NULL,
  schoolGraduationCertificateId VARCHAR(255),
  instituteGraduationCertificateId VARCHAR(255),
  chieftainApprovalId VARCHAR(255) NOT NULL,
  securitySupportId VARCHAR(255) NOT NULL,
  nationalityCardId VARCHAR(255),
  informationCardId VARCHAR(255),
  rationCardId VARCHAR(255),
  nationalityCertificateId VARCHAR(255),
  identityCardId VARCHAR(255),
  reigsteredAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (departmentId) REFERENCES departments(id),
  FOREIGN KEY (bailId) REFERENCES documents(file_id),
  FOREIGN KEY (schoolGraduationCertificateId) REFERENCES documents(file_id),
  FOREIGN KEY (instituteGraduationCertificateId) REFERENCES documents(file_id),
  FOREIGN KEY (chieftainApprovalId) REFERENCES documents(file_id),
  FOREIGN KEY (securitySupportId) REFERENCES documents(file_id),
  FOREIGN KEY (nationalityCardId) REFERENCES documents(file_id),
  FOREIGN KEY (informationCardId) REFERENCES documents(file_id),
  FOREIGN KEY (rationCardId) REFERENCES documents(file_id),
  FOREIGN KEY (nationalityCertificateId) REFERENCES documents(file_id),
  FOREIGN KEY (identityCardId) REFERENCES documents(file_id),

  CHECK (schoolGraduationCertificateId IS NOT NULL OR instituteGraduationCertificateId IS NOT NULL),
  CHECK (
    (
      informationCardId IS NOT NULL AND nationalityCardId IS NOT NULL AND rationCardId IS NOT NULL
    ) OR (
      nationalityCertificateId IS NOT NULL AND identityCardId IS NOT NULL
    )
  )
);