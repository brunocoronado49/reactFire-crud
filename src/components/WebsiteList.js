import React, {useState, useEffect} from 'react'
import { getLinks } from "../firebase/database";
import WebsiteCard from './WebsiteCard';

const WebsiteLink = () => {
   
    const [websites, setWebsites] = useState([]);

    const getWebsiteCard = async () => {
        const query = await getLinks();
        const docs = [];
        query.forEach((doc) => {
            docs.push({...doc.data(), id: doc.id});
        });
        setWebsites(docs);
    }

    useEffect(() => {
        getWebsiteCard();
    }, [])

    return (
        <div>
            {
                websites.map((link) => (
                    <div className="col-md-4" key={link.id}>
                        <WebsiteCard link={link} />
                    </div>
                ))
            }
        </div>
    )
}

export default WebsiteLink
