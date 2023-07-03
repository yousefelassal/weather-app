import {Form, redirect, useLoaderData, useNavigate} from "react-router-dom"
import { motion } from "framer-motion";
import requests from "../services/requests";

export async function action({request}){
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    console.log(updates)
    await requests.updateProfile(updates);
    return redirect("/profile");
}

export default function EditProfile() {
    const { profile } = useLoaderData();
    const navigate = useNavigate();
    return (
        <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: .15 }}
        >
            <Form method="put" className="flex flex-col">
                <div className="flex mt-2">
                    <span>First Name:</span>
                    <input
                    placeholder="First"
                    aria-label="First name"
                    type="text"
                    name="first"
                    defaultValue={profile.first}
                    className="border-2 border-gray-200 rounded-md shadow-sm p-1"
                    />
                    <span>Last Name:</span>
                    <input
                    placeholder="Last"
                    aria-label="Last name"
                    type="text"
                    name="last"
                    defaultValue={profile.last}
                    className="border-2 border-gray-200 rounded-md shadow-sm p-1"
                    />
                </div>
                <label>
                    <span>Avatar URL</span>
                    <input
                    placeholder="https://example.com/avatar.jpg"
                    aria-label="Avatar URL"
                    type="text"
                    name="avatar"
                    defaultValue={profile.avatar}
                    className="border-2 border-gray-200 rounded-md shadow-sm p-1"
                    />
                </label>
                
                <div>
                    <button type="submit">Save</button>
                    <button 
                        type="button"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        Cancel
                    </button>
                </div>
                </Form>
        </motion.div>
    );
  }