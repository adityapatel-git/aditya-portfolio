import { supabase } from "./supabase";

export async function getProfile() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }

  return data;
}

export async function getExperiences() {
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }

  return data;
}

export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data;
}

export async function getProjectBySlug(slug: string) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching project:", error);
    return null;
  }

  return data;
}

export async function getEducation() {
  const { data, error } = await supabase
    .from("education")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching education:", error);
    return [];
  }

  return data;
}

export async function getSkills() {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("category", { ascending: true })
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching skills:", error);
    return [];
  }

  return data;
}