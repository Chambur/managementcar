INSERT INTO coches (matricula, modelo, color, reservado, nivel_gasolina) VALUES 
('4966YMR', 'Hyundai Tucson', '#FFA500', true, 'LLENO'),        -- Naranja
('1930PIK', 'Kia Sportage', '#00FF00', false, 'MEDIO'),         -- Verde
('7237AWG', 'Renault Clio', '#FFFF00', false, 'TRES_CUARTOS'),  -- Amarillo
('7940ZWI', 'Seat Ibiza', '#FFC0CB', true, 'CUARTO'),           -- Rosa
('8379DXH', 'Peugeot 208', '#800080', false, 'LLENO'),          -- Morado
('0824CDN', 'Nissan Qashqai', '#000000', true, 'MEDIO'),        -- Negro
('7777GGG', 'BMW X5', '#A52A2A', false, 'CUARTO'),              -- Marrón
('7607BVV', 'Mercedes A-Class', '#87CEEB', true, 'TRES_CUARTOS'), -- Azul claro
('9771CYH', 'Audi A3', '#4682B4', false, 'LLENO'),              -- Azul acero
('0359RKF', 'Mazda CX-5', '#D2691E', false, 'MEDIO');           -- Marrón claro

INSERT INTO hotels (name, addres, hotelphone) VALUES
('Hotel Las Palmas Beach', 'Calle León y Castillo 123, Las Palmas de Gran Canaria', 928224578),
('Hotel Maspalomas Resort', 'Avenida de Tirajana 45, Maspalomas', 928760432),
('Hotel Puerto Rico Paradise', 'Calle Isla Margarita 10, Puerto Rico', 928345671),
('Hotel Agaete Valley', 'Calle Guayedra 22, Agaete', 928123456),
('Hotel Vecindario Aeroport', 'Avenida del Atlántico 50, Vecindario', 928654321);

INSERT INTO booking (room_number, fecha_inicio, fecha_fin, cocheID, hotelname) VALUES 
(102, TIMESTAMP '2023-11-01 12:00:00', TIMESTAMP '2023-11-03 10:00:00', 1, 'Hotel Las Palmas Beach'),
(103, TIMESTAMP '2023-11-05 15:00:00', TIMESTAMP '2023-11-07 11:00:00', 2, 'Hotel Maspalomas Resort'),
(104, TIMESTAMP '2023-11-10 14:00:00', TIMESTAMP '2023-11-12 12:00:00', 3, 'Hotel Puerto Rico Paradise'),
(105, TIMESTAMP '2023-11-15 16:00:00', TIMESTAMP '2023-11-18 13:00:00', 4, 'Hotel Agaete Valley'),
(106, TIMESTAMP '2023-11-20 09:00:00', TIMESTAMP '2023-11-22 11:00:00', 5, 'Hotel Vecindario Aeroport'),
(107, TIMESTAMP '2023-12-01 11:00:00', TIMESTAMP '2023-12-05 09:00:00', 6, 'Hotel Las Palmas Beach'),
(108, TIMESTAMP '2023-12-07 10:00:00', TIMESTAMP '2023-12-10 14:00:00', 7, 'Hotel Maspalomas Resort'),
(109, TIMESTAMP '2023-12-12 13:00:00', TIMESTAMP '2023-12-15 12:00:00', 8, 'Hotel Puerto Rico Paradise'),
(110, TIMESTAMP '2023-12-18 14:00:00', TIMESTAMP '2023-12-20 11:00:00', 9, 'Hotel Agaete Valley'),
(111, TIMESTAMP '2023-12-25 15:00:00', TIMESTAMP '2023-12-28 10:00:00', 10, 'Hotel Vecindario Aeroport');


-- También podemos añadir algunos usuarios de ejemplo
INSERT INTO usuarios (username, password, rol) VALUES
('chambur', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'ROLE_ADMIN'),
('usuario1', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'ROLE_USER'),
('usuario2', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'ROLE_USER'); 