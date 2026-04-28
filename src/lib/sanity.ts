import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

export const client = createClient({
  projectId: "35d0cvvs",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-01-01",
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export async function getProfile() {
  return client.fetch(`*[_type == "profile"][0]`)
}

export async function getServices() {
  return client.fetch(`*[_type == "service"] | order(_createdAt asc)`)
}

export async function getTestimonials() {
  return client.fetch(`*[_type == "testimonial"]`)
}