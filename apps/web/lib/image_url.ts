export const getSpotImageUrl = (imagePath: string) => {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${imagePath}`
}
