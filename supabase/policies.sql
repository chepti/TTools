-- Enable inserting tools for all users
CREATE POLICY "Enable insert for all users" ON tools FOR INSERT WITH CHECK (true);

-- Enable updating tools for all users
CREATE POLICY "Enable update for all users" ON tools FOR UPDATE USING (true);

-- Enable inserting ratings for all users
CREATE POLICY "Enable insert for all users" ON ratings FOR INSERT WITH CHECK (true);

-- Enable updating ratings for all users
CREATE POLICY "Enable update for all users" ON ratings FOR UPDATE USING (true); 