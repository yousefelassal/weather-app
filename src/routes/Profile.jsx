import {Link, useLoaderData} from "react-router-dom";
import {motion} from "framer-motion";

export async function loader(){
    const profile = {
        first: "El",
        last: "rayes",
        avatar: "https://scontent.fcai19-4.fna.fbcdn.net/v/t1.6435-9/196379927_342631387227961_6698731964075942026_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ZjRarD4FRgYAX9Y427o&_nc_ht=scontent.fcai19-4.fna&oh=00_AfD82v7gSe8XGRXaOFdczp0nZCuuwbe2WgOArvqurF_9PA&oe=64CA6EF3",
    };
    return {profile};
}

export default function Profile(){
    const {profile} = useLoaderData();
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
                <img src={profile.avatar} alt="avatar" />
            </p>

            <Link to="/profile/edit">Edit Profile</Link>
        </motion.div>
    );
}