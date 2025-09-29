import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hzpaqqpcjxoseaaiivaj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6cGFxcXBjanhvc2VhYWlpdmFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzMzODgsImV4cCI6MjA3NDcwOTM4OH0.4cKEdSbhqb45_D02UK1fTg8imAwt286_OhiB0fD917E'; // dari Supabase dashboard

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
