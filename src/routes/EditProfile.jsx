import {Form, redirect, useLoaderData, useNavigate} from "react-router-dom"
import { motion } from "framer-motion";

export async function action({request, updateProfile}){
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateProfile(updates);
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
            <Form method="post" id="contact-form">
                <p>
                    <span>Name</span>
                    <input
                    placeholder="First"
                    aria-label="First name"
                    type="text"
                    name="first"
                    defaultValue={profile.first}
                    />
                    <input
                    placeholder="Last"
                    aria-label="Last name"
                    type="text"
                    name="last"
                    defaultValue={profile.last}
                    />
                </p>
                <label>
                    <span>Avatar URL</span>
                    <input
                    placeholder="https://example.com/avatar.jpg"
                    aria-label="Avatar URL"
                    type="text"
                    name="avatar"
                    defaultValue={profile.avatar}
                    />
                </label>
                
                <p>
                    <button type="submit">Save</button>
                    <button 
                        type="button"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        Cancel
                    </button>
                </p>
                </Form>
        </motion.div>
    );
  }