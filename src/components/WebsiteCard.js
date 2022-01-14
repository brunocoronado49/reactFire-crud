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
            className="card mb-3 card-website"
            key={link.id}
            onClick={() => navigate(`/edit-website/${link.id}`)}>
                <div className="card-body">
                    <div className="d-flex jusitify-content-between">
                        <h4>{link.name}</h4>
                        <button
                            className="btn btn-danger btn-sm d-flex align-items-center"
                            onClick={(event) => {
                                event.stopPropagation();
                                onDeleteLink(link.id)
                            }}>
                                <i className="material-icons">close</i>
                        </button>
                    </div>
                    <p>{link.description}</p>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                        Go to Website
                    </a>
                </div>
        </div>
    )
}

export default WebsiteCard
