-- Create tables
CREATE TABLE IF NOT EXISTS tools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  url TEXT NOT NULL,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  category_ids TEXT[] NOT NULL,
  is_free BOOLEAN NOT NULL,
  language TEXT NOT NULL,
  complexity_level INTEGER NOT NULL CHECK (complexity_level BETWEEN 1 AND 5),
  features TEXT[] NOT NULL,
  average_rating DECIMAL(3,2)
);

CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  parent_id UUID REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS ratings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id UUID REFERENCES tools(id) NOT NULL,
  user_id UUID NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_tools_category_ids ON tools USING GIN (category_ids);
CREATE INDEX IF NOT EXISTS idx_tools_features ON tools USING GIN (features);
CREATE INDEX IF NOT EXISTS idx_ratings_tool_id ON ratings(tool_id);
CREATE INDEX IF NOT EXISTS idx_ratings_user_id ON ratings(user_id);

-- Enable Row Level Security
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON tools FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON categories FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON ratings FOR SELECT USING (true);

-- Create function to update average rating
CREATE OR REPLACE FUNCTION update_tool_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE tools
  SET average_rating = (
    SELECT AVG(rating)::DECIMAL(3,2)
    FROM ratings
    WHERE tool_id = NEW.tool_id
  )
  WHERE id = NEW.tool_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating average rating
CREATE TRIGGER update_tool_rating_trigger
AFTER INSERT OR UPDATE OR DELETE ON ratings
FOR EACH ROW
EXECUTE FUNCTION update_tool_rating(); 