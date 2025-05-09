-- USERS ACCOUNTS (UUID for user identity)
CREATE TABLE users_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    usertype VARCHAR(50) DEFAULT 'customer',
    locked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- USERS DETAILS (UUID for user identity, linked to users_accounts)
CREATE TABLE users_details (
    id UUID PRIMARY KEY REFERENCES users_accounts(id) ON DELETE CASCADE,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    user_wallet NUMERIC(12,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PRODUCT LIST (INTEGER for performance reasons)
CREATE TABLE product_list (
    id SERIAL PRIMARY KEY,  -- Using SERIAL for integer-based primary key
    itemname VARCHAR(255) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    category VARCHAR(100),
    img TEXT,
    description TEXT,
    inventory INTEGER DEFAULT 0,
    sold INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ORDER LIST (UUID for user reference, linked to users_accounts)
CREATE TABLE order_list (
    id_transaction UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users_accounts(id) ON DELETE SET NULL,
    delivery_status VARCHAR(50) DEFAULT 'pending',
    payment_status VARCHAR(50) DEFAULT 'unpaid',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ORDER ITEMS (Integer for product reference, UUID for order reference)
CREATE TABLE order_items (
    order_id UUID REFERENCES order_list(id_transaction) ON DELETE CASCADE,
    product_id INTEGER REFERENCES product_list(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (order_id, product_id)
);

-- CART LIST (UUID for user reference, Integer for product reference)
CREATE TABLE cart_list (
    user_id UUID REFERENCES users_accounts(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES product_list(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, product_id)
);





-- product dump
INSERT INTO product_list (itemname, price, category, img, description, inventory, sold) VALUES
('Organic Apples', 3.99, 'Fruits', 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg', 'Fresh organic apples, crisp and juicy.', 100, 20),
('Organic Bananas', 1.29, 'Fruits', 'https://images.pexels.com/photos/461208/pexels-photo-461208.jpeg', 'Sweet organic bananas, perfect for smoothies.', 150, 35),
('Organic Carrots', 2.49, 'Vegetables', 'https://images.pexels.com/photos/65174/pexels-photo-65174.jpeg', 'Crunchy organic carrots, rich in beta-carotene.', 200, 50),
('Organic Spinach', 2.99, 'Vegetables', 'https://images.pexels.com/photos/1435895/pexels-photo-1435895.jpeg', 'Fresh organic spinach leaves, great for salads.', 180, 40),
('Organic Milk', 4.59, 'Dairy', 'https://images.pexels.com/photos/416656/pexels-photo-416656.jpeg', 'Creamy organic milk from grass-fed cows.', 120, 25),
('Organic Eggs', 3.79, 'Dairy', 'https://images.pexels.com/photos/162712/eggs-egg-carton-egg-box-162712.jpeg', 'Free-range organic eggs, rich in protein.', 160, 30),
('Organic Chicken Breast', 7.99, 'Meat', 'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg', 'Lean organic chicken breast, no antibiotics.', 90, 15),
('Organic Ground Beef', 8.49, 'Meat', 'https://images.pexels.com/photos/616404/pexels-photo-616404.jpeg', 'Grass-fed organic ground beef, flavorful and juicy.', 80, 20),
('Organic Brown Rice', 2.99, 'Grains', 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', 'Whole grain organic brown rice, high in fiber.', 140, 35),
('Organic Quinoa', 5.49, 'Grains', 'https://images.pexels.com/photos/1640776/pexels-photo-1640776.jpeg', 'Protein-rich organic quinoa, gluten-free.', 130, 28),
('Organic Almond Butter', 6.99, 'Spreads', 'https://images.pexels.com/photos/41123/pexels-photo-41123.jpeg', 'Creamy organic almond butter, no added sugar.', 110, 22),
('Organic Peanut Butter', 5.99, 'Spreads', 'https://images.pexels.com/photos/41124/pexels-photo-41124.jpeg', 'Smooth organic peanut butter, rich in flavor.', 115, 24),
('Organic Honey', 7.49, 'Sweeteners', 'https://images.pexels.com/photos/41125/pexels-photo-41125.jpeg', 'Raw organic honey, natural sweetener.', 100, 20),
('Organic Olive Oil', 9.99, 'Oils', 'https://images.pexels.com/photos/41126/pexels-photo-41126.jpeg', 'Extra virgin organic olive oil, cold-pressed.', 95, 18),
('Organic Coconut Oil', 8.99, 'Oils', 'https://images.pexels.com/photos/41127/pexels-photo-41127.jpeg', 'Virgin organic coconut oil, versatile for cooking.', 90, 17),
('Organic Yogurt', 4.29, 'Dairy', 'https://images.pexels.com/photos/41128/pexels-photo-41128.jpeg', 'Creamy organic yogurt, probiotic-rich.', 130, 26),
('Organic Cheddar Cheese', 5.49, 'Dairy', 'https://images.pexels.com/photos/41129/pexels-photo-41129.jpeg', 'Sharp organic cheddar cheese, aged to perfection.', 120, 23),
('Organic Whole Wheat Bread', 3.99, 'Bakery', 'https://images.pexels.com/photos/41130/pexels-photo-41130.jpeg', 'Hearty organic whole wheat bread, freshly baked.', 140, 30),
('Organic Pasta', 2.79, 'Grains', 'https://images.pexels.com/photos/41131/pexels-photo-41131.jpeg', 'Durum wheat organic pasta, al dente texture.', 150, 32),
('Organic Tomato Sauce', 3.49, 'Condiments', 'https://images.pexels.com/photos/41132/pexels-photo-41132.jpeg', 'Rich organic tomato sauce, slow-cooked.', 110, 21);
