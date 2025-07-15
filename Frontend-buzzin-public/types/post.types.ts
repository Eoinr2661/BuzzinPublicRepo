import { type ReactNode, type MouseEvent } from 'react';

export interface Category {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  publishedAt: string; // ISO date string
  featuredMediaUrl: string;
  authorName:string;
  categories: Category[];
}

export interface EventPost {
  id: number;
  eventTitle: string;
  description: string;
  categories: Category[];
  startDate: string; // ISO date string
  endDate: string;
  venue: string;
  featuredImageUrl: string;
  featuredImageAlt: string;
  eventURL: string;
}

export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface FetchPostsParams {
  page: number;
  perPage: number;
  searchTerm?: string;
  selectedCategory?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface EventsSubSectionProps {
  events: EventPost[];
}

export interface PostSubSectionProps {
  posts: Post[];
}

export interface LoaderProps {
  text?: string;
}

export interface NavLinkProps {
  href: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  children: ReactNode;
  className?: string;
  mobile?: boolean;
}

export interface PaginationProps {
  currentPage: number; // 0-based page index
  totalPages: number;  // total number of pages (0-based, so 0 = 1 page, 1 = 2 pages)
  onPageChange: (page: number) => void; // expects 0-based index
}

export interface CalendarModalProps {
  onClose: () => void;
  weekStartsOn?: 0 | 1;
}

export interface EventCardProps {
  event: EventPost;
}

export interface EventSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (catId: string) => void;
}

export interface EventsGridProps {
  searchTerm: string;
  selectedCategory: string;
  viewMode: 'grid' | 'list';
  page: number;
  setPage: (page: number) => void;
  setTotalPages: (n: number) => void;
}

export interface ViewModeButtonsProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  showCalendar: boolean;
  setShowCalendar: (show: boolean) => void;
}

export interface CloseCalendarButtonProps {
  onClick: () => void;
}

export interface MonthNavigationProps {
  prevMonth: () => void;
  nextMonth: () => void;
}

export interface MonthTitleProps {
  currentMonth: Date;
}

export interface PageTitleProps {
  title: string;
}

export interface PostCardProps {
  post: Post;
  fallBackImage?: string;
}

export type MoreButtonProps = {
  href: string;
  text: string;
};