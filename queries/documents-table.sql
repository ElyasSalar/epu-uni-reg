CREATE TABLE IF NOT EXISTS documents (
  file_id VARCHAR(255) PRIMARY KEY,
  message_id INT NOT NULL,
  file_name VARCHAR(255),
  mime_type VARCHAR(255),
  file_size VARCHAR(32)
)