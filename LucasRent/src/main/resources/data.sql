INSERT INTO coches (matricula, modelo, color, nivel_gasolina) VALUES 
('1234ABC', 'Toyota Corolla', '#808080', 'LLENO'),      -- Gris
('5678DEF', 'Honda Civic', '#FF0000', 'MEDIO'),        -- Rojo
('9012GHI', 'Ford Focus', '#0000FF', 'CUARTO'),        -- Azul
('3456JKL', 'Volkswagen Golf', '#FFFFFF', 'TRES_CUARTOS'); -- Blanco

-- También podemos añadir algunos usuarios de ejemplo
INSERT INTO usuarios (username, password, rol) VALUES
('chambur', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'ROLE_ADMIN'),
('usuario1', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'ROLE_USER'),
('usuario2', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'ROLE_USER'); 