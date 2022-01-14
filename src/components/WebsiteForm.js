import React, {useState, useEffect} from 'react'
import { toast } from "react-toastify";
import {saveLink, getLinks, updateLink} from '../firebase/database';
import { useParams, useNavigate } from "react-router-dom";

const initialValues = {
    name: '',
    url: '',
    description: ''
}

const WebsiteForm = (props) => {

    const [links, setLinks] = useState(initialValues)
    const params = useParams();
    const navigate = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target
        setLinks({...links, [name]: value})
    }

    const validURL = (str) => {
        var pattern = new RegExp(
            "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
            "i" 
        );
        return !!pattern.test(str);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!validURL(links.url)) {
            return toast("Invalid url", {
                type: "error",
                autoClose: 1000
            });
        }

        if(!params.id) {
            await saveLink(links);
            toast("Website saved successfully", {
                type: "success"
            });
        } else {
            await updateLink(params.id, links);
            toast("Website updated successfully", {
                type: "success"
            });
        }

        setLinks(initialValues)
        navigate("/")
    }

    const getLinkById = async (id) => {
        try {
            const doc = await getLinks(id)
            setLinks({...doc.data()})
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(params.id) {
            getLinkById(params.id)
        }
    }, [params.id])

    return (
        <div>
            <div className="card col-md-8 offset-md-2">
                <div className="card-header">
                    <h3>Add a Link</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group input-group p-2">
                            <div className="input-group-text bg-light">
                                <i className="material-icons">create</i>
                            </div>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Name"
                                name="name"
                                onChange={handleChange}
                                value={links.name}/>
                        </div>
                        <div className="form-group input-group p-2">
                            <div className="input-group-text bg-light">
                                <i className="material-icons">link</i>
                            </div>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="URL"
                                name="url"
                                onChange={handleChange}
                                value={links.url}/>
                        </div>
                        <div className="form-group input-group p-2">
                            <div className="input-group-text bg-light">
                                <i className="material-icons">description</i>
                            </div>
                            <textarea 
                                type="text" 
                                className="form-control" 
                                placeholder="Description"
                                rows="5"
                                name="description"
                                onChange={handleChange}
                                value={links.description}/>
                        </div>
                        <div className="form-group p-2">
                            <button 
                                className="btn btn-primary w-100" 
                                type="submit"
                                disabled={!links.url || !links.name}>
                                    Save
                                </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default WebsiteForm
 