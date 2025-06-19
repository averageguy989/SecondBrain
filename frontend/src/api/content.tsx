import api from './axiosConfig';
import { ContentCardProps } from '../components/ContentCard';

export interface Content {
  title: string;
  link: string;
  type: string;
  tags: string[];
  shared: boolean;
}

export const createContent = async (content: Content): Promise<Content> => {
  const response = await api.post('/content/create', content);
  return response.data;
};

export const getContent = async (): Promise<ContentCardProps[]> => {
  const response = await api.get('/content');
  return response.data;
};

export const updateContent = async (content: ContentCardProps): Promise<ContentCardProps> => {
  const response = await api.put(`/content/update/${content.id}`, content);
  return response.data;
};

export const DeleteContent = async (id: string): Promise<any> => {
  const response = await api.delete(`/content/delete/${id}`);
  return response.data;
};

