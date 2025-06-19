import { useEffect } from 'react';
import { useState } from 'react';
import { getContent, DeleteContent } from '../api/content';
import ContentCard, { ContentCardProps } from '../components/ContentCard';
import { useNavigate } from 'react-router-dom';


export const MyContent = () => {
    const navigate = useNavigate();
    const [content, setContent] = useState<ContentCardProps[]>([]);

    useEffect(() => {
        const fetchContent = async () => {
            const content = await getContent();
            setContent(content);
        };
        fetchContent();
    }, []);

    const deleteContent = async (id: string) => {
        try {
            await DeleteContent(id);
            setContent(content.filter((content) => content.id !== id));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1>My Content</h1>
            <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
            <div>
        {content.map((content: ContentCardProps) => (
          <ContentCard key={content.id} content={content} myContent={true} deleteContent={deleteContent}/>
        ))}
      </div>
    </div>
  );
};
