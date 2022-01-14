import React from 'react'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { deleteLink } from '../firebase/database';

const WebsiteCard = ({link}) => {
    const navigate = useNavigate();

    const onDeleteLink = async (id) => {
        if(window.confirm("Do you want delete this website?")) {
            await deleteLink(id);
            toast("Website removed successfully.", {
                type: "error",
                autoClose: 2000
            })
        }
    }

    return (
        <div 
            className="card mb-4"
            key={link.id}>
                <div className="card-body">
                    <div className="d-flex jusitify-content-between">
                        <h4>{link.name}</h4>
                    </div>
                    <p>{link.description}</p>
                    <a
                        href={link.url}
                        className="btn btn-primary m-2" 
                        target="_blank" rel="noopener noreferrer">
                        Go to Website
                    </a>
                    <button 
                        className="btn btn-success m-2"
                        onClick={() => navigate(`/edit-website/${link.id}`)}>
                        Edit
                    </button>
                    <button 
                        className="btn btn-danger m-2"
                        onClick={(event) => {
                            event.stopPropagation();
                            onDeleteLink(link.id)
                        }}>
                        delete
                    </button>
                </div>
        </div>
    )
}

export default WebsiteCard
