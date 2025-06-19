import React, { useState } from 'react';

interface Tag {
    id: string;
    name: string;
}

export interface ContentCardProps {
    id: string;
    title: string;
    link: string;
    type: string;
    tags: Tag[];
    shared: boolean;
    upvotesCount: number;
    savedCount: number;
    createdAt: string;
    updatedAt: string;
}
interface ContentCardPropsFull {
    content: ContentCardProps;
    myContent: boolean;
    deleteContent: (id: string) => void;
}

const ContentCard: React.FC<ContentCardPropsFull> = ({content,myContent,deleteContent}) => {
    const [upvotes, setUpvotes] = useState(content.upvotesCount);
    const [saved, setSaved] = useState(content.savedCount);
    const [edit, setedit] = useState(false);
    
    const handleUpvote = () => {
        setUpvotes(upvotes + 1);
    }

    const handleSave = () => {
        setSaved(saved + 1);
    }

    const handleDelete = () => {
        deleteContent(content.id);
    }

    return (
        <div>
            <h3>{content.title}</h3>
            <p>{content.link}</p>
            <p>{content.type}</p>
            {content.tags.map((tag) => (
                <p key={tag.id}>#{tag.name}</p>
            ))}
            <p>{content.shared ? 'Public' : 'Private'}</p>
            <p>{upvotes}</p>
            <p>{saved}</p>
            <p>{content.createdAt}</p>
            <p>{content.updatedAt}</p>
            {!myContent && <button onClick={handleUpvote}>Upvote</button>}
            {!myContent && <button onClick={handleSave}>Save</button>}
            {myContent && <button onClick={() => handleDelete()}>Delete</button>}
            {myContent && <button>Edit</button>}
        </div>
    );
};

export default ContentCard;