export interface GalleryImage {
  id: string;
  description: string;
  uploaded_by: string;
  created_at: string;
  original_url: string;
  gallery_url: string;
  thumbnail_url: string;
}

export interface Pagination {
  current_page: number;
  total_pages: number;
  total_items: number;
  has_more: boolean;
  items_per_page: number;
}

export interface GalleryResponse {
  images: GalleryImage[];
  pagination: Pagination;
} 