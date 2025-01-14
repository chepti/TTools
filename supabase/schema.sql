-- Drop existing tables if they exist
DROP TABLE IF EXISTS ratings CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS tools CASCADE;

-- Create tools table
CREATE TABLE tools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  url TEXT NOT NULL,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  hebrew_support INTEGER CHECK (hebrew_support BETWEEN 1 AND 5),
  free_tier INTEGER CHECK (free_tier BETWEEN 1 AND 5),
  fun_factor INTEGER CHECK (fun_factor BETWEEN 1 AND 5),
  pedagogical_value INTEGER CHECK (pedagogical_value BETWEEN 1 AND 5),
  output_types TEXT[] NOT NULL,
  pedagogical_contexts TEXT[] NOT NULL,
  communication_format TEXT NOT NULL,
  complexity_level INTEGER CHECK (complexity_level BETWEEN 1 AND 5),
  average_rating DECIMAL(3,2)
);

-- Create tutorials table
CREATE TABLE tutorials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id UUID REFERENCES tools(id) NOT NULL,
  title TEXT NOT NULL,
  format TEXT NOT NULL,
  url TEXT NOT NULL,
  additional_info TEXT,
  creator TEXT NOT NULL,
  contributor TEXT NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create examples table
CREATE TABLE examples (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id UUID REFERENCES tools(id) NOT NULL,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  creator TEXT NOT NULL,
  contributor TEXT NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_tutorials_tool_id ON tutorials(tool_id);
CREATE INDEX idx_examples_tool_id ON examples(tool_id);
CREATE INDEX idx_tools_output_types ON tools USING GIN (output_types);
CREATE INDEX idx_tools_pedagogical_contexts ON tools USING GIN (pedagogical_contexts);

-- Enable Row Level Security
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutorials ENABLE ROW LEVEL SECURITY;
ALTER TABLE examples ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON tools FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON tools FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON tools FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON tutorials FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON tutorials FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON tutorials FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON examples FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON examples FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON examples FOR UPDATE USING (true); 