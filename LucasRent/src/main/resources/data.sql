INSERT INTO coches (matricula, modelo, color, reservado, nivel_gasolina) VALUES 
('1234ABC', 'Toyota Corolla', '#808080', true,  'LLENO'),      -- Gris
('5678DEF', 'Honda Civic', '#FF0000', false, 'MEDIO'),        -- Rojo
('9012GHI', 'Ford Focus', '#0000FF', true, 'CUARTO'),        -- Azul
('3456JKL', 'Volkswagen Golf', '#FFFFFF', false, 'TRES_CUARTOS'); -- Blanco

INSERT INTO hotels (name, addres, hotelphone) VALUES
('Hotel 1 de prueba', 'Direccion 1 de pruebas', 928570766);

-- INSERT INTO booking (room_number, fecha_inicio, fecha_fin, cocheID, hotelname) VALUES 
-- (101, '2023-10-01 09:00', '2023-10-05 08:00', 1, 'Dunas Maspalomas'); -- Asegúrate de que el coche con ID 1 exista
INSERT INTO booking (room_number, fecha_inicio, fecha_fin, cocheID, hotelname) VALUES 
(101, TIMESTAMP '2023-10-01 09:00:00', TIMESTAMP '2023-10-05 08:00:00', 1, 'Dunas Maspalomas');

-- También podemos añadir algunos usuarios de ejemplo
INSERT INTO usuarios (username, password, rol) VALUES
('chambur', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'ROLE_ADMIN'),
('usuario1', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'ROLE_USER'),
('usuario2', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'ROLE_USER'); 