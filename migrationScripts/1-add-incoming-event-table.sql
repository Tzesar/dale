CREATE TABLE incoming_event
(
    id          INT PRIMARY KEY AUTO_INCREMENT,
    raw_content TEXT,
    status      VARCHAR(50) DEFAULT 'TO_BE_PROCESSED'
)
