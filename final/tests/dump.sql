INSERT INTO catalog_test.user (id, username, email, password, access_token_nonce) VALUES (1, 'minh1', 'zxc@gmail.com', 'pbkdf2:sha256:50000$irfvL36K$3e45febd784cc20fa271c424d29c677b5be4d49db1ae802187725c6badffb5c5', '8e5c79bc');
INSERT INTO catalog_test.user (id, username, email, password, access_token_nonce) VALUES (2, 'minh2', 'asd@gmail.com', 'pbkdf2:sha256:50000$qqLG0R34$42e0c19519b6245d786750ecdbe7c1069733a9caaff29a8e3f720e5ef63bf7c2', 'e1e63fe0');
INSERT INTO catalog_test.category (id, name, user_id) VALUES (1, 'Cat 1', 1);
INSERT INTO catalog_test.category (id, name, user_id) VALUES (2, 'Cat 2', 2);
INSERT INTO catalog_test.category (id, name, user_id) VALUES (3, 'Cat 3', 1);
