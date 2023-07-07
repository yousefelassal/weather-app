import {useEffect} from "react";
import {Link, useLoaderData} from "react-router-dom";
import {motion} from "framer-motion";
import requests from "../services/requests";

export async function loader(){
    const profile = await requests.getProfile();
    return {profile};
}

export default function Profile(){
    const {profile} = useLoaderData();
    useEffect(() => {
        requests.getProfile();
    }, []);
    return (
        <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: .15 }}
        >
            <h1>Profile</h1>
            <p>
                <strong>Name</strong> {profile.first} {profile.last}
            </p>

            <p>
                <strong>Avatar</strong> <br />
                <img src={profile.avatar} alt="avatar" className="w-60 rounded-md"/>
            </p>

            <Link to="/profile/edit">Edit Profile</Link>
        </motion.div>
    );
}