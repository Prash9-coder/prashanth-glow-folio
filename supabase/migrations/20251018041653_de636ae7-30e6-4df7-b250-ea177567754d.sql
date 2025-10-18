-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  demo_url TEXT,
  github_url TEXT,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contacts table
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create sponsors table
CREATE TABLE public.sponsors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_name TEXT NOT NULL,
  message TEXT,
  amount NUMERIC(10, 2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;

-- Create policies for projects (public read, no write for now)
CREATE POLICY "Anyone can view projects" 
ON public.projects 
FOR SELECT 
USING (true);

-- Create policies for contacts (anyone can insert)
CREATE POLICY "Anyone can submit contact form" 
ON public.contacts 
FOR INSERT 
WITH CHECK (true);

-- Create policies for sponsors (anyone can sponsor)
CREATE POLICY "Anyone can sponsor" 
ON public.sponsors 
FOR INSERT 
WITH CHECK (true);

-- Insert sample projects
INSERT INTO public.projects (title, description, tech_stack, demo_url, github_url) VALUES
('E-Commerce Platform', 'Full-stack e-commerce solution with payment integration and admin dashboard', ARRAY['React', 'Node.js', 'MongoDB', 'Stripe'], 'https://demo.com', 'https://github.com'),
('Cybersecurity Dashboard', 'Real-time threat monitoring and vulnerability assessment tool', ARRAY['React', 'Python', 'PostgreSQL', 'D3.js'], 'https://demo.com', 'https://github.com'),
('Video Editing Suite', 'Browser-based video editor with AI-powered effects', ARRAY['React', 'WebAssembly', 'TensorFlow.js'], 'https://demo.com', 'https://github.com');